require("mongoose") //Para trabajar con los modelos predefinidos

const User = require('../models/user');  //

const addUser = async (name, lastname, email, nickname, password) => {
    //Hace toda la lógica previa antes de tocar el modelo para persistir

    if (!name || !lastname || !email || !nickname || !password) {
        return false
    }
    let user = await User.findOne({ email: email });
    //let nicknameTaken = await User.findOne({ nickname: nickname })
    if (!user) {
        const cryptoPass = require('crypto').createHash('sha256').update(password).digest('hex');

        const usr = new User(
            {
                name: name,
                lastName: lastname,
                nickname: nickname,
                email: email,
                password: cryptoPass
            }
        );

        let user = await usr.save();
        console.log("Se ha creado el usuario");
        return { user };
    } else {
        return false;
    }

}

const getAllUsers = async (limit, offset) => {
    //Muestra SOLO usuariosa activos
    const users = await User.find({ isActive: true }).limit(limit).skip(offset);
    return users;
}

const getUser = async (id) => {
    const user = await User.findById(id);
    return user;
}

const editUser = async (user) => {
    const result = await User.findByIdAndUpdate(user._id, user, { new: true });
}

const editRoles = async (roles, id) => {

}

const deleteUser = async (id) => {
    //Elimina el documento en mongoDB
    const user = await User.findByIdAndRemove(id);
    return user;
}

module.exports = { addUser, getAllUsers, getUser, editRoles, editUser, deleteUser }