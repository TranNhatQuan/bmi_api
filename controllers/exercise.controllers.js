const { QueryTypes } = require("sequelize");
const { Exercise, User_exercise, User, Account } = require("../models");
const { raw } = require("body-parser");

// exerciseRouter.get("/", authenticate, getAllexercise);
// //lay tat thong tin cua 1 bai tap gom cac set, rep, equipment

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
//Cần sửa lại function này cho phù hợp yêu cầu
const getDetailexercise = async (req, res) => {
    const { id_exercise } = req.params;

    try {
        const details = await Exercise.sequelize.query(
            `select e.name, s.index, m.name as menu_name, m.image as menu_image, m.video as menu_video, eq.name as equipment_name
            from exercises as e, sets as s, menus as m, equipment as eq, menu_equipments as me
            where e.idExercise = ${id_exercise} and s.idSet = e.idExercise and s.idSet = m.idMenu and m.idMenu = me.idMenu and me.idMenu = eq.idEquipment`,
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
const getCmtEx = (req, res) => { }

const getTopEx = (req, res) => { }
module.exports = {
    getAllexercise, getDetailexercise, userLikeEx, completeExercise, getCmtEx, getTopEx
}