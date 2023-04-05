const express = require("express");
const { userRouter } = require("./user.routers");
const { accountRouter } = require("./account.routers");
const { recipeRourer } = require("./recipe.routers");
const { exerciseRouter } = require("./exercise.routers");
const { ingredientRouter } = require("./ingredient.routers");
const { equipmentRouter } = require("./equipment.routers");


const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/account", accountRouter);
rootRouter.use("/recipe", recipeRourer);
rootRouter.use("/exercise", exerciseRouter);
rootRouter.use("/ingredient", ingredientRouter);
rootRouter.use("/equipment", equipmentRouter);


module.exports = {
    rootRouter,
}
