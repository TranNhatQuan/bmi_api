const express = require("express");

const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js")

const {getAllIngredient, addIngredient, editIngredient} = require("../controllers/ingredient.controllers");

const ingredientRouter = express.Router();


ingredientRouter.get("/",authenticate,authorize([1]), getAllIngredient)

ingredientRouter.put("/edit",authenticate, authorize([1]), editIngredient)
ingredientRouter.post("/add",authenticate,authorize([1]),addIngredient)
module.exports = {
    ingredientRouter
}