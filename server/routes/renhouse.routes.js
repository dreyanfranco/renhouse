const renhouseRouter = require("express").Router();
const mongoose = require("mongoose");
const Van = require('../models/Renhouse.model');
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Place = require("../models/Renhouse.model");

// get all renhouse

renhouseRouter.get('', async (req, res) => {
  try {
    const renhouseList = await Van
      .find()
      .populate('owner')
    return res.status(200).json(renhouseList);
  } catch (error) {
    res.status(500).json(error);
  }
})

// get all renhouse from host

renhouseRouter.get('/user/:user_id', async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId(req.params.user_id);
    const userOwnedrenhouse = await Van
      .find({ owner: userId })
      .populate('owner')

    return res.status(200).json(userOwnedrenhouse)
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
})

// get one van by id

renhouseRouter.get('/:van_id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.van_id)) {
    res.status(404).json({ message: 'Invalid ID' })
    return;
  }
  try {
    const vanId = await Van.findById(req.params.van_id)
    return res.status(200).json(vanId);
  } catch (error) {
    res.status(500).json(error);
  }
})

// delete one van

renhouseRouter.delete('/:van_id', async (req, res) => {
  try {
    const vanIdAndDelete = await Van.findByIdAndDelete(req.params.van_id)
    return res.status(200).json(vanIdAndDelete)
  } catch (error) {
    res.status(500).json(error)
  }
})

// create a place

renhouseRouter.post('/places', isAuthenticated, async (req, res) => {
  const newPlaceData = {
    ...req.body,
    owner: req.payload._id
  }
  try {
    const newPlace = await Place.create(newPlaceData)
    return res.status(200).json(newPlace);
  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = renhouseRouter;