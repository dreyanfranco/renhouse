const renhouseRouter = require("express").Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Place = require("../models/Renhouse.model");

// get all places 

renhouseRouter.get('/places', async (req, res) => {
  try {
    const renhouseList = await Place.find()
    // .find({ owner: req.payload._id })
    return res.status(200).json(renhouseList);
  } catch (error) {
    res.status(500).json(error);
  }
})

// get one van by id

renhouseRouter.get('/places/:place_id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.place_id)) {
    res.status(404).json({ message: 'Invalid ID' })
    return;
  }
  try {
    const placeId = await Place.findById(req.params.place_id)
    return res.status(200).json(placeId);
  } catch (error) {
    res.status(500).json(error);
  }
})

renhouseRouter.put('/places/:place_id', async (req, res) => {
  try {
    const placeEditById = await Place.findByIdAndUpdate(req.params.place_id, req.body)
    return res.status(200).json(placeEditById)
  } catch (error) {
    res.status(500).json(error);
  }
})

// delete one van

renhouseRouter.delete('/:place_id', async (req, res) => {
  try {
    const placeIdAndDelete = await Place.findByIdAndDelete(req.params.place_id)
    return res.status(200).json(placeIdAndDelete)
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