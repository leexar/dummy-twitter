const express = require('express');
const db = require('../db/postManager');
const middleware = require('../middleware');

const router = express.Router();

router.post('/', middleware.verifyToken, async (req, res) => {
    let token = req.body.tokenData;
    let { author, text } = req.body;

    if(!token || token.id !== author){
        return res.status(400);
    }

    try
    {
        await db.addOne([ author, text ]);
        res.status(200).json({
            success: 1
        });
    }
    catch(e)
    {
        res.status(500).json({
            message: e
        });
    }
});

router.get('/', async (req, res) => {
    try 
    {
        const posts = await db.getAll();
        res.status(200).json({
            posts: posts
        });
    }
    catch (e) 
    {
        res.status(500).json({
            message: e
        });
    }
})

router.get('/:authorId', async (req, res) => {
    let author = req.params.authorId;

    try 
    {
        const posts = await db.getAllByAuthorId(author);
        res.status(200).json({
            posts: posts
        });
    }
    catch (e) 
    {
        res.status(500).json({
            message: e
        });
    }
});

router.put('/:id', middleware.verifyToken, middleware.verifyIds, async (req, res) => {
    let { text, postId, id } = req.body;

    try 
    {
        await db.updateOne([ text, postId, id ]);
        res.status(200).json({
            success: 1
        });
    }
    catch (e) 
    {
        res.status(500).json({
            message: e
        });
    }
});

router.delete('/:id', middleware.verifyToken, async (req, res) => {
    let author = req.body.tokenData.id
    let postId = req.params.id;

    try 
    {
        await db.deleteOne([ postId, author ]);

        res.status(200).json({
            success: 1
        });
    }
    catch (e) 
    {
        res.status(500).json({
            message: e
        });
    }
});

module.exports = router;