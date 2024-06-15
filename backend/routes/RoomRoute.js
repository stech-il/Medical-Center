const express = require('express');
const router = express.Router();

const RoomsController = require('../controllers/RoomController');

// Get a single room by ID
router.get('/:id', RoomsController.findRoomById);

// Get all rooms
router.get('/', RoomsController.findAllRooms);

// Create a new room
router.post('/', RoomsController.createRoom);

// Update a room by ID
router.put('/:id', RoomsController.updateRoom);

// Delete a room by ID
router.delete('/:id', RoomsController.deleteRoom);

module.exports = router;