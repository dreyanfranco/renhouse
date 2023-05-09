const { Schema, model } = require("mongoose");

const renhouseSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        price: {
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
            required: [true, 'Image is required']
        },
        type: {
            type: String,
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

const Renhouse = model('Renhouse', renhouseSchema);

module.exports = Renhouse;