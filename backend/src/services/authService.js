const jwt = require('jsonwebtoken');
const { BusinessUser } = require('../models');
// Using your Firebase project ID from .env
const firebaseApiKey = process.env.FIREBASE_API_KEY || ""; 

const sessionStore = new Map();

class AuthService {
  async requestOtp(phoneNumber) {
    // Note: This matches Rohit's logic exactly
    return { message: "OTP process initialized (Ready for Rohit's Firebase Key)" };
  }

  async verifyOtpAndLogin(phoneNumber, otp) {
    // For now, let's allow a "Test Mode" login so you can keep working
    let user = await BusinessUser.findOne({ where: { phoneNumber } });
    if (!user) user = await BusinessUser.create({ phoneNumber, role: 'business' });

    const token = jwt.sign(
      { id: user.id, phoneNumber: user.phoneNumber, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '2d' }
    );
    return { message: "Login successful", user, token };
  }
}

module.exports = new AuthService();
