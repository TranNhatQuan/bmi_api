const { Ingredient} = require("../models");
const moment = require('moment'); // require
const { Op } = require("sequelize");
const { QueryTypes, DATEONLY, DATE } = require("sequelize");

const getAllIngredient = async (req,res) =>{
    
    try {
        let u_history = await Ingredient.findAll({
            attributes: ['idIngredient', 'name'],
        });
        
        
        res.status(200).json(u_history);

    } catch (error) {
        res.status(500).json({
            message: 'Error'
        });
    }
};

module.exports = {
    // getDetailTaiKhoan,
    getAllIngredient
};