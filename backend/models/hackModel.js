const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: {
      type: String,
      enum: ["Online", "In-Person"],
      required: true,
    },
    organisedBy: { type: String},
    customLocation: { type: String},
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    registrationDeadline: { type: Date, required: true },
    eligibility:[String],
    teamSize: {
      type: String,
      enum: ["Individual", "Team"],
      required: true,
    },
    maxTeamSize: { type: Number, default: 1 },
    bannerImage: { type: String, default: null },
    prizes: [
      {
        place: { type: String, required: true },
        amount: { type: String, required: true },
        description: { type: String, default: "" },
      },
    ],
    timeline: [
      {
        event: { type: String, required: true },
        date: { type: Date, required: true },
      },
    ],
    website: { type: String, default: "" },
    contactEmail: { type: String, required: true },
    rules: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("HackathonForm", formSchema);
