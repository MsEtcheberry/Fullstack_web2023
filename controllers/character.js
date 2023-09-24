require("mongoose") //Para trabajar con los modelos predefinidos

const Character = require('../models/character');  //


const addCharacter = async (userId, displayName, baseCharacter, upperClothing, bottomClothing, shoes) => {
    if (!userId || !displayName || !baseCharacter || !upperClothing || !bottomClothing || !shoes) {
        return false;
    }

    let nameTaken = await Character.findOne({ displayName: displayName, userId: userId });
    if (!nameTaken) {
        const character = new Character(
            {
                userId: userId,
                displayName: displayName,
                baseCharacter: baseCharacter,
                upperClothing: upperClothing,
                bottomClothing: bottomClothing,
                shoes: shoes
            }
        )
        let charac = await character.save();
        console.log("character: " + charac)
        return charac
    } else {
        return false
    }
}

const getAllCharacters = async (limit, offset) => {
    const characters = await Character.find({}).limit(limit).skip(offset);
    return characters;
}

const getLatestCharactersForUser = async (userId) => {
    if (!userId) {
        return false;
    }
    const characters = await Character.find({ userId: userId }).limit(5).sort({ created: "descending" })
    return characters
}

const getCharacter = async (id) => {
    const character = await Character.findById(id);
    return character
}

/*
const editUser = async (user) => {
    const result = await User.findByIdAndUpdate(user._id,user,{new:true});
}

const editRoles = async (roles,id) => {

}

const deleteUser = async (id) => {

}
*/
module.exports = { getAllCharacters, addCharacter, getLatestCharactersForUser, getCharacter }