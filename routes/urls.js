const express = require('express')
const alien = require('../models/alien')
const router = express.Router()
const Alien = require('../models/alien')

router.get('/', async (req, res) => {
    try {
        const aliens = await Alien.find()
        res.json(aliens)
    }
    catch (err) {
        res.send('Error' + err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const aliens = await Alien.findById(req.params.id)
        res.json(aliens)
    }
    catch (err) {
        res.send('Error' + err)
    }
})

router.post('/addData', async (req, res) => {
    const alien = new Alien({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub,
    })
    try {
        const a1 = await alien.save()
        res.json(a1)
    }
    catch (err) {
        res.send('Error ' + err)
    }
})

router.patch('/updateData/:id', async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id)
        { req.body.name && (alien.name = req.body.name) }
        { req.body.tech && (alien.tech = req.body.tech) }
        { req.body.sub && (alien.sub = req.body.sub) }
        const a1 = await alien.save()
        res.json(a1)
    }
    catch (err) {
        res.send('Error' + err)
    }
})

router.delete('/deleteData/:id', async (req, res) => {
    try {
        let delete_task = await Alien.findByIdAndRemove({
            _id: req.params.id
        });
        res.send(delete_task);
    } catch (error) {
        res.send('Error' + err)
    }
});

module.exports = router