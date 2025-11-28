const Event = require("../../model/events");

const addEvent = async (req, res) => {
    try {
        const eventData = req.body;
        const newEvent = await Event.create(eventData);

        return res.status(201).json({
            message: "Event added successfully",
            data: newEvent,
        });

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
