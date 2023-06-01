const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const House = mongoose.model("House");
const router = express.Router();

router.use(requireAuth);

router.get("/houses", async (req, res) => {
  const houses = await House.find({ userId: req.user._id });

  res.send(houses);
});

router.post("/houses", async (req, res) => {
  const { name, rooms } = req.body;

  if (!name || !rooms) {
    return res.status(422).send({ error: "You must provide a name and rooms" });
  }

  try {
    const house = new House({ name, rooms, userId: req.user._id });

    await house.save();

    res.send(house);
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
});

module.exports = router;
