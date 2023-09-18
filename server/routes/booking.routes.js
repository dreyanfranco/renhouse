const router = require("express").Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const Booking = require('../models/Booking.model.js')

router.post('/bookings', isAuthenticated, async (req, res) => {
    const { place, checkIn, checkOut, numberOfGuests, name, phone, price, user } = req.body

    Booking.create({
        place, checkIn, checkOut, numberOfGuests, name, phone, price, user
    })
        .then((doc) => {
            res.json(doc)
        })
        .catch((error) => {
            throw error
        })
})

router.get('/bookings', isAuthenticated, async (req, res) => {
    try {
        const bookingsList = await Booking
            .find({ user: req.payload._id })
            .populate('place')
        return res.status(200).json(bookingsList);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/bookings/:booking_id', isAuthenticated, async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.booking_id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return;
    }
    try {
        const bookingId = await Booking
            .findById(req.params.booking_id)
            .populate('place')
        return res.status(200).json(bookingId);
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router

