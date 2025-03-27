const express = require("express");
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const router = express.Router();

// Create a new job
router.post("/", createJob);

// Get all jobs
router.get("/", getAllJobs);

// Get a single job by ID
router.get("/:id", getJobById);

// Update a job
router.put("/:id", updateJob);

// Delete a job
router.delete("/:id", deleteJob);

module.exports = router;
