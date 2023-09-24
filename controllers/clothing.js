require("mongoose") //Para trabajar con los modelos predefinidos
const Clothing = require("../models/clothing");


const getAllClothing = async (limit, offset) => {
    const clothing = await Clothing.find({}).limit(limit).skip(offset);
    return clothing;
}

const getClothingByType = async (type, limit, offset) => {
    const clothing = await Clothing.find({ type: type }).limit(limit).skip(offset)
    return clothing;

}

const getClothing = async (id) => {
    const clothing = await Clothing.findById(id);
    return clothing;
}

module.exports = { getAllClothing, getClothingByType, getClothing }