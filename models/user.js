const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({

    email: {
        type: String,
        required: true,
        index: { unique: true, dropDups: true }
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    roles: {
        type: Array,
        required: true,
        default: ['user']
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    password: {
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

const User = mongoose.model('users', userSchema);
module.exports = User;