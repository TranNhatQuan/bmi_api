// const { raw } = require("body-parser");

// const moment = require('moment'); // require
const { QueryTypes } = require("sequelize");
const { Exercise } = require("../models");
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
    const id_exercise = req.params;
    try {
        const details = await Exercise.sequelize.query(
            'call getDetailexercise(1)',
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


module.exports = {
    getAllexercise, getDetailexercise,
}