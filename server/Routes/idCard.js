const express = require("express");
const router = express.Router();
const cors = require("cors");
const IdCard = require("../Model/IdCard");

// Get all ID cards
router.get("/idCard", async (req, res) => {
  try {
    const idCards = await IdCard.find();
    res.status(200).json(idCards);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get an ID card by identification number
router.get("/idCard/:identificationNo", async (req, res) => {
  const { identificationNo } = req.params;
  try {
    const idCard = await IdCard.findOne({ identificationNo });
    if (idCard) {
      res.status(200).json(idCard);
    } else {
      res.status(404).send("ID Card not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Create a new ID card
router.post("/idCard", cors(), async (req, res) => {
  try {
    const newIdCardData = {
      ...req.body,
      status: "success",
    };

    const newIdCard = await IdCard.create(newIdCardData);
    res.status(201).json(newIdCard);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "failure", errorMsg: "Internal Server Error" });
  }
});

// Update Existing ID Card
router.put("/idCard/:identificationNo", async (req, res) => {
  const { identificationNo } = req.params;
  const updatedData = req.body;

  try {
    const updatedIdCard = await IdCard.findOneAndUpdate(
      { identificationNo },
      updatedData,
      { new: true }
    );

    if (updatedIdCard) {
      res.status(200).json(updatedIdCard);
    } else {
      res.status(404).json({ status: "failure", errorMsg: "ID Card not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failure", errorMsg: "Internal Server Error" });
  }
});

// filter on the basis of status
router.get("/idCard/status/:status", async (req, res) => {
  try {
    const { status } = req.params;

    // Validate the status parameter
    if (status !== "success" && status !== "failure") {
      return res.status(400).json({ error: "Invalid status parameter" });
    }

    // Fetch data based on status
    const idCards = await IdCard.find({ status });

    res.json(idCards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// filter on the basis of date
router.get("/idCard/date/:date", async (req, res) => {
  try {
    const { date } = req.params;

    // Validate the date parameter
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: "Invalid date parameter" });
    }

    // Set the date range from midnight to midnight of the selected date
    const startDate = new Date(parsedDate.setHours(0, 0, 0, 0));
    const endDate = new Date(parsedDate.setHours(23, 59, 59, 999));

    // Fetch data based on date range
    const idCards = await IdCard.find({
      timestamp: { $gte: startDate, $lte: endDate },
    });

    res.status(200).json(idCards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Delete an ID card by identification number
router.delete("/idCard/:identificationNo", async (req, res) => {
  const { identificationNo } = req.params;
  try {
    const deletedIdCard = await IdCard.findOneAndDelete({ identificationNo });
    if (deletedIdCard) {
      res.status(200).send();
    } else {
      res.status(404).send("ID Card not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;