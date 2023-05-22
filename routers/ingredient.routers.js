const express = require("express");

const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js")

const {getAllIngredient, addIngredient, editIngredient, delIngredient, searchIngredient} = require("../controllers/ingredient.controllers");

const ingredientRouter = express.Router();


ingredientRouter.get("/",authenticate,authenticate, getAllIngredient)
ingredientRouter.get("/search",authenticate,authorize(1), searchIngredient)
ingredientRouter.put("/edit",authenticate, authorize(1), editIngredient)
ingredientRouter.post("/add",authenticate,authorize(1),addIngredient)
ingredientRouter.delete("/del/:idIngredient",authenticate,authorize(1),delIngredient)
module.exports = {
    ingredientRouter
}