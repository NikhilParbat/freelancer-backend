const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }, // Fixed price for the job
    paymentType: {
      type: String,
      enum: ["one-time", "monthly-installments", "two-stage"],
      default: "one-time",
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Client who posted the job
    interestedUsers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    }, // Freelancers interested in project
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    }, //Freelancer assigned for project
    status: {
      type: String,
      enum: ["open", "in-progress", "completed"],
      default: "open",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
