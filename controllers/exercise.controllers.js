const { QueryTypes } = require("sequelize");

const moment = require('moment'); // require
const { Exercise, User_exercise, User,Equipment, Account, User_history, Exercise_rank, Menu, Menu_equipment } = require("../models");
const MySet = require('../models').Set;
const { raw } = require("body-parser");


// exerciseRouter.get("/", authenticate, getAllexercise);
// //lay tat thong tin cua 1 bai tap gom cac MySet, rep, equipment

const getAllexercise = async (req, res) => {
    const { level } = req.params;
    try {
        const acc = await Account.findOne({
            where: { mail: req.mail },
            include: User
        })
        // const exercise1 = await Exercise.findAll();
        const exercise1 = await Exercise.findAll({
            where: {
                level: level,
            }
        }
        );
        res.status(200).json(exercise1);
    } catch (error) {
        res.status(500).json({
            message: 'False'
        });
    }
}

const getDetailexercise = async (req, res) => {


    try {
        const { id_exercise } = req.params;
        const acc = await Account.findOne({
            where: { mail: req.mail },
            include: User
        })
        
        let details = await Exercise.findOne({
            where: {
                idExercise: id_exercise,
            },
            //raw : true,
            nest: true,
            include: [
                {
                model: MySet,
                required: false,
                include: [{
                    model: Menu,
                    required: false,
                    include: [{
                        model: Menu_equipment,
                        required: false,
                        
                    }]
                }]
            },
            
            {
                model: User_exercise,
                where: { idUser: acc.User.idUser },
                required: false,
                attributes: ['isLike']
            },
            {
                model: Exercise_rank,
                
                required: false,
                attributes: ['rank']
            },
            ],

            
        });
        //let equipmentSet = new Set([Equipment]);
        //console.log(equipmentSet)
        
        let set = new Set();
        let equipments=[]
        for(let item of details.Sets){
            
            for(let item1 of item.Menus){
                
                for(let item2 of item1.Menu_equipments){
                    
                    let equipment = await Equipment.findOne({
                        where:{idEquipment: item2.idEquipment}
                        
                    });

                    if (equipment) {
                        let index = equipments.findIndex(
                          e => e.idEquipment === equipment.idEquipment
                        );
                        if (index === -1) {
                          equipments.push(equipment);
                        }
                      }
                    
                    
                }
            }
            
            
          }
        details.dataValues.equipments = equipments
        if (details.dataValues.User_exercises[0]) {
            details.dataValues.isLike = details.dataValues.User_exercises[0].isLike
            delete details.dataValues.User_exercises
        }
        if (details.dataValues.Exercise_ranks) {
            details.dataValues.rank = details.dataValues.Exercise_ranks.rank
            delete details.dataValues.Exercise_ranks
          }
          else {
            details.dataValues.rank = 0;
            delete details.dataValues.Exercise_ranks
          }
        res.status(200).json({details});
    } catch (error) {
        res.status(500).json({
            error
        });
    }
};
//Cần viết lại function này
const userLikeEx = async (req, res) => {
    const { isLike, id_exercise } = req.body;
    try {
        const acc = await Account.findOne({
            where: { mail: req.mail },
            include: User
        })
        console.log(acc.User.idUser, Object.values(isLike), Object.values(id_exercise));

        if (Object.values(isLike) == 1) (
            User_history.update({ isLike: 1 }, {
                where: {
                    idExercise: Object.values(id_exercise),
                    idUser: acc.User.idUser
                }
            })
        )
        else (
            User_history.update({ isLike: 0 }, {
                where: {
                    idExercise: Object.values(id_exercise),
                    idUser: acc.User.idUser
                }
            })
        )
        await User_exercise.query(
            `update user_exercises set isLike='${Object.values(isLike)}' where idExercise='${Object.values(id_exercise)}' and idUser='${acc.User.id_user}'; `,
            {
                type: QueryTypes.UPDATE,
                raw: true,
            });
        res.status(200).json({
            message: 'Sucess'
        });
    } catch (error) {
        res.status(500).json({
            message: 'False'
        });
    }
};
//Cần sửa lại function này cho phù hợp yêu cầu
const completeExercise = async (req, res) => {

    try {

        const { id_exercise } = req.params;
        console.log(id_exercise)
        let now = moment().tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD");
        console.log('test')
        console.log(now)
        const acc = await Account.findOne({
            where: { mail: req.mail },
            include: User
        })
        console.log(acc.User.idUser)
        let user_his = await User_history.findOne({
            where: {
                idUser: acc.User.idUser,
                date: now,
            }
        })
        let calo_out = await Exercise.findOne({
            where: { idExercise: id_exercise }
        })
        console.log(now)
        if (user_his === null) {
            return res.status(404).json({
                success: false
            })
        } else {
            
            user_his.calories_out =await user_his.dataValues.calories_out + calo_out.dataValues.calories
            await user_his.save()
        }





        res.status(200).json({ success: true, user_his });
    } catch (error) {
        res.status(500).json({
            success: false
        })
    }
};
const putCmtEx = async (req, res) => {

    try {
        const { id_exercise } = req.params;
        let { cmt } = req.body;
        console.log(cmt)
        const acc = await Account.findOne({
            where: { mail: req.mail },
            include: User
        });
        console.log(acc)
        let user_ex = await User_exercise.findOne({
            where: {
                idExercise: id_exercise,
                idUser: acc.User.idUser,
            }
        })
        console.log(user_ex)
        if (user_ex === null) {
            console.log('testNull')
            user_ex = await User_exercise.create({
                idUser: acc.User.idUser,
                idExercise: id_exercise,
                cmt: cmt,
                date: moment().add(7, 'hours').format("YYYY-MM-DD HH:mm:ss"),
                isLike: 0,
            });

            return res.status(200).json({ iSsuccess: true })
        } else {
            user_ex.cmt = cmt;
            await user_ex.save()

            return res.status(200).json({ user_ex, iSsuccess: true })
        }
    } catch (error) {
        res.status(500).json({ isSuccess: false });
    }
}
const getTopEx = async (req, res) => { }
module.exports = {
    getAllexercise, getDetailexercise, userLikeEx, completeExercise, putCmtEx, getTopEx
}