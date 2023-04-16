const { Recipe,User_history,Recipe_history} = require("../models");
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
const user_id=1;
const getHistory = async (req,res) =>{
    const date = req.params;
    const d = date['date']
    // console.log(d);
    // console.log(typeof(d));
    // const da= new DATEONLY(date);
    // console.log(da);
    try {
        const u_history = await User_history.findAll({
            where: {
                date:d, idUser:user_id,
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
        const user_h = await User_history.sequelize.query(
            "select * from user_histories where user_histories.date < CURRENT_DATE()",
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
    try {
        const recipe_his = await Recipe_history.sequelize.query(
            `call recipe_history('${d}',${user_id})`,
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
const mail ="tri1@gmail.com"
const getInfoUser = async (req, res) =>{

};
module.exports = {
    // getDetailTaiKhoan,
    getAllhistory,getHistory,getRecipeHistory,getInfoUser,
};