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

// Add interested freelancers
router.post("/job/:id/interest", expressInterestInJob);

// Assign a job to a freelancer
router.put("/job/:id/assign", jobController.assignJob);

// Delete a job
router.delete("/:id", deleteJob);

//Show interested users
router.get("/job/:id/interested-users", getInterestedUsers);

module.exports = router;
