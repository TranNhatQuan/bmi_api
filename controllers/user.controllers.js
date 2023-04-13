const { Recipe,User_history} = require("../models");
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

module.exports = {
    // getDetailTaiKhoan,
    getAllhistory,getHistory,
};