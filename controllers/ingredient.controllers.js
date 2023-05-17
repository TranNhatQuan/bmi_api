const { Ingredient} = require("../models");
const moment = require('moment'); // require
const { Op } = require("sequelize");
const { QueryTypes, DATEONLY, DATE } = require("sequelize");

const getAllIngredient = async (req,res) =>{
    
    try {
        let u_history = await Ingredient.findAll({
            
        });
        
        
        res.status(200).json(u_history);

    } catch (error) {
        res.status(500).json({
            message: 'Error'
        });
    }
};
const editIngredient = async (req,res) =>{
    
    try {
        const {idIngredient, name, image } = req.body;
        let newIngredient = await Ingredient.findOne({
            where:{
                idIngredient:idIngredient
            }
        });
        
        if(newIngredient===null){
            return res.status(403).json({isSuccess:false})
        }
        else{
            newIngredient.name = name;
            newIngredient.image = image;
            newIngredient.save();
        }
        res.status(200).json({isSuccess:true,newIngredient});

    } catch (error) {
        res.status(500).json({
            isSuccess:false
        });
    }
};

const addIngredient = async (req,res) =>{
    
    try {
        const { name, image } = req.body;
        let newIngredient = await Ingredient.create({
            name:name,
            image:image
        });
        
        if(newIngredient===null){
            return res.status(500).json({isSuccess:false})
        }
        
        res.status(200).json({isSuccess:true,newIngredient});

    } catch (error) {
        res.status(500).json({
            isSuccess:false
        });
    }
};

module.exports = {
    
    getAllIngredient, editIngredient, addIngredient
};