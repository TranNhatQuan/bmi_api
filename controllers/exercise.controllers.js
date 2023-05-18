const { QueryTypes } = require("sequelize");

const moment = require('moment'); // require

const { Exercise, User_exercise, User, Equipment, Account, User_history, Exercise_rank, Menu, Menu_equipment, sequelize } = require("../models");
const MySet = require('../models').Set;
const { raw } = require("body-parser");

// exerciseRouter.get("/", authenticate, getAllexercise);
// //lay tat thong tin cua 1 bai tap gom cac MySet, rep, equipment

// exerciseRouter.get("/", authenticate, getAllexercise);
// //lay tat thong tin cua 1 bai tap gom cac set, rep, equipment
//Đã làm xong
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
        let equipments = []
        for (let item of details.Sets) {

            for (let item1 of item.Menus) {

                for (let item2 of item1.Menu_equipments) {

                    let equipment = await Equipment.findOne({
                        where: { idEquipment: item2.idEquipment }

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
        res.status(200).json({ details });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
};
//Cần viết lại function này
// const userLikeEx = async (req, res) => {
//     const { isLike, id_exercise } = req.body;
//     try {
//         const acc = await Account.findOne({
//             where: { mail: req.mail },
//             include: User
//         })

//         let details = await Exercise.findOne({
//             where: {
//                 idExercise: id_exercise,
//             },
//             //raw : true,
//             nest: true,
//             include: [
//                 {
//                 model: MySet,
//                 required: false,
//                 include: [{
//                     model: Menu,
//                     required: false,
//                     include: [{
//                         model: Menu_equipment,
//                         required: false,

//                     }]
//                 }]
//             },

//             {
//                 model: User_exercise,
//                 where: { idUser: acc.User.idUser },
//                 required: false,
//                 attributes: ['isLike']
//             },
//             {
//                 model: Exercise_rank,

//                 required: false,
//                 attributes: ['rank']
//             },
//             ],


//         });
//         //let equipmentSet = new Set([Equipment]);
//         //console.log(equipmentSet)

//         let set = new Set();
//         let equipments=[]
//         for(let item of details.Sets){

//             for(let item1 of item.Menus){

//                 for(let item2 of item1.Menu_equipments){

//                     let equipment = await Equipment.findOne({
//                         where:{idEquipment: item2.idEquipment}

//                     });

//                     if (equipment) {
//                         let index = equipments.findIndex(
//                           e => e.idEquipment === equipment.idEquipment
//                         );
//                         if (index === -1) {
//                           equipments.push(equipment);
//                         }
//                       }


//                 }
//             }


//           }
//         details.dataValues.equipments = equipments
//         if (details.dataValues.User_exercises[0]) {
//             details.dataValues.isLike = details.dataValues.User_exercises[0].isLike
//             delete details.dataValues.User_exercises
//         }
//         if (details.dataValues.Exercise_ranks) {
//             details.dataValues.rank = details.dataValues.Exercise_ranks.rank
//             delete details.dataValues.Exercise_ranks
//           }
//           else {
//             details.dataValues.rank = 0;
//             delete details.dataValues.Exercise_ranks
//           }
//         res.status(200).json({details});
//     } catch (error) {
//         res.status(500).json({
//             error
//         });
//     }
// };
//Đã làm xong
const userLikeEx = async (req, res) => {
    try {
        const isLike = Number(req.query.isLike)
        const id_exercise = Number(req.query.id_exercise)
        now = moment().tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD")
        const acc = await Account.findOne({
            where: { mail: req.mail },
            include: User
        })
        let user_like = await User_exercise.findOne({
            where: {
                idExercise: id_exercise,
                idUser: acc.User.idUser,
            },
        })
        if (isLike == 1) {
            // let user_like = await User_exercise.findOne({
            //     where: {
            //         idExercise: id_exercise,
            //         idUser: acc.User.idUser,
            //     },
            //     include: Exercise,
            // })
            if (user_like === null) {
                user_like = await User_exercise.create({
                    idUser: acc.User.idUser,
                    idExercise: id_exercise,
                    cmt: null,
                    date: now,
                    isLike: 1,
                })

                res.status(200).json({ success: true, user_his });
            }
            else {
                console.log(ex.points)
                console.log('th1')
                user_like.isLike = 1
                ex.points = ex.points + 1
                user_like.save()
                ex.save()
                res.status(200).json({ success: true })
            }
        }
        else {
            console.log(ex.points)
            console.log('th2')
            user_like.isLike = 0;
            ex.points = ex.points - 1
            user_like.save();
            ex.save();
            res.status(200).json({ success: true });
        }
    } catch (error) {
        res.status(500).json({
            success: false
        })
    }

}
//Đã làm xong
const completeExercise = async (req, res) => {

    try {

        const { id_exercise } = req.params;
        console.log(id_exercise)
        let now = moment().tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD");
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
        if (user_his === null) {
            user_his = await User_history.create({
                idUser: acc.User.idUser,
                date: now,
                weight: 0,
                height: 0,
                calories_in: 0,
                calories_out: calo_out.dataValues.calories,
                water: 0,

            })
            res.status(404).json({
                success: true
            })
        } else {
            user_his.calories_out = user_his.calories_out + calo_out.dataValues.calories
            user_his.save()
        }
        console.log(now)
        if (user_his === null) {
            return res.status(404).json({
                success: false
            })
        } else {
            console.log(now)
            if (user_his === null) {
                return res.status(404).json({
                    success: false
                })
            } else {

                user_his.calories_out = await user_his.dataValues.calories_out + calo_out.dataValues.calories
                await user_his.save()
            }
            res.status(200).json({ success: true, user_his });
        }
    } catch (error) {
        res.status(500).json({
            success: false
        })
    }
};
//Đã làm xong
const putCmtEx = async (req, res) => {

    try {
        const { id_exercise } = req.params;
        let { cmt } = req.body;
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
const getTopEx = async (req, res) => {
    try {
        const exerciseRank = await sequelize.query('select idExercise, name, calories, image, level from bmi.exercises order by points desc limit 10',
            {
                model: Exercise,
                type: QueryTypes.SELECT
            }
        )
        res
            .status(200)
            .json({
                exerciseRank,
                Success: true
            });
    } catch (error) {
        res.status(500).json({ isSuccess: false });
    }
}
const getExCmt = async (req, res) => { }
module.exports = {
    getAllexercise, getDetailexercise, userLikeEx, completeExercise, putCmtEx, getTopEx
}