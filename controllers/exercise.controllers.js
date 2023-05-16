const { QueryTypes } = require("sequelize");
const { Exercise, User_exercise, User, Account, User_history } = require("../models");
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
    const { id_exercise } = req.params;
    try {
        let success = 0;
        const acc = await Account.findOne({
            where: { mail: req.mail },
            include: User
        })
        let user_his = await User_history.findOne({
            where: {
                idUser: acc.User.idUser,
                idExercise: id_exercise,
            }
        })
        let calo_out = await Exercise.findOne({
            where: { idExercise: id_exercise }
        })
        if (user_his === null) {
            user_his = await User_history.create({
                idUser: acc.User.idUser,
                date: moment().tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD"),
                weight: 0,
                height: 0,
                calories_in: 0,
                calories_out: calo_out.Exercise.idExercise,
                water: 0,

            })
            success = 1;
        }
        else {
            user_his = await User_history.update({
                calories_out: calo_out.Exercise.idExercise,
            })
            success = 1;

        }
        res.status(200).json(success);
    } catch (error) {
        res.status(500).json({
            message: 'False'
        })
    }
};
const putCmtEx = async (req, res) => {
    const { id_exercise } = req.params;
    let { cmt } = req.body;
    try {
        const acc = Account.findOne({
            where: { mail: req.mail },
            include: User
        });
        const user_ex = User_exercise.findOne({
            where: {
                idExercise: id_exercise,
                idUser: acc.User.idUser,
            }
        })
        if (user_ex === null) {
            user_ex = await User_exercise.create({
                idUser: acc.User.idUser,
                idExercise: id_exercise,
                cmt: cmt,
                date: moment().tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD"),
                isLike: 0,
            });
            res.status(user_ex);
            let success = 1;
            res.status(200).json({ success })
        } else {
            user_ex = await User_exercise.update({
                cmt: cmt,
                isLike: 1,
            })
            let success = 1;
            res.status(200).json({ success })
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed' });
    }
}
const getTopEx = async (req, res) => { }
module.exports = {
    getAllexercise, getDetailexercise, userLikeEx, completeExercise, putCmtEx, getTopEx
}