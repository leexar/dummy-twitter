const express = require('express');
const db = require('../db/userManager');
const auth = require('../auth');
const middleware = require('../middleware');

const router = express.Router();

router.post('/login', async (req, res) => {
    let { email, password } = req.body;

    if(!email.includes('@')){
        return res.status(400).json({
            message: 'Please enter correct e-mail'
        })
    }
    
    try 
    {
        const user = await db.getOneByEmail(email);
        if(!user){
            return res.status(404).json({
                message: 'User not found.'
            });
        }
        if(user.password !== password){
            return res.status(400).json({
                message: 'Wrong password.'
            });
        }

        res.status(200).json({
            success: 1,
            token: auth.createToken({
                data: { email: user.email, id: user.user_id }
            }),
            user: {
                email: user.email,
                id: user.user_id,
                name: user.name
            }
        });
    } 
    catch (e) 
    {
        res.status(500).json({
            message: e
        });
    }
});

router.post('/reg', async (req, res) => {
    let { name, email, password, userId } = req.body;

    if (!email.includes('@')) {
        return res.status(400).json({
            message: 'Please enter correct e-mail'
        })
    }

    try 
    {
        await db.addOne([ name, userId, email, password ]);
        res.status(200).json({
            success: 1,
            token: auth.createToken({
                data: { email: email, id: userId }
            }),
            user: {
                email: email,
                id: userId,
                name: name
            }
        })
    }
    catch (e) 
    {
        res.status(500).json({
            message: e
        });
    }
});

router.get('/:id', async (req, res) => {
    let id = req.params.id;

    try 
    {
       const user = await db.getOneById(id);

        res.status(200).json({
            name: user.name
        })
    } 
    catch (e) 
    {
        res.status(500).json({
            message: e
        })
    }
});

router.put('/:id', middleware.verifyToken, middleware.verifyIds, async (req, res) => {
    let { email, name, id, currentPassword } = req.body;

    try 
    {
        const user = await db.getOneById(id);
        if (currentPassword !== user.password){
            return res.status(400).json({
                message: "Invalid current password."
            })
        }
        await db.updateOne([email, name, id ]);

        res.status(200).json({
            success: 1
        });
    } 
    catch (e) 
    {
        res.status(500).json({
            message: e
        })
    }
});

router.post('/reload', middleware.verifyToken, async (req, res) => {
    let id = req.body.tokenData.id;

    try 
    {
        const user = await db.getOneById(id);

        res.status(200).json({
            user: {
                email: user.email,
                id: user.user_id,
                name: user.name
            }
        })
    } 
    catch (e) 
    {
        res.status(500).json({
            message: e
        })
    }
});

module.exports = router;