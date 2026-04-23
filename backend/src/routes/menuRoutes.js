const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const { authenticateJWT } = require('../middlewares/authMiddleware');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: { folder: 'meal-menus', allowed_formats: ['jpg', 'png'] },
});
const upload = multer({ storage: storage });

/**
 * @swagger
 * /api/menu/upload:
 *   post:
 *     tags: [Menu]
 *     summary: Upload a daily menu image (Cloudinary)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               schoolId:
 *                 type: integer
 *               items:
 *                 type: string
 */
router.post('/upload', authenticateJWT, upload.single('image'), menuController.uploadMenu);

/**
 * @swagger
 * /api/menu/{schoolId}:
 *   get:
 *     tags: [Menu]
 *     summary: Get newest menu for a school
 *     parameters:
 *       - in: path
 *         name: schoolId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the school (Use 1)
 */
router.get('/:schoolId', menuController.getDailyMenu);

module.exports = router;
