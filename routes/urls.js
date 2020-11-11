const express = require('express')
const router = express.Router()
const Model = require('../models/model')

// jwt token 
const jwt = require('jsonwebtoken')

router.get('/getAllTask', async (req, res) => {
    try {
        const get_all_task = await Model.find()
        res.json(get_all_task)
    }
    catch (err) {
        res.send('Error in Get All Task' + err)
    }
});

router.get('/getTask/:id', async (req, res) => {
    try {
        const get_task = await Model.findById(req.params.id)
        res.json(get_task)
    }
    catch (err) {
        res.send('Error in Get Task' + err)
    }
});

router.post('/addTask', async (req, res) => {
    // const insert_task = new Model({
    //     name: req.body.name,
    //     email: req.body.email,
    //     complete: req.body.complete,
    // })
    try {
        const insert_task = await Model.create(req.body);
        res.json(insert_task);
        // const a1 = await insert_task.save()
        // res.json(a1)
    }
    catch (err) {
        res.send('Error in Add Task' + err)
    }
});

router.patch('/updateTask/:id', async (req, res) => {
    try {
        const update_task = await Model.findById(req.params.id)
        { req.body.name && (update_task.name = req.body.name) }
        { req.body.email && (update_task.email = req.body.email) }
        { req.body.complete && (update_task.complete = req.body.complete) }
        const updated_task = await update_task.save()
        res.json(updated_task)
    }
    catch (err) {
        res.send('Error in Update Task' + err)
    }
});

router.patch('/updateTaskStatus/:id', async (req, res) => {
    let task_status = await Model.findById({
        _id: req.params.id
    });
    try {
        task_status.complete = !task_status.complete
        const updated_task_status = await task_status.save()
        res.json(updated_task_status)
    } catch (error) {
        console.log('Error In Update Task Status' + error);
    }
});

router.delete('/deleteTask/:id', async (req, res) => {
    try {
        const delete_task = await Model.findByIdAndRemove({
            _id: req.params.id
        });
        res.json(delete_task);
    } catch (err) {
        res.send('Error In Delele Task' + err)
    }
});

router.delete('/deleteAllTask', async (req, res) => {
    try {
        const delete_all_task = await Model.deleteMany();
        res.json(delete_all_task);
    } catch (err) {
        res.send('Error in Delete All Task' + err)
    }
});

router.delete('/deleteCompleted', async (req, res) => {
    try {
        const deleteCompleted = await Model.deleteMany({ complete: true });
        res.json(deleteCompleted);
    } catch (err) {
        res.send('Error in Delete Completed' + err)
    }
});

// jwt token
router.post('/postverify', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        }
        else {
            res.json({
                msg: 'Post Created...',
                authData
            })
        }
    })
})

router.post('/jwttoken', (req, res) => {
    const user = {
        id: 1,
        name: "vmn",
        email: "vmn@gmail.com"
    }
    jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
        res.json({
            token
        })
    })
})

// verify token
function verifyToken(req, res, next) {

    const bearerHeader = req.headers['authorization']

    // Check if bearer is undefined 
    if (typeof bearerHeader !== 'undefined') {
        // set the token 
        req.token = bearerHeader
        next();
    }
    else {
        res.sendStatus(403)
    }
}

module.exports = router