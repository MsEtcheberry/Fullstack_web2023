require("mongoose")
const Character = require('../models/character');
const User = require("../models/user");


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

/*const getAllCharacters = async (limit, offset) => {
    const characters = await Character.find({}).limit(limit).skip(offset);
    return characters;
}*/

const getCharactersForUser = async (userId, limit, offset) => {
    if (!userId || limit, offset) {
        return false;
    }
    const characters = await Character.find({ userId: userId }).sort({ created: "descending" }).limit(limit).skip(offset)
    return characters
}

const getLatestCharacters = async () => {
    const characters = await Character.find().limit(5).sort({ createdAt: "descending" });
    return characters;
}

const getCharacter = async (id) => {
    const character = await Character.findById(id);
    return character
}

const deleteCharacter = async (id) => {//Elimina el personaje de la BD
    const character = await User.findByIdAndRemove(id);
    return character
}

module.exports = { addCharacter, getCharactersForUser, getCharacter, getLatestCharacters, deleteCharacter }