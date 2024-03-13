const express = require('express');
const { signUpUser, signInUser, logout, indexPage } = require('../controllers/user-controller');
const { singleUpload } = require('../middleware/uploadMiddleware');
const { verifyAuth } = require('../middleware/authentication');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         profileimage:
 *           type: file
 *         role:
 *           type: string
 *         created_at:
 *           type: date
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get user details
 *     description: Retrieve details of the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/', verifyAuth, indexPage);

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User signup
 *     description: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               profileimage:
 *                 type: file
 *     responses:
 *       200:
 *         description: Signup successful
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 */
router.post('/signup', singleUpload, signUpUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/login', signInUser);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: User logout
 *     description: Logout the authenticated user
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/logout', logout);

module.exports = router;
