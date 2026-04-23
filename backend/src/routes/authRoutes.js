const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateJWT } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/auth/request-otp:
 *   post:
 *     tags: [Auth]
 *     summary: Request SMS OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "+919876543210"
 */
router.post('/request-otp', authController.requestOtp);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login with OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *               otp:
 *                 type: string
 */
router.post('/login', authController.loginUser);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Logout user
 */
router.post('/logout', authController.logoutUser);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     tags: [Auth]
 *     summary: Get user profile
 *     security:
 *       - bearerAuth: []
 */
router.get('/profile', authenticateJWT, authController.getProfile);

module.exports = router;
