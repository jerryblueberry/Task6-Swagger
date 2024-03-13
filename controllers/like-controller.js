const asyncHandler = require('express-async-handler');
const pool = require('../database/database');
const {logger} = require('../logger');

const postLike  = asyncHandler(async(req,res) => {
   try {
    const {postId} = req.body;
    const userId = req.user.id;
    
    const likeQuery = `SELECT * FROM likes WHERE post_id = $1 AND user_id = $2`;
    const {rowCount} = await pool.query(likeQuery,[postId,userId]);
    if( rowCount > 0 ){
        const unlikeQuery = `DELETE FROM LIKES WHERE post_id = $1 AND user_id = $2`;
        await pool.query(unlikeQuery,[postId,userId]);
        logger.info("Post UnLiked");

        return res.status(200).json({message:"Post unliked Successfully"});
    }else{
        const likeInsertQuery = `INSERT INTO likes (post_id,user_id) VALUES($1,$2)`;

        
        await pool.query(likeInsertQuery,[postId,userId]);
        logger.info("Post Liked");
        return res.status(200).json({message:"Post Liked Successfully"});
    }
    
   } catch (error) {
    logger.error("Error Occurred While Liking",{error:error.message});
    res.status(500).json({error:error.message});
   }
   
});

//  controller for getting all the likes
const getAllLikes  = asyncHandler(async(req,res) => {
    try {
        const {postId} = req.body;
        const userId = req.user.id;

        const query = `SELECT likes.*, users.name FROM likes INNER JOIN users ON likes.user_id = users.id WHERE likes.post_id = $1`;
        logger.info(`Getting Likes for post ${postId}`,{query});
        const {rows}  = await pool.query(query,[postId])

        const totalLikes = rows.length;
        return res.status(200).json({likes:rows,totalLikes});
    } catch (error) {
        logger.error(`Error Occurred While fetching Likes for post ${postId}`);
        res.status(500).json({error:error.message});
        
    }
})


module.exports = {postLike,getAllLikes}