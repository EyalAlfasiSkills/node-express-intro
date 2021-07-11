const express = require('express')
const { msgValidator } = require('../middlewares/msgValidator')
const { getSortedMsgs, addMsg } = require('./msgService')
const router = express.Router()


router.get('/chatroom', (req, res) => {
    const msgs = getSortedMsgs()
    res.json(msgs)
})

router.post('/chatroom/new_msg', msgValidator, (req, res) => {
    const { msg } = req.body
    addMsg(msg)
    res.status(200).send('Validation success')
})

module.exports = router