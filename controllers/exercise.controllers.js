// const { raw } = require("body-parser");

// const moment = require('moment'); // require
const { QueryTypes } = require("sequelize");
const { Exercise, User_exercise, User, Account } = require("../models");
const { raw } = require("body-parser");

// exerciseRouter.get("/", authenticate, getAllexercise);
// //lay tat thong tin cua 1 bai tap gom cac set, rep, equipment

const getAllexercise = async (req, res) => {
    try {
        // const exercise1 = await Exercise.findAll();
        const exercise1 = await Exercise.sequelize.query(
            "select * from exercises",
            {
                type: QueryTypes.SELECT,
                raw: true,
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
    const { id_exercise } = req.params;
    console.log(id_exercise);
    console.log(Object.values(id_exercise));
    try {
        const details = await Exercise.sequelize.query(
            `select e.name, s.index, m.name as menu_name, m.image as menu_image, m.video as menu_video, eq.name as equipment_name
            from exercises as e, sets as s, menus as m, equipment as eq, menu_equipments as me
            where e.idExercise = ${id_exercise} and s.idSet = idExercise and s.idSet = m.idMenu and m.idMenu = me.idMenu and me.idMenu = eq.idEquipment;`,
            {
                // replacements:{}
                type: QueryTypes.SELECT,
                raw: true,
                // nest: true,
            }
        );
        res.status(200).json(details);
    } catch (error) {
        res.status(500).json({
            message: 'False'
        });
    }
};
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


    } catch (error) {
        res.status(500).json({
            message: 'False'
        });
    }
};

const completeExercise = async (req, res) => {
    const { id_exercise } = req.body;
    try {
        const acc = await Account.findOne({
            where: { mail: req.mail },
            include: User
        })

        const calo = await Exercise.findOne({ attributes: ['calories'] }, {
            where: {
                idExercise: Object.values(id_exercise),
            }
        }
        )
        await User_history.update({ calories_out: calories_out + calo.dataValues() }, {
            where: {
                idUser: acc.User.idUser,
            }
        }

        )
        res.status(200).json({
            message: 'True'
        });
        // res.status(200).json({
        //     message: 'Sucess'
        // });
    } catch (error) {
        res.status(500).json({
            message: 'False'
        })
    }
};
module.exports = {
    getAllexercise, getDetailexercise, userLikeEx, selectExercise, completeExercise,
}