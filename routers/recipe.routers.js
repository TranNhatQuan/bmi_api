const express = require("express");

const { authenticate } = require("../middlewares/auth/authenticate.js")
// const {authorize} = require("../middlewares/auth/authorize.js")
const { authorize } = require("../middlewares/auth/authorize.js")
const { getInfoRecipe, getFavorite, getAllRecipe, getRecipeByTitle, likeRecipe, userCMT, updateRank,
    listCmtRecipe, getAllRecipeFilter, getRecipeRank,
    searchRecipe, editRecipe, addRecipe,
    getAllRecipeFilterAdmin } = require("../controllers/recipe.controllers");
const { checkExistRecipe } = require("../middlewares/validates/checkExist");
const { checkCreateRecipe } = require("../middlewares/validates/checkCreate");

const recipeRouter = express.Router();
//lay day du thong tin mot mon an
recipeRouter.get("/info/:idRecipe", authenticate, getInfoRecipe)
recipeRouter.put("/like", authenticate, likeRecipe)
recipeRouter.put("/cmt/:idRecipe", authenticate, userCMT)
recipeRouter.get("/cmt", authenticate, listCmtRecipe)
recipeRouter.get("/favorite", authenticate, getFavorite)
recipeRouter.get("/", authenticate, getAllRecipe)
recipeRouter.get("/search/", authenticate, searchRecipe)
recipeRouter.get("/all/filter", authenticate, getAllRecipeFilter)
recipeRouter.get("/all/filterAdmin", authenticate, authorize(1), getAllRecipeFilterAdmin)
recipeRouter.get('/rank', authenticate, getRecipeRank)
recipeRouter.get("/title/:title", authenticate, getRecipeByTitle)
recipeRouter.put("/updateRank", authenticate, updateRank)
recipeRouter.put("/edit/:idRecipe", authenticate, authorize(1), editRecipe)
recipeRouter.post("/add",checkCreateRecipe(), authenticate, authorize(1), addRecipe)
module.exports = {
    recipeRouter
}
