const Job = require("../models/Job");

// Create a new job
const createJob = async (req, res) => {
  try {
    const { title, description, price, paymentType, postedBy, status } =
      req.body;

    if (!title || !description || !price || !postedBy) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newJob = new Job({
      title,
      description,
      price,
      paymentType,
      postedBy,
      interestedUsers: [],
      assignedTo: null,
      status,
    });
    await newJob.save();

    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("postedBy", "name email")
      .populate("assignedTo", "name email");

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get jobs by a specific client
const getJobsByClient = async (req, res) => {
  try {
    const clientId = req.params.clientId;

    const jobs = await Job.find({ postedBy: clientId })
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching jobs", error: error.message });
  }
};

// Get a single job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("postedBy", "name email")
      .populate("assignedTo", "name email");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a job
const updateJob = async (req, res) => {
  try {
    const { title, description, price, status, assignedTo, paymentType } =
      req.body;

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    job.title = title || job.title;
    job.description = description || job.description;
    job.price = price || job.price;
    job.status = status || job.status;
    job.assignedTo = assignedTo || job.assignedTo;
    job.paymentType = paymentType || job.paymentType;

    const updatedJob = await job.save();
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Freelancer expresses interest in a job
const expressInterestInJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: "Freelancer ID is required" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Prevent duplicates
    if (job.interestedUsers.includes(userId)) {
      return res
        .status(400)
        .json({ message: "Freelancer already expressed interest" });
    }

    job.interestedUsers.push(userId);
    await job.save();

    res.status(200).json({ message: "Interest expressed successfully", job });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Assign a job to a freelancer
const assignJob = async (req, res) => {
  try {
    const { assignedTo } = req.body;

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    job.assignedTo = assignedTo;
    job.status = "in-progress";

    const updatedJob = await job.save();
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Mark a job as completed
const completeJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    job.status = "completed";
    const updatedJob = await job.save();

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await job.deleteOne();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getInterestedUsers = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "interestedUsers",
      "name email"
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ interestedUsers: job.interestedUsers });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
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
};
