const express = require("express");

const {authenticate} = require("../middlewares/auth/authenticate.js")
// const {authorize} = require("../middlewares/auth/authorize.js")

const {getInfoRecipe, getFavorite, getAllRecipe, getRecipeByTitle} = require("../controllers/recipe.controllers");

const recipeRouter = express.Router();
//lay day du thong tin mot mon an
recipeRouter.get("/:idRecipe",authenticate, getInfoRecipe)

recipeRouter.get("/favorite", authenticate, getFavorite) 
recipeRouter.get("/",authenticate, getAllRecipe)
recipeRouter.get("/:title",authenticate, getRecipeByTitle)
// recipeRouter.put("/edit",authenticate, authorize([1]), editRecipe)
module.exports = {
    recipeRouter
}