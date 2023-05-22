const { Ingredient, Recipe_ingredient } = require("../models");
const moment = require('moment'); // require
const { Op } = require("sequelize");
const { QueryTypes, DATEONLY, DATE } = require("sequelize");

const getAllIngredient = async (req, res) => {

    try {
        const limit = Number(req.query.limit);
        const page = Number(req.query.page);
        const limit_page = [limit * (page - 1), limit * page]
        let result = await Ingredient.findAndCountAll({
            offset: limit_page[0],
            limit: limit_page[1] - limit_page[0],
            nest: true,
        });

        let maxPage = Math.ceil(result.count / limit);
        let listIngredient = result.rows;

        res.status(200).json({ listIngredient, maxPage, isSuccess: true });

    } catch (error) {
        res.status(500).json({
            message: 'Error'
        });
    }
};
const editIngredient = async (req, res) => {

    try {
        const { idIngredient, name, image } = req.body;
        let newIngredient = await Ingredient.findOne({
            where: {
                idIngredient: idIngredient
            }
        });

        if (newIngredient === null) {
            return res.status(403).json({ isSuccess: false })
        }
        else {
            newIngredient.name = name;
            newIngredient.image = image;
            newIngredient.save();
        }
        res.status(200).json({ isSuccess: true, newIngredient });

    } catch (error) {
        res.status(500).json({
            isSuccess: false
        });
    }
};

const addIngredient = async (req, res) => {

    try {
        const { name, image } = req.body;
        let newIngredient = await Ingredient.create({
            name: name,
            image: image
        });

        if (newIngredient === null) {
            return res.status(500).json({ isSuccess: false })
        }

        res.status(200).json({ isSuccess: true, newIngredient });

    } catch (error) {
        res.status(500).json({
            isSuccess: false
        });
    }
};

const delIngredient = async (req, res) => {

    try {
        const { idIngredient } = req.params;
        let ingredient = await Ingredient.findOne({
            where: { idIngredient }
        })
        if (ingredient) {
            let recipe_ingredient = await Recipe_ingredient.destroy({
                where: { idIngredient }
            });
            ingredient.destroy();
        }
        else {
            res.status(403).json({
                isSuccess: false
            });
        }



        res.status(200).json({ isSuccess: true });

    } catch (error) {
        res.status(500).json({
            isSuccess: false
        });
    }
};
const searchIngredient = async (req, res) => {


    try {
        const name = req.query.name
        const limit = Number(req.query.limit);
        const page = Number(req.query.page);
        const limit_page = [limit * (page - 1), limit * page]
        console.log(name, limit, page, limit_page)


        const result = await Ingredient.findAndCountAll({
            where: {
                name: { [Op.like]: `%${name}%` }
            },
            offset: limit_page[0],
            limit: limit_page[1] - limit_page[0],
            nest: true,

        });

        let maxPage = Math.ceil(result.count / limit);
        let listIngredient = result.rows;



        res
            .status(200)
            .json({
                listIngredient,
                maxPage,
                isSuccess: true
            });
    } catch (error) {
        res.status(500).json({ isSuccess: false });
    }
};

module.exports = {

    getAllIngredient, editIngredient, addIngredient, delIngredient,
    searchIngredient
};