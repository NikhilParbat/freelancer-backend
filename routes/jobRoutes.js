const express = require("express");
const Job = require("../models/Job");

const router = express.Router();

router.post("/", async (req, res) => {
  const { title, description, price, postedBy } = req.body;
  const newJob = new Job({ title, description, price, postedBy });
  await newJob.save();
  res.status(201).json(newJob);
});

router.get("/", async (req, res) => {
  const jobs = await Job.find().populate("postedBy", "name");
  res.json(jobs);
});

module.exports = router;
