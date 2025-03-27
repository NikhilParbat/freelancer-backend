const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["freelancer", "client"], required: true },
    profileImage: { type: String }, // Profile picture URL
    skills: [{ type: String }], // Only for freelancers
    hourlyRate: { type: Number }, // Only for freelancers
    postedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }], // Only for clients
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
