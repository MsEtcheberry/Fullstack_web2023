const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const clothingSchema = new Schema({
    displayName: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, { timestamps: true }).set('toJSON', { //Esta parte es opcional
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
        delete object.password;
    }
})

const Clothing = mongoose.model('clothes', clothingSchema);
module.exports = Clothing;