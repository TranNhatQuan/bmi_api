const express = require("express");
const {exercise} = require("../models")
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js")
const {getAllexercise, getDetailexercise, createexercise, updateexercise, deleteexercise, getexercises} = require("../controllers/exercise.controllers");
const { checkCreateexercise, checkexerciseValue } = require("../middlewares/validates/checkCreate.js");
const exerciseRouter = express.Router();

exerciseRouter.get("/page/:page", authenticate, getAllexercise);
exerciseRouter.get("/", authenticate, getAllexercise);
//lay tat thong tin cua 1 bai tap gom cac set, rep, equipment
exerciseRouter.get("/detail/:id_exercise", authenticate, getDetailexercise);
//tam choi chua lam cac phan co auth 1
exerciseRouter.post("/create", authenticate, authorize(["1"]), checkCreateexercise(exercise), checkexerciseValue(exercise), createexercise);
exerciseRouter.put("/update/:id_exercise", authenticate, authorize(["1"]), checkexerciseValue(exercise), updateexercise);
exerciseRouter.delete("/delete/:id_exercise", authenticate, authorize(["1"]), deleteexercise);

module.exports = {
    exerciseRouter,
}