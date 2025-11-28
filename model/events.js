const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
    },

    category: {
      type: String, // ex: "Historical", "Cultural", "Natural"
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    openingHours: {
      from: { type: String, required: true },
      to: { type: String, required: true },
    },

    entryFee: {
      type: String, // ex: "100 EGP", "Free", "50 EGP per person"
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    img: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+/i.test(v);
        },
        message: "Please provide a valid image URL",
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("Event", eventSchema);
