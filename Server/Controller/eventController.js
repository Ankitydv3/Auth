const Event = require('../Models/Event');

exports.getAllEvents = async (req, res) => {
  try {

    const {
      search,
      category,
      location,
      minPrice,
      maxPrice,
      page = 1,
      limit = 6,
      sort = "date"
    } = req.query;

    const filters = {};

    // Search title
    if (search) {
      filters.title = {
        $regex: search,
        $options: "i"
      };
    }

    // Category filter
    if (category) {
      filters.category = category;
    }

    // Location filter
    if (location) {
      filters.location = {
        $regex: location,
        $options: "i"
      };
    }

    // Price range
    if (minPrice || maxPrice) {

      filters.ticketPrice = {};

      if (minPrice)
        filters.ticketPrice.$gte = Number(minPrice);

      if (maxPrice)
        filters.ticketPrice.$lte = Number(maxPrice);
    }

    const skip = (page - 1) * limit;

    const total = await Event.countDocuments(filters);

    const events = await Event.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data: events
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error fetching events"
    });
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


        