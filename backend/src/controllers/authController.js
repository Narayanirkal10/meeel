const authService = require('../services/authService');

exports.requestOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const result = await authService.requestOtp(phoneNumber);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    const result = await authService.verifyOtpAndLogin(phoneNumber, otp);
    
    // Log the token to terminal for easy copying
    console.log('--- TEST TOKEN GENERATED ---');
    console.log(result.token);
    console.log('----------------------------');

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logoutUser = (req, res) => {
  res.status(200).json({ message: "Successfully logged out" });
};

exports.getProfile = (req, res) => {
  res.status(200).json({ user: req.user });
};
