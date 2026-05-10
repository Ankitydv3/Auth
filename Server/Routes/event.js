const express = require('express'); 
const router = express.Router();

const { protect, admin } = require('../Middleware/auth'); 
const {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../Controller/eventController');

// Public routes
router.get('/', getAllEvents);
router.get('/:id', getEventById);

// Protected (Admin only)
router.post('/', protect, admin, createEvent);
router.put('/:id', protect, admin, updateEvent);
router.delete('/:id', protect, admin, deleteEvent);

module.exports = router;