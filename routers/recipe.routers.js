const express = require("express");
const {Recipe} = require("../models")
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js")

const {getFavorite, getInfoRecipe,getAllRecipe, editRecipe} = require("../controllers/recipe.controllers");

const recipeRouter = express.Router();
//lay day du thong tin mot mon an
recipeRouter.get("/:idRecipe", authenticate, getInfoRecipe)
//lay cac Recipe ma user co isLike = 1
recipeRouter.get("/favorite", authenticate, getFavorite) 
recipeRouter.get("/",authenticate, getAllRecipe)
recipeRouter.put("/edit",authenticate, authorize([1]), editRecipe)
module.exports = {
    recipeRouter,
}