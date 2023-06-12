const { Schema, model } = require("mongoose");

const placeSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Name is required']
        },
        address: {
            type: String,
            required: [true, 'Price is required']
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            minlength: [20, 'Description has got to have at least 20 characters']
        },
        imageUrl: {
            type: String,
        },
        perks: {
            type: String,
        },
        extraInfo: {
            type: String,
        },
        checkIn: {
            type: Number,
        },
        checkOut: {
            type: Number
        },
        maxGuests: {
            type: Number
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    {
        timestamps: true
    }
)

const Place = model('Place', placeSchema);

module.exports = Place;