const express = require("express");

const {authenticate} = require("../middlewares/auth/authenticate.js")
// const {authorize} = require("../middlewares/auth/authorize.js")
const { checkExistUserRecipe } = require("../middlewares/validates/checkExist");
const {getInfoRecipe, getFavorite, getAllRecipe, getRecipeByTitle, likeRecipe, userCMT, updateRank} = require("../controllers/recipe.controllers");

const recipeRouter = express.Router();
//lay day du thong tin mot mon an
recipeRouter.get("/:idRecipe",authenticate, getInfoRecipe)
recipeRouter.put("/like",authenticate, likeRecipe)
recipeRouter.put("/cmt/:idRecipe", authenticate, userCMT)
recipeRouter.get("/favorite", authenticate, getFavorite) 
recipeRouter.get("/",authenticate, getAllRecipe)
recipeRouter.get("/:title",authenticate, getRecipeByTitle)
recipeRouter.put("/updateRank", authenticate, updateRank)
// recipeRouter.put("/edit",authenticate, authorize([1]), editRecipe)
module.exports = {
    recipeRouter
}