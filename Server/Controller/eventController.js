const Event = require('../Models/Event');

exports.getAllEvents = async (req, res) => {
    try {
        const filters = {};
        if (req.query.category) {
            filters.category = req.query.category;
        }
        if (req.query.ticketPrice) {
            filters.ticketPrice = req.query.ticketPrice;
        }


        const events = await Event.find(filters);
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events' });
    }
};
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);      
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }   

        res.json(event);
    }
    catch (error) {

        res.status(500).json({ message: 'Error fetching event' });
    }   
};

exports.createEvent = async (req, res) => {
    const { title, description, date, location, category, ticketPrice, totalSeats, availableSeats, imageUrl } = req.body;
    if (!title || !description || !date || !location || !category || !ticketPrice || !totalSeats || !imageUrl) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const event = await Event.create({
            title,
            description,
            date,
            location,
            category,
            ticketPrice,
            totalSeats,
            availableSeats: availableSeats ?? totalSeats,
            imageUrl,
            createdBy: req.user._id
        });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error creating event' });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error updating event' });
    }
};

exports.deleteEvent = async (req, res) => { 
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {

        res.status(500).json({ message: 'Error deleting event' });
    }
};


        