const Event = require("../../model/events");

const addEvent = async (req, res) => {
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

    // Validation
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

    return res.status(201).json({
      message: "Event created successfully",
      data: newEvent,
    });

  } catch (err) {
    console.error("Error creating event:", err);
    return res.status(500).json({
      message: "Error creating event",
      error: err.message,
    });
  }
};

module.exports = addEvent;
