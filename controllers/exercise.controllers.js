// const { raw } = require("body-parser");

// const moment = require('moment'); // require
const { QueryTypes } = require("sequelize");
const { Exercise, User_exercise } = require("../models");
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
            message: 'Error'
        });
    }
}
const getDetailexercise = async (req, res) => {
    const { id_exercise } = req.params;
    console.log(id_exercise);
    console.log(Object.values(id_exercise));
    try {
        const details = await Exercise.sequelize.query(
            `call getDetailexercise(${id_exercise})`,
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
            message: 'Error'
        });
    }
};
const selectExercise = async (req, res) => {
    const { idExercise } = req.body;
    try {
        const acc = await Account.findOne({
            where: { mail: req.mail },
            include: User
        })
        console.log(acc.User.idUser);
        await User_exercise.sequelize.query(
            `call selectExercise(${acc.User.idUser},${idExercise})`,
            {
                type: QueryTypes.INSERT,
                raw: true,
            }

        );
        res.status(200).json({
            message: 'success',
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error'
        });
    };
};
const userLikeEx = async (req, res) => {
    const { isLike, id_exercise } = req.body;
    console.log(typeof (req.body));
    console.log(req.body);
    try {
        if (Object.values(isLike) == 1) {
            await User_exercise.query(
                `update user_exercise set isLike = ${Object.values(isLike)} where idExercise = ${Object.values(id_exercise)}`,
                {
                    type: QueryTypes.UPDATE,
                    raw: true,
                }
            )
            res.status(200).json({
                message: 'Sucess'
            });
        }
        else {
            await User_exercise.query(
                `update user_exercise set isLike = ${Object.values(isLike)} where idExercise = ${Object.values(id_exercise)}`,
                {
                    type: QueryTypes.UPDATE,
                    raw: true,
                }
            )
            res.status(200).json({
                message: 'Sucess'
            });
        }

        // res.status(200).json({
        //     message: 'Sucess'
        // });
    } catch (error) {
        res.status(500).json({
            message: 'Error'
        });
    }
};

const completeExercise = async (req, res) => {
    const { id_user, id_exercise } = req.body;
    try {
        await User_history.sequelize.query(
            `call completeExercise(${Object.values(id_user)},${Object.value(id_exercise)})`,
            {
                type: QueryTypes.UPDATE,
                raw: true,
            }
        )
        res.status(200).json({
            message: 'Sucess'
        });
        // res.status(200).json({
        //     message: 'Sucess'
        // });
    } catch (error) {
        res.status(500).json({
            message: 'Error'
        })
    }
};
module.exports = {
    getAllexercise, getDetailexercise, userLikeEx, selectExercise, completeExercise,
}