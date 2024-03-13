const express = require('express');
const { postLike, getAllLikes } = require('../controllers/like-controller');
const { verifyAuth } = require('../middleware/authentication');
const router = express.Router();

/**
 * @swagger
 * /like:
 *   post:
 *     summary: Like a post
 *     description: Like a specific post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Post liked successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 *
 *   get:
 *     summary: Get all likes
 *     description: Retrieve all likes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of likes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   likeId:
 *                     type: string
 *                   postId:
 *                     type: string
 *                   userId:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/like', verifyAuth, postLike);
router.get('/like', verifyAuth, getAllLikes);

module.exports = router;
