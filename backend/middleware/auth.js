const jwt = require('jsonwebtoken');
const axios = require('axios');

let googlePublicKeys = {};

const updatePublicKeys = async () => {
  try {
    const res = await axios.get('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com');
    googlePublicKeys = res.data;
    console.log('Google Public Keys Updated');
  } catch (err) {
    console.error('Error fetching Google keys:', err.message);
  }
};
setInterval(updatePublicKeys, 6 * 60 * 60 * 1000);

const verifyToken = async (req, res, next) => {
  try {
    let authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    // THE CLEANUP: Remove any hidden spaces, newlines, or tabs from the token
    const token = authHeader.split(' ')[1].replace(/\s/g, '');

    const decodedToken = jwt.decode(token, { complete: true });
    if (!decodedToken || !decodedToken.header.kid) {
      return res.status(401).json({ success: false, error: 'Invalid token structure' });
    }

    const kid = decodedToken.header.kid;
    const publicKey = googlePublicKeys[kid];

    if (!publicKey) {
      await updatePublicKeys();
      if (!googlePublicKeys[kid]) {
        return res.status(401).json({ success: false, error: 'Security key not found' });
      }
    }

    jwt.verify(token, googlePublicKeys[kid], {
      algorithms: ['RS256'],
      audience: process.env.FIREBASE_PROJECT_ID,
      issuer: `https://securetoken.google.com/${process.env.FIREBASE_PROJECT_ID}`,
    }, (err, decoded) => {
      if (err) {
        console.error('JWT VERIFY ERROR:', err.message);
        return res.status(401).json({ success: false, error: 'Token verification failed: ' + err.message });
      }
      req.user = decoded;
      next();
    });

  } catch (error) {
    console.error('AUTH MIDDLEWARE CRITICAL ERROR:', error.message);
    res.status(500).json({ success: false, error: 'Security System Error: ' + error.message });
  }
};

module.exports = verifyToken;
