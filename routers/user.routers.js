const express = require("express");
const { User } = require("../models")
const { authenticate } = require("../middlewares/auth/authenticate.js")

<<<<<<< HEAD
const {getRecommend, getAllhistory, getHistory,getRecipeHistory, getInfoUser, editUser, editMenuUser} = require("../controllers/user.controllers");

const userRouter = express.Router();
//lay ra 1 danh sach random cac mon cho user gom 3 bua sang trua toi day du
// userRouter.get("/getRecom", authenticate, getRecommend)
// //lay tat ca history cua user do tu qua khu den hien tai, khong lay tuong lai
userRouter.get("/history/", getAllhistory);
// //lay history weight, water, calo theo ngay cua user
userRouter.get("/history/:date", getHistory);
// //lay lich su an uong theo ngay cua user do
userRouter.get("/menu/:date", getRecipeHistory)
// //sua do an theo ngay cua user
// userRouter.put("/menu/edit/:date", authenticate, editMenuUser)
// //lay name, gender, height va weight, truy van theo mail duoc luu trong token
userRouter.get("/", getInfoUser)
// userRouter.put("/edit",authenticate, editUser)
=======
const { getRecommend, getAllhistory, getHistory, getInfoUser, editUser, editMenuUser }
    = require("../controllers/user.controllers");

const userRouter = express.Router();
//lay ra 1 danh sach random cac mon cho user gom 3 bua sang trua toi day du
userRouter.get("/getRecom", authenticate, getRecommend)
//lay tat ca history cua user do tu qua khu den hien tai, khong lay tuong lai
userRouter.get("/history/", authenticate, getAllhistory);
//lay history weight, water, calo theo ngay cua user
userRouter.get("/history/:date", authenticate, getHistory);
//lay lich su an uong theo ngay cua user do
userRouter.get("/menu/:date", authenticate, getRecipeHistory)
//sua do an theo ngay cua user
userRouter.put("/menu/edit/:date", authenticate, editMenuUser)
//lay name, gender, height va weight, truy van theo mail duoc luu trong token
userRouter.get("/", authenticate, getInfoUser)
userRouter.put("/edit", authenticate, editUser)
>>>>>>> adac8c83e33005f69935c3f84fcd2f994b00fddf
module.exports = {
    userRouter,
}