const { Schema, model } = require("mongoose");

const bookingSchema = new Schema(
    {
        place: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Place'
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true
        },
        checkIn: {
            type: Date,
            required: true
        },
        checkOut: {
            type: Date,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        price: {
            type: Number
        }
    },
    {
        timestamps: true
    }
)

const Booking = model('Booking', bookingSchema);

module.exports = Booking;