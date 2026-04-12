const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// CREATE
router.post("/add", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.send("Student Added");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// READ
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// UPDATE
router.put("/update/:rollNo", async (req, res) => {
  await Student.findOneAndUpdate(
    { rollNo: req.params.rollNo },
    req.body
  );
  res.send("Updated");
});

// DELETE
router.delete("/delete/:rollNo", async (req, res) => {
  await Student.findOneAndDelete({ rollNo: req.params.rollNo });
  res.send("Deleted");
});

module.exports = router;