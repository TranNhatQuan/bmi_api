const { Recipe,User_history,Recipe_history,Account,User,Sequelize} = require("../models");
const moment = require('moment'); // require

const { QueryTypes, DATEONLY, DATE } = require("sequelize");

// const  getRecommend = async (req,res) =>{
    // function convertToJSONDate(strDate){
    //     var splitted = strDate.split(".");
    //     var dt = new Date(splitted[2],splitted[0],splitted[1]);
    //     var newDate = new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds()));
    //     return '/Date(' + newDate.getTime() + ')/';
    //   }
// };
const getHistory = async (req,res) =>{
    const date = req.params;
    const d = date['date']
    const acc = await Account.findOne({
        where: { mail: req.mail },
        include: User
    });
    try {
        const u_history = await User_history.findAll({
            where: {
                date:d, idUser:acc.User.idUser,
            },
        });
        res.status(200).json(u_history);

    } catch (error) {
        res.status(500).json({
            message: 'Error'
        });
    }
};

const getAllhistory = async (req,res) =>{
    try {
        // const exercise1 = await Exercise.findAll();
        const acc = await Account.findOne({
            where: { mail: req.mail },
            include: User
        });
        console.log(acc.User.idUser);
        const user_h = await User_history.sequelize.query(
            `select * from user_histories where user_histories.date <= CURRENT_DATE() 
            and user_histories.idUser=${acc.User.idUser}`,
            {
                type: QueryTypes.SELECT,
                raw: true,
            }
        );
        res.status(200).json(user_h);
    } catch (error) {
        res.status(500).json({
            message: 'Error'
        });
    }
};

const getRecipeHistory = async (req,res) =>{
    const date = req.params;
    const d = date['date'];
    const acc = await Account.findOne({
        where: { mail: req.mail },
        include: User
    });
    try {
        const recipe_his = await Recipe_history.sequelize.query(
            `select recipe_histories.idUser , recipe_histories.date , recipes.*
            from recipe_histories 
            inner join recipes on recipe_histories.idRecipe = recipes.idRecipe
            where recipe_histories.idUser = ${acc.User.idUser} and recipe_histories.date = '${d}'`,
            {
                type: QueryTypes.SELECT,
                raw: true,
            }
        );
        res.status(200).json(recipe_his);

    } catch (error) {
        res.status(500).json({
            message: 'Error'
        });
    }
};
const getInfoUser = async (req, res) =>{
    try {
        // const exercise1 = await Exercise.findAll();
        const acc = await Account.findOne({
            where: { mail: req.mail },
            include: User
        });
        console.log(acc.User.idUser);
        const user_h = await User_history.sequelize.query(
            `select users.idUser,name,gender,height,weight  from user_histories inner join users on user_histories.idUser = users.idUser
            where user_histories.idUser = ${acc.User.idUser} and  user_histories.date = CURRENT_DATE()`,
            {
                type: QueryTypes.SELECT,
                raw: true,
            }
        );
        res.status(200).json(user_h);
    } catch (error) {
        res.status(500).json({
            message: 'Error'
        });
    }

};

const editMenuUser = async (req,res) =>{
    const date = req.params;
    const d = date['date'];
    const { id_rec, title } = req.body;
    
    try {
        const acc = await Account.findOne({
            where: { mail: req.mail },
            include: User
        });
        await Recipe_history.update({idRecipe : Object.values(id_rec),
            filter :Object.values(title)},{
            where: {
                date:d, 
                idUser:acc.User.idUser,
            }
        });
        res.status(200).json({
            message: 'Success'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error'
        });
    }
};

const editUser = async (req,res) =>{
    const { name, gender,height,weight } = req.body;
    try {
        const acc = await Account.findOne({
            where: { mail: req.mail },
            include: User
        });
        console.log(name,gender,height,weight);

        await User.update({name :name,
            gender :gender},{
            where: { 
                idUser:acc.User.idUser,
            }
        });
        await User_history.update({height :height,
            weight :weight},{
            where: { 
                idUser:acc.User.idUser,
            }
        });
        res.status(200).json({
            message: 'Success'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error'
        });
    }
};
module.exports = {
    // getDetailTaiKhoan,
    getAllhistory,getHistory,getRecipeHistory,getInfoUser,editMenuUser,editUser,
};