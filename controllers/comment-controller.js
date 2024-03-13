const asyncHandler = require('express-async-handler');
const pool = require('../database/database');
const {logger} = require('../logger');



//  for posting comment
const postComment   = asyncHandler(async(req,res) => {
    try {
        const {postId,comment} = req.body;
        const userId = req.user.id;
        
        if(!postId || !comment ||! userId){
            return res.status(400).json({message:"All fields are required"});

        }
        const query = `INSERT INTO comments (post_id,user_id,comment,created_at) VALUES ($1,$2,$3,CURRENT_TIMESTAMP)`;
        const values = [postId,userId,comment];
        logger.info("Inserting comment into the database",{query,values});
        const {rows} = await pool.query(query,values);
        logger.info("Comment added Successfully");
        
        res.status(200).json({message:"Comment added Successfully",comment:rows[0]});
    } catch (error) {
        logger.error("Error While posting comments",{error:error.message});
        res.status(500).json({error:error.message});
    }
});

//  get the comments for the post
const getComments = asyncHandler(async(req,res) => {
    try {
        const postId = req.params.postId;

        const query = `SELECT c.comment_id,c.comment,c.created_at,u.name AS commenter_name,u.profileimage AS commenter_profile FROM comments c
        INNER JOIN users u ON c.user_id = u.id WHERE c.post_id = $1 ORDER BY c.created_at DESC
        `;
        logger.info(`Getting Comments from the postId = ${postId}`);

        const {rows:comments} = await pool.query(query,[postId]);
        logger.info(`Successfully got the Comments for postId =  ${postId} `);
        res.status(200).json({comments});

        
    } catch (error) {
        logger.error(`Error Occurred While getting comment for postId = ${postId}`)
        return res.status(500).json({error:error.message});
    }
})

module.exports = {postComment,getComments};