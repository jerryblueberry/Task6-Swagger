const express = require('express');
const { postComment, getComments } = require('../controllers/comment-controller');
const { verifyAuth } = require('../middleware/authentication');

const router = express.Router();

/**
 * @swagger
 * /comment:
 *   post:
 *     summary: Post a comment
 *     description: Post a comment on a specific post
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
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment posted successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/comment', verifyAuth, postComment);

/**
 * @swagger
 * /comment/{postId}:
 *   get:
 *     summary: Get comments for a post
 *     description: Retrieve all comments for a specific post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the post to retrieve comments for
 *     responses:
 *       200:
 *         description: List of comments retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/comment/:postId', verifyAuth, getComments);

module.exports = router;
