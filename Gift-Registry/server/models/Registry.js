const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const specificSchema = new Schema({
    item_type: {
        type: String,
        required: true,
    },
    colour: {
        type: String,
        required: false,
    },
    size: { 
        type: String,
        required: false,
    },
    brands: {
        type: [String],
        required: false,
    },
    preferred_retailers: {
        type: [String],
        required: false
    },
})

const regSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    occasion: {
        type: String,
        required: false,
    },
    valid_to: {
        type: Date,
        required: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    participants:[{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    general_items: {
        type:[String],
        required: false,
    },
    specific_items: {
        type: [specificSchema],
        required: false,
    },
},
);

const Registry = mongoose.model('Registry', regSchema);

module.exports = Registry;