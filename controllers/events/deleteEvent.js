const Event = require("../../model/events");

const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;

        const deletedEvent = await Event.findByIdAndDelete(eventId);

        if (!deletedEvent) {
            return res.status(404).json({
                message: "Event not found",
            });
        }

        return res.status(200).json({
            message: "Event deleted successfully",
            data: deletedEvent,
        });

    } catch (err) {
        console.error("Error deleting event:", err);
        return res.status(500).json({
            message: "Error deleting event",
            error: err.message,
        });
    }
};

module.exports = deleteEvent;