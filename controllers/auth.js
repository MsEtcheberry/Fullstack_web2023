require('mongoose');
const jwt = require('jsonwebtoken'); //Herramienta wue gestiona tokens.

const User = require('../models/user');

const login = async = async (email, password) => {
    const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(password)
        .digest('hex'); //Encripta la contraseña pasada por el login
    const result = await User.findOne({ email: email, isActive: true, password: cryptoPass }); //Se busca un user que coincida con el mail y pass encriptada

    if (result) { //Si existe
        jwt.sign('payload', 'secret_key')
        const token = jwt.sign({ email: email }, 'secret_key');

        return token;
    }
    return null;
}
module.exports = { login }