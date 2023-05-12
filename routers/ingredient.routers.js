const express = require("express");

const {authenticate} = require("../middlewares/auth/authenticate.js")
// const {authorize} = require("../middlewares/auth/authorize.js")

const {getAllIngredient} = require("../controllers/ingredient.controllers");

const ingredientRouter = express.Router();


ingredientRouter.get("/",authenticate, getAllIngredient)

// ingredientRouter.put("/edit",authenticate, authorize([1]), editRecipe)
module.exports = {
    ingredientRouter
}