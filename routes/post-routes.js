const express = require('express');
const { createPost, getAllPosts, getPostDetails } = require('../controllers/post-controller');
const { verifyAuth } = require('../middleware/authentication');
const { multipleUpload } = require('../middleware/uploadMiddleware');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         postId:
 *           type: string
 *         title:
 *           type: string
 *         content:
 *           type: string
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     description: Create a new post with title and content
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               
 *               images:
 *                 type: file
 *               
 *     responses:
 *       200:
 *         description: Post created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 *
 *   get:
 *     summary: Get all posts
 *     description: Retrieve a list of all posts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of posts retrieved successfully
 *       
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.route('/posts')
  .post(verifyAuth, multipleUpload, createPost)
  .get(verifyAuth, getAllPosts);

/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *     summary: Get post details
 *     description: Retrieve details of a specific post by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to retrieve
 *     responses:
 *       200:
 *         description: Post details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/posts/:postId', verifyAuth, getPostDetails);

module.exports = router;
