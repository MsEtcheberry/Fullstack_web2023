const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const characterSchema = new Schema({


    name: {
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

const Character = mongoose.model('characters', characterSchema);
module.exports = Character;