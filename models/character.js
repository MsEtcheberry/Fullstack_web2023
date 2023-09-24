const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const characterSchema = new Schema({
    displayName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    baseCharacter: {
        type: Object,
        required: true
    },
    upperClothing: {
        type: Object,
        required: true
    },
    bottomClothing: {
        type: Object,
        required: true
    },
    shoes: {
        type: Object,
        required: true
    },
}, { timestamps: true }).set('toJSON', { //Esta parte es opcional
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
        delete object.password;
    }
})

const Character = mongoose.model('characters', characterSchema);
module.exports = Character;