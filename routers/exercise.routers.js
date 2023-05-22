/* This code is importing necessary modules and functions, defining routes for handling HTTP requests
related to exercises, and exporting the exerciseRouter for use in other parts of the application. It
includes middleware functions for authentication and authorization, validation checks for creating
and updating exercises, and controller functions for handling various exercise-related actions such
as getting all exercises, getting details of a specific exercise, creating, updating, and deleting
exercises, and allowing users to like and complete exercises. */
const express = require("express");
const { exercise } = require("../models")
const { authenticate } = require("../middlewares/auth/authenticate.js")
const { authorize } = require("../middlewares/auth/authorize.js")
const { getAllexercise, getDetailexercise, createexercise, updateexercise, deleteexercise, userLikeEx, completeExercise, selectExercise, putCmtEx, getTopEx, getExCmt }
    = require("../controllers/exercise.controllers");
const { checkCreateexercise, checkexerciseValue } = require("../middlewares/validates/checkCreate.js");
const exerciseRouter = express.Router();

exerciseRouter.get("/page/:level", authenticate, getAllexercise);
// exerciseRouter.get("/", authenticate, getAllexercise);
// // lay tat thong tin cua 1 bai tap gom cac set, rep, equipment theo 
exerciseRouter.get("/detail/:id_exercise", authenticate, getDetailexercise);
//Them bai tap do nguoi dung chon
// exerciseRouter.post("/select/:id_exercise", authenticate, selectExercise);
// //Nguoi dung an like 1 exercise thi luu ve bang user_exercise voi isLike 1
exerciseRouter.put("/like/", authenticate, userLikeEx);
//Nguoi dung hoan thanh 1 bai tap thi tru calories cua nguoi dung trong history cua ngay do
exerciseRouter.put("/check/:id_exercise", authenticate, completeExercise);
//Thêm cmt của người dùng vào bài tập
exerciseRouter.put("/cmt/:id_exercise", authenticate, putCmtEx);
//Lấy ra top 10 bài tập có points cao nhất 
exerciseRouter.get("/rank/", authenticate, getTopEx);
//Lấy ra cmt cảu người dùng về bài tập
exerciseRouter.get("/cmt", authenticate, getExCmt);
// //tam choi chua lam cac phan co auth 1
// exerciseRouter.post("/create", authenticate, authorize(["1"]), checkCreateexercise(exercise), checkexerciseValue(exercise), createexercise);
// exerciseRouter.put("/update/:id_exercise", authenticate, authorize(["1"]), checkexerciseValue(exercise), updateexercise);
// exerciseRouter.delete("/delete/:id_exercise", authenticate, authorize(["1"]), deleteexercise);

module.exports = {
    exerciseRouter,
}