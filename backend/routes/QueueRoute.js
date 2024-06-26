const express = require('express');
const router = express.Router();

const QueueController = require('../controllers/QueueController');

// Get a single patient by ID
router.get('/:id', QueueController.findQueueById);

//Get the first patient in queue of room
router.get('/firstInRoom/:id',QueueController.getFirstInRoom);
router.get('/roomQueue/:id', QueueController.getQueueListByRoom);

// Get all patients
router.get('/', QueueController.findAllQueues);

// Create a new patient
router.post('/', QueueController.createQueue);

// Update a patient by ID
router.put('/:id', QueueController.updateQueue);

// Delete a patient by ID
router.delete('/:id', QueueController.deleteQueue);





module.exports = router;