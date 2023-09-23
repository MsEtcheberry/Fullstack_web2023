require("mongoose") //Para trabajar con los modelos predefinidos

const Character = require('../models/character');  //

/*
const addCharacter = async (name, lastname, email, isActive, password) => {
    //Hace toda la lógica previa antes de tocar el modelo para persistir
    let userExists = await User.findOne({ email: email });

    if (!userExists) {
        const cryptoPass = require('crypto').createHash('sha256').update(password).digest('hex');

        const usr = new User(
            {
                name: name,
                lastname: lastname,
                email: email,
                isActive: isActive,
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
*/
const getAllCharacters = async (limit, offset) => {
    const characters = await Character.find({}).limit(limit).skip(offset);
    return characters;
}
/*
const getUser = async (id) => {
    const user = await User.findById(id);
    return user;
}

const editUser = async (user) => {
    const result = await User.findByIdAndUpdate(user._id,user,{new:true});
}

const editRoles = async (roles,id) => {

}

const deleteUser = async (id) => {

}
*/
module.exports = { getAllCharacters }