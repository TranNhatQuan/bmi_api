const express = require("express");
const { User } = require("../models")
const { authenticate } = require("../middlewares/auth/authenticate.js")
const { getRecommend, getAllhistory, getHistory, getInfoUser, editUser, editMenuUser,getRecipeHistory,getUser,listUser, editUserHistory,getInfo,}
    = require("../controllers/user.controllers");

const userRouter = express.Router();
//lay ra 1 danh sach random cac mon cho user gom 3 bua sang trua toi day du

// userRouter.get("/getRecom", authenticate, getRecommend)
// //lay tat ca history cua user do tu qua khu den hien tai, khong lay tuong lai
userRouter.get("/history/",authenticate, getAllhistory);
// //lay history weight, water, calo theo ngay cua user
userRouter.get("/history/:date",authenticate, getHistory);
// //lay lich su an uong theo ngay cua user do
userRouter.get("/menu/:date",authenticate, getRecipeHistory)
// //sua do an theo ngay cua user
userRouter.put("/menu/edit/:date",authenticate, editMenuUser)
// //lay name, gender, height va weight, truy van theo mail duoc luu trong token
userRouter.get("/detail",authenticate, getInfoUser)
//sua thong tin user: name, gender,height,weight
userRouter.put("/edit/detail",authenticate, editUser)
//Lấy ra thông tin của user theo idUser
//Trả về name, giới tính, ngày tham gia(ngày đầu tiên trong user_history), height, weight, bmi, list user_recipe, user_exercise có isLike = 1 của người đó
userRouter.get("/detail/:id",authenticate, getUser)
// Lấy ra list user 
//Nhận các biến limit, page, min, max qua query
//limit là số user trong 1 page, 
//page là page hiện tại, min, max là khoảng bmi filter(min, max = 0 là không có filter)
//BE trả về list user gồm các thông tin id, name, bmi, gender 
//+ biến maxPage cho biết nếu chia theo limit như vậy có tổng bao nhiêu page
userRouter.get("/hwnet/list",authenticate, listUser)
 //Sua du lieu user_his theo ngay
userRouter.put("/edit/history/:date",authenticate, editUserHistory)

userRouter.get("/info/:date",authenticate, getInfo)
module.exports = {
    userRouter,
}