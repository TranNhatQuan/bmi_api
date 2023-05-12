const express = require("express");

const { authenticate } = require("../middlewares/auth/authenticate.js")
// const {authorize} = require("../middlewares/auth/authorize.js")
const { checkExistUserRecipe } = require("../middlewares/validates/checkExist");
const { getInfoRecipe, getFavorite, getAllRecipe, getRecipeByTitle, likeRecipe, userCMT, updateRank,
    listCmtRecipe, getAllRecipeFilter, getRecipeRank,
    searchRecipe } = require("../controllers/recipe.controllers");

const recipeRouter = express.Router();
//lay day du thong tin mot mon an
recipeRouter.get("/:idRecipe", authenticate, getInfoRecipe)
recipeRouter.put("/like", authenticate, likeRecipe)
recipeRouter.put("/cmt/:idRecipe", authenticate, userCMT)
recipeRouter.get("/cmt", authenticate, listCmtRecipe)
recipeRouter.get("/favorite", authenticate, getFavorite)
recipeRouter.get("/", authenticate, getAllRecipe)
recipeRouter.get("/search/", authenticate, searchRecipe)
recipeRouter.get("/all/filter", authenticate, getAllRecipeFilter)
recipeRouter.get('/rank', authenticate, getRecipeRank)
recipeRouter.get("/title/:title", authenticate, getRecipeByTitle)
recipeRouter.put("/updateRank", authenticate, updateRank)
// recipeRouter.put("/edit",authenticate, authorize([1]), editRecipe)
module.exports = {
    recipeRouter
}
