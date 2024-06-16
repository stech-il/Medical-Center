const express = require('express');

const router = express.Router();

const MessagesController = require('../controllers/MessagesController');

router.get('/', MessagesController.getAllMessages)
router.get('/:id', MessagesController.getMessageById)
router.post('/', MessagesController.AddMessage)
router.put('/:id', MessagesController.updateMessage)
router.delete('/:id', MessagesController.deleteMessage)

module.exports = router;