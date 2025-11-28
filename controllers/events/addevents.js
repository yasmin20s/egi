const Event = require("../../model/events");

const addEvent = async (req, res) => {
    try {
        const eventData = req.body;
        const newEvent = await Event.create(eventData);

        return res.status(201).json({
            message: "Event added successfully",
            data: newEvent,
        });
  try {
    const {
      title,
      location,
      category,
      date,
      openingHours,
      entryFee,
      description,
      img
    } = req.body;
    if (
      !title ||
      !location ||
      !category ||
      !date ||
      !openingHours ||
      !openingHours.from ||
      !openingHours.to ||
      !entryFee ||
      !description ||
      !img
    ) {
      return res.status(400).json({
        message: "All fields are required",
        data: null,
      });
    }

    const existingEvent = await Event.findOne({ description });

    if (existingEvent) {
      return res.status(400).json({
        message: "This event already exists",
        data: null,
      });
    }

    const newEvent = new Event({
      title,
      location,
      category,
      date,
      openingHours: {
        from: openingHours.from,
        to: openingHours.to
      },
      entryFee,
      description,
      img,
    });

    await newEvent.save();

    } catch (err) {
        console.error("Error adding event:", err);
        
        if (err.name === 'ValidationError') {
             return res.status(400).json({
                message: "Validation failed: Check required fields or data format.",
                error: err.message,
            });
        }

        return res.status(500).json({
            message: "Error adding event",
            error: err.message,
        });
    }
};

module.exports = addEvent;