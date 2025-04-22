const express = require("express");
const {
  createJob,
  getAllJobs,
  getJobsByClient,
  getJobById,
  updateJob,
  expressInterestInJob,
  assignJob,
  completeJob,
  deleteJob,
  getInterestedUsers,
} = require("../controllers/jobController");

const router = express.Router();

// Create a new job
router.post("/create", createJob);

//Get jobs created by the client
router.get("/client/:clientId", getJobsByClient);

// Get all jobs
router.get("/", getAllJobs);

// Get a single job by ID
router.get("/:id", getJobById);

// Update a job
router.put("/:id", updateJob);

// Add interested freelancers
router.post("/:id/interest", expressInterestInJob);

// Assign a job to a freelancer
router.put("/:id/assign", assignJob);

// Delete a job
router.delete("/:id", deleteJob);

//Show interested users
router.get("/:id/interested-users", getInterestedUsers);

module.exports = router;
