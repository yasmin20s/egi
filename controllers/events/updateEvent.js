const Event = require("../../model/events");

const updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const updates = req.body;

        const updatedEvent = await Event.findByIdAndUpdate(
            eventId, 
            updates, 
            { new: true, runValidators: true, select: "-__v" }
        );

        if (!updatedEvent) {
            return res.status(404).json({
                message: "Event not found",
            });
        }

        return res.status(200).json({
            message: "Event updated successfully",
            data: updatedEvent,
        });

    } catch (err) {
        console.error("Error updating event:", err);
        
        if (err.name === 'ValidationError') {
             return res.status(400).json({
                message: "Validation failed: Check required fields or data format.",
                error: err.message,
            });
        }
        
        return res.status(500).json({
            message: "Error updating event",
            error: err.message,
        });
    }
};

module.exports = updateEvent;