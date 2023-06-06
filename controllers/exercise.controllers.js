const { QueryTypes } = require("sequelize");
const moment = require('moment'); // require
const { Exercise, User_exercise, User, Equipment, Account, User_history, Exercise_rank, Menu, Menu_equipment } = require("../models");
const MySet = require('../models').Set;
const { json } = require("body-parser");

// exerciseRouter.get("/", authenticate, getAllexercise);
// //lay tat thong tin cua 1 bai tap gom cac MySet, rep, equipment

// exerciseRouter.get("/", authenticate, getAllexercise);
// //lay tat thong tin cua 1 bai tap gom cac set, rep, equipment
//Đã làm xong
// //lay tat thong tin cua 1 bai tap gom cac MySet, rep, equipment
function transformIdUsertoName(listCMT) {
    return listCMT.map(exercsie => {
        const name = exercsie.User.name;
        return {
            ...exercsie,
            name,
            User: undefined
        };
    });
}
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
                    required: true,
                    attributes: ['index'],
                    include: [{
                        model: Menu,
                        required: true,
                        attributes: ['index', 'name', 'image', 'video', 'time'],
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
        if (details === null) {
            return res.status(403).json({
                isExist: false,
                isSuccess: false,
            });
        }
        let set = new Set();
        let equipments = []
        for (let item of details.Sets) {

            for (let item1 of item.Menus) {

                for (let item2 of item1.Menu_equipments) {

                    let equipment = await Equipment.findOne({
                        where: { idEquipment: item2.idEquipment },
                        attributes: ['name', 'image']
                    });

                    if (equipment) {
                        let index = equipments.findIndex(
                            e => e.name === equipment.name
                        );
                        if (index === -1) {
                            equipments.push(equipment);
                        }
                    }


                }
                delete item1.dataValues.Menu_equipments
            }


        }
        if (equipments !== []) {
            details.dataValues.Equipments = equipments
        }


        if (details.dataValues.User_exercises[0]) {
            details.dataValues.isLike = details.dataValues.User_exercises[0].isLike
            delete details.dataValues.User_exercises
        }
        if (details.dataValues.Exercise_rank) {
            details.dataValues.rank = details.dataValues.Exercise_rank.rank
            delete details.dataValues.Exercise_rank
        }
        else {
            details.dataValues.rank = 0;
            delete details.dataValues.Exercise_rank
        }
        res.status(200).json({ details });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
};

const userLikeEx = async (req, res) => {
    try {
        const isLike = Number(req.query.isLike)
        const id_exercise = Number(req.query.id_exercise)
        now = moment().format("YYYY-MM-DD HH:mm:ss")
        const acc = await Account.findOne({
            where: { mail: req.mail },
            include: User
        })
        let ex = await Exercise.findOne({
            where: { idExercise: id_exercise }
        })
        let user_like = await User_exercise.findOne({
            where: {
                idExercise: id_exercise,
                idUser: acc.User.idUser,
            },
        })
        console.log(isLike)
        if (isLike === 1) {
            //console.log(user_like)
            console.log('test')
            if (user_like === null) {
                console.log('test1')
                user_like = await User_exercise.create({
                    idUser: acc.User.idUser,
                    idExercise: id_exercise,
                    cmt: null,
                    date: now,
                    isLike: 1,
                })
                ex.points = ex.points + 1
                await ex.save();
                return res.status(200).json({ success: true, user_like });
            }

            else {
                if (user_like.isLike == 1) {
                    return res.status(200).json({ success: true, user_like })
                }
                else {
                    user_like.isLike = 1
                    ex.points = ex.points + 1
                    await user_like.save()
                    await ex.save()
                    return res.status(200).json({ success: true, user_like })
                }

            }

        }
        else {
            if (user_like.isLike == 1) {
                user_like.isLike = 0;
                ex.points = ex.points - 1
                await user_like.save();
                await ex.save();
                return res.status(200).json({ success: true, user_like });
            }
            else {
                return res.status(200).json({ success: true, user_like });
            }
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
        let now = moment().format("YYYY-MM-DD HH:mm:ss");
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

            user_his.calories_out = await user_his.dataValues.calories_out + calo_out.dataValues.calories
            await user_his.save()
        }
        res.status(200).json({ success: true, user_his });

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
        //console.log(acc)
        let user_ex = await User_exercise.findOne({
            where: {
                idExercise: id_exercise,
                idUser: acc.User.idUser,
            }
        })
        //console.log(user_ex)
        if (user_ex === null) {
            console.log('testNull')
            user_ex = await User_exercise.create({
                idUser: acc.User.idUser,
                idExercise: id_exercise,
                cmt: cmt,
                date: moment().format("YYYY-MM-DD HH:mm:ss"),
                isLike: 0,
            });

            return res.status(200).json({ iSsuccess: true })
        } else {
            user_ex.cmt = cmt;
            user_ex.date = moment().format("YYYY-MM-DD HH:mm:ss")
            await user_ex.save()
            return res.status(200).json({ user_ex, iSsuccess: true })
        }
    } catch (error) {
        res.status(500).json({ isSuccess: false });
    }
}
const getTopEx = async (req, res) => {
    try {
        const exerciseRank = await Exercise.findAll({
            order: [['points', 'DESC']],
            limit: 10
        })
        console.log(exerciseRank)
        res
            .status(200)
            .json({
                exerciseRank,
                isSuccess: true
            });
    } catch (error) {
        res.status(500).json({ isSuccess: false });
    }
}
const getExCmt = async (req, res) => {
    const id_exercise = Number(req.query.id_exercise)
    const limit = Number(req.query.limit);
    const page = Number(req.query.page);
    const limit_page = [limit * (page - 1), limit * page]


    try {

        const cmt = await User_exercise.findAndCountAll({
            where: {
                idExercise: id_exercise,
            },
            attributes: ['idUser', 'cmt', 'date'],
            offset: limit_page[0],
            limit: limit_page[1] - limit_page[0],
            nest: true,
            order: [['date', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ]
        });
        let listCMT = cmt.rows
        maxPage = Math.ceil(cmt.count / limit)
        listCMT = JSON.stringify(listCMT)
        let listCmt = transformIdUsertoName(JSON.parse(listCMT))
        res
            .status(200)
            .json({
                listCmt, maxPage, isSuccess: true
            });
    } catch (error) {
        res.status(500).json({ isSuccess: false });
    }
}
module.exports = {
    getAllexercise, getDetailexercise, userLikeEx, completeExercise, putCmtEx, getTopEx, getExCmt
}