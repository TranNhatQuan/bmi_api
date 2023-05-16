const { Recipe, User_history, Recipe_history, Account, User, Sequelize, Userswithbmi, User_recipe, User_exercise } = require("../models");
const moment = require('moment'); // require
const { Op } = require("sequelize");
const { QueryTypes, DATEONLY, DATE } = require("sequelize");
 async function  calcCaloriesIn(date, idUser) {
    
    let menu = await Recipe_history.findAll({
        where:{date: date, idUser: idUser},
        attributes:['idRecipe'],
        include: [
            {
                model: Recipe,
                required: false,
                attributes: ['calories'],
            },
        ],
    })
    
    let calo = 0;
    for(item of menu){
        calo+=Number(item.Recipe.dataValues.calories)
    }
    return calo
  }

const getHistory = async (req, res) => {

    try {
        let now = moment().tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD");
        const date = req.params;
        const d = date['date']
        const acc = await Account.findOne({
            where: { mail: req.mail },
            include: User
        });
        let u_history = await User_history.findOne({
            where: {
                date: d, idUser: acc.User.idUser,
            },
        });

        
        if (!u_history) {
            let u_history_temp = await User_history.findOne({
                where: {
                    idUser: acc.User.idUser,
                },
            });

            u_history = await User_history.create({
                idUser: acc.User.idUser,
                date: d,
                weight: u_history_temp.dataValues.weight,
                height: u_history_temp.dataValues.height,
                water: 0,
                calories_in: await calcCaloriesIn(d, acc.User.idUser),
                calories_out: 0,
            });
            console.log(u_history);
        }
        else{
            if(d>=now){
                u_history.calories_in=await calcCaloriesIn(d, acc.User.idUser);
                await u_history.save();
            }
        }
        res.status(200).json(u_history);

    } catch (error) {
        res.status(500).json({
            isSuccess:false
        });
    }
};

const getAllhistory = async (req, res) => {
    try {
        // const exercise1 = await Exercise.findAll();
        const acc = await Account.findOne({
            where: { mail: req.mail },
            include: User
        });
        console.log(acc.User.idUser);
        const user_h = await User_history.sequelize.query(
            `select * from user_histories where user_histories.date <= CURRENT_DATE() 
            and user_histories.idUser=${acc.User.idUser}`,
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

const getRecipeHistory = async (req, res) => {
    const date = req.params;
    const d = date['date'];
    let now = moment().tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD");
    const acc = await Account.findOne({
        where: { mail: req.mail },
        include: User
    });
    console.log(now);
    try {
        let recipe_his = await Recipe_history.findOne({
            where: {
                date: d, idUser: acc.User.idUser,
            },
        });
        if (!recipe_his && d >= now) {
            let randomID = Math.floor(Math.random() * (22));
            recipe_his = await Recipe_history.create({
                idUser: acc.User.idUser,
                date: d,
                idRecipe: randomID,
                filter: 1,
            });
            randomID = Math.floor(Math.random() * (22));
            recipe_his = await Recipe_history.create({
                idUser: acc.User.idUser,
                date: d,
                idRecipe: randomID,
                filter: 2,
            });
            randomID = Math.floor(Math.random() * (22));
            recipe_his = await Recipe_history.create({
                idUser: acc.User.idUser,
                date: d,
                idRecipe: randomID,
                filter: 3,
            });
            let breakfast = await Recipe_history.findAll({
                attributes: ['idRecipe'],
                where: {

                    date: d,
                    idUser: acc.User.idUser,
                    filter: 1,
                },
                include: [
                    {
                      model: Recipe,
                      required: false,
                      attributes:['name','calories','image','points'],
                    },
                ]
            });
            let id_Recipe = breakfast.map(item => item.idRecipe)
            let islike = await User_recipe.findAll({

                where: {
                    idRecipe: {
                        [Op.in]: id_Recipe
                    },
                    idUser: acc.User.idUser,
                },
            });
            for (let item of breakfast) {
                item.dataValues.isLike = 0;
                let like = islike.find(like => like.dataValues.idRecipe === item.dataValues.idRecipe);
                if (like) {
                    item.dataValues.isLike = like.dataValues.isLike;
                }
                item.dataValues.name = item.dataValues.Recipe.name;
                item.dataValues.calories = item.dataValues.Recipe.calories;
                item.dataValues.image = item.dataValues.Recipe.image;
                item.dataValues.points = item.dataValues.Recipe.points;
                delete item.dataValues.Recipe;
            }
            let lunch = await Recipe_history.findAll({
                attributes: ['idRecipe'],
                where: {
                    date: d,
                    idUser: acc.User.idUser,
                    filter: 2,
                },
                include: [
                    {
                        model: Recipe,
                        required: false,
                        attributes: ['name', 'calories', 'image', 'points']
                    }
                ]
            });
            id_Recipe = lunch.map(item => item.idRecipe)
            islike = await User_recipe.findAll({

                where: {
                    idRecipe: {
                        [Op.in]: id_Recipe
                    },
                    idUser: acc.User.idUser,
                },
            });
            for (let item of lunch) {
                item.dataValues.isLike = 0;
                let like = islike.find(like => like.dataValues.idRecipe === item.dataValues.idRecipe);
                if (like) {
                    item.dataValues.isLike = like.dataValues.isLike;
                }
                item.dataValues.name = item.dataValues.Recipe.name;
                item.dataValues.calories = item.dataValues.Recipe.calories;
                item.dataValues.image = item.dataValues.Recipe.image;
                item.dataValues.points = item.dataValues.Recipe.points;
                delete item.dataValues.Recipe;
            }
            let dinner = await Recipe_history.findAll({
                attributes: ['idRecipe'],
                where: {
                    date: d,
                    idUser: acc.User.idUser,
                    filter: 3,
                },
                include: [
                    {
                        model: Recipe,
                        required: false,
                        attributes: ['name', 'calories', 'image', 'points']
                    }
                ]
            });
            id_Recipe = dinner.map(item => item.idRecipe)
            islike = await User_recipe.findAll({

                where: {
                    idRecipe: {
                        [Op.in]: id_Recipe
                    },
                    idUser: acc.User.idUser,
                },
            });
            for (let item of dinner) {
                item.dataValues.isLike = 0;
                let like = islike.find(like => like.dataValues.idRecipe === item.dataValues.idRecipe);
                if (like) {
                    item.dataValues.isLike = like.dataValues.isLike;
                }
                item.dataValues.name = item.dataValues.Recipe.name;
                item.dataValues.calories = item.dataValues.Recipe.calories;
                item.dataValues.image = item.dataValues.Recipe.image;
                item.dataValues.points = item.dataValues.Recipe.points;
                delete item.dataValues.Recipe;
            }
            res
                .status(200)
                .json({
                    breakfast, lunch, dinner
                });
        }
        else {
            let breakfast = await Recipe_history.findAll({
                attributes: ['idRecipe'],
                where: {

                    date: d,
                    idUser: acc.User.idUser,
                    filter: 1,
                },
                include: [
                    {
                        model: Recipe,
                        required: false,
                        attributes: ['name', 'calories', 'image', 'points']
                    },
                ]
            });
            let id_Recipe = breakfast.map(item => item.idRecipe)
            let islike = await User_recipe.findAll({

                where: {
                    idRecipe: {
                        [Op.in]: id_Recipe
                    },
                    idUser: acc.User.idUser,
                },
            });
            for (let item of breakfast) {
                item.dataValues.isLike = 0;
                let like = islike.find(like => like.dataValues.idRecipe === item.dataValues.idRecipe);
                if (like) {
                    item.dataValues.isLike = like.dataValues.isLike;
                }
                item.dataValues.name = item.dataValues.Recipe.name;
                item.dataValues.calories = item.dataValues.Recipe.calories;
                item.dataValues.image = item.dataValues.Recipe.image;
                item.dataValues.points = item.dataValues.Recipe.points;
                delete item.dataValues.Recipe;
            }
            let lunch = await Recipe_history.findAll({
                attributes: ['idRecipe'],
                where: {
                    date: d,
                    idUser: acc.User.idUser,
                    filter: 2,
                },
                include: [
                    {
                        model: Recipe,
                        required: false,
                        attributes: ['name', 'calories', 'image', 'points']
                    }
                ]
            });
            id_Recipe = lunch.map(item => item.idRecipe)
            islike = await User_recipe.findAll({

                where: {
                    idRecipe: {
                        [Op.in]: id_Recipe
                    },
                    idUser: acc.User.idUser,
                },
            });
            for (let item of lunch) {
                item.dataValues.isLike = 0;
                let like = islike.find(like => like.dataValues.idRecipe === item.dataValues.idRecipe);
                if (like) {
                    item.dataValues.isLike = like.dataValues.isLike;
                }
                item.dataValues.name = item.dataValues.Recipe.name;
                item.dataValues.calories = item.dataValues.Recipe.calories;
                item.dataValues.image = item.dataValues.Recipe.image;
                item.dataValues.points = item.dataValues.Recipe.points;
                delete item.dataValues.Recipe;
            }
            let dinner = await Recipe_history.findAll({
                attributes: ['idRecipe'],
                where: {
                    date: d,
                    idUser: acc.User.idUser,
                    filter: 3,
                },
                include: [
                    {
                        model: Recipe,
                        required: false,
                        attributes: ['name', 'calories', 'image', 'points']
                    }
                ]
            });
            id_Recipe = dinner.map(item => item.idRecipe)
            islike = await User_recipe.findAll({

                where: {
                    idRecipe: {
                        [Op.in]: id_Recipe
                    },
                    idUser: acc.User.idUser,
                },
            });
            for (let item of dinner) {
                item.dataValues.isLike = 0;
                let like = islike.find(like => like.dataValues.idRecipe === item.dataValues.idRecipe);
                if (like) {
                    item.dataValues.isLike = like.dataValues.isLike;
                }
                item.dataValues.name = item.dataValues.Recipe.name;
                item.dataValues.calories = item.dataValues.Recipe.calories;
                item.dataValues.image = item.dataValues.Recipe.image;
                item.dataValues.points = item.dataValues.Recipe.points;
                delete item.dataValues.Recipe;
            }
            res
                .status(200)
                .json({
                    breakfast, lunch, dinner
                });
        }

    } catch (error) {
        res.status(500).json({
            message: 'Error'
        });
    }
};
const getInfoUser = async (req, res) => {
    try {
        // const exercise1 = await Exercise.findAll();
        const acc = await Account.findOne({
            where: { mail: req.mail },
            include: User
        });
        console.log(acc.User.idUser);
        const user_h = await User_history.sequelize.query(
            `select users.idUser,name,gender,user_histories.height,user_histories.weight  from user_histories inner join users on user_histories.idUser = users.idUser
            where user_histories.idUser = ${acc.User.idUser} and  user_histories.date = CURRENT_DATE()`,
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

const editMenuUser = async (req, res) => {

    try {
        const date = req.params;
        const d = date['date'];
        let { breakfast, lunch, dinner } = req.body;



        const acc = await Account.findOne({
            where: { mail: req.mail },
            include: User
        });

        let recipe_his = await Recipe_history.findOne({
            where: {
                date: d, idUser: acc.User.idUser,
            },
        });
        if (recipe_his) {
            recipe_his = await Recipe_history.destroy({
                where: {
                    date: d, idUser: acc.User.idUser,
                },
            });
        }
        if (breakfast !== '') {
            breakfast = breakfast.split(',').map(Number);
            for (let x of breakfast) {
                recipe_his = await Recipe_history.create({
                    idUser: acc.User.idUser,
                    date: d,
                    idRecipe: x,
                    filter: 1,
                });
            }
        }
        if (lunch !== '') {
            lunch = lunch.split(',').map(Number);
            for (let x of lunch) {
                recipe_his = await Recipe_history.create({
                    idUser: acc.User.idUser,
                    date: d,
                    idRecipe: x,
                    filter: 2,
                });
            }
        }
        if (dinner !== '') {
            dinner = dinner.split(',').map(Number);
            for (let x of dinner) {
                recipe_his = await Recipe_history.create({
                    idUser: acc.User.idUser,
                    date: d,
                    idRecipe: x,
                    filter: 3,
                });
            }
        }

        res.status(200).json({
            isSuccess: true
        });
    } catch (error) {
        res.status(500).json({
            isSuccess: false
        });
    }
};

const editUser = async (req, res) => {
    const { name, gender, height, weight, isshare } = req.body;
    try {
        const acc = await Account.findOne({
            where: { mail: req.mail },
            include: User
        });
        console.log(name, gender, height, weight);

        await User.update({
            name: name,
            gender: gender,
            height: height,
            weight: weight,
            isShare: isshare
        }, {
            where: {
                idUser: acc.User.idUser,
            }
        });
        let user_his = await User_history.findOne({
            where: {
                date: moment().tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD"),
                idUser: acc.User.idUser,
            },
        });
        if (!user_his) {
            let u_history_temp = await User_history.findOne({
                where: {
                    idUser: acc.User.idUser,
                },
            });

            user_his = await User_history.create({
                idUser: acc.User.idUser,
                date: moment().tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD"),
                weight: weight,
                height: height,
                water: u_history_temp.dataValues.water,
                calories_in: u_history_temp.dataValues.calories_in,
                calories_out: u_history_temp.dataValues.calories_out,
            });
        }
        else {
            user_his= await User_history.update({
                height: height,
                weight: weight
            }, {
                where: {
                    idUser: acc.User.idUser,
                    date: moment().tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD"),
                }
            });
        }
        res.status(200).json({
            message: 'Success'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error'
        });
    }
};
const getUser = async (req, res) => {
    const idUser = req.params;
    const id = idUser['idUser'];
    console.log(idUser);
    try {
        const user = await Userswithbmi.findOne({
            where: {
                idUser: id,
            },
        });
        user_date = await User_history.findOne({
            where: {
                idUser: id,
            },
            attributes:['date']
        });
        user.dataValues.date=user_date.dataValues.date;
        // delete user.dataValues.User_history;
        const user_recipe = await User_recipe.sequelize.query(
            `select user_recipes.idRecipe,name,calories,image,cmt,isLike from user_recipes inner join recipes
            on user_recipes.idRecipe= recipes.idRecipe 
            where user_recipes.idUser=${id} and isLike=1`,
            {
                type: QueryTypes.SELECT,
                raw: true,
            }
        );
        const user_ex = await User_exercise.sequelize.query(
            `select user_exercises.idExercise,name,calories,image,cmt,isLike from user_exercises inner join exercises
            on user_exercises.idExercise= exercises.idExercise
            where user_exercises.idUser=${id} and isLike=1`,
            {
                type: QueryTypes.SELECT,
                raw: true,
            }
        );
        res
            .status(200)
            .json({
                user, user_recipe, user_ex
            });

    } catch (error) {
        res.status(500).json({
            message: 'Error'
        });
    }
};
const listUser = async (req, res) => {
    const min = Number(req.query.min);
    const max = Number(req.query.max);
    const limit = Number(req.query.limit);
    const page = Number(req.query.page);
    const limit_page = [limit * (page - 1), limit * page]



    try {
        const acc = await Account.findOne({
            where: { mail: req.mail },
            include: User
        })
        let result;
        if (min === 0 && max === 0) {
            result = await Userswithbmi.findAndCountAll({

                attributes: ['idUser', 'name', 'gender', 'height', 'weight', 'bmi'],
                offset: limit_page[0],
                limit: limit_page[1] - limit_page[0],
                nest: true,
            });
            console.log(result);

        }
        else {
            console.log(max);
            result = await Userswithbmi.findAndCountAll({
                where: {
                    bmi: {
                        [Op.gte]: min,
                        [Op.lte]: max
                    }
                },
                attributes: ['idUser', 'name', 'gender', 'height', 'weight', 'bmi'],
                offset: limit_page[0],
                limit: limit_page[1] - limit_page[0],
                nest: true,
            });
        }

        let maxPage = Math.ceil(result.count / limit);
        let users = result.rows;
        res
            .status(200)
            .json({
                users, isSuccess: true, maxPage
            });
    } catch (error) {
        res.status(500).json({ isSuccess: false });
    }
};
const editUserHistory = async(req,res)=>{
    const date = req.params;
    const d = date['date']
    const { weight,height,calories_in,calories_out,water } = req.body;
    const acc = await Account.findOne({
        where: { mail: req.mail },
        include: User
    });

    try {
        let user_his = await  User_history.findOne({
            where:
            {
                date: d,
                idUser:acc.User.idUser,
            }
        });
        if(!user_his){
            user_his = await User_history.create({
                idUser: acc.User.idUser,
                date: d,
                weight: weight,
                height: height,
                water: water,
                calories_in: calories_in,
                calories_out: calories_out,
            });
            res.status(200).json(user_his);
        }
        else{
            user_his = await User_history.update({
                height :height,
                weight :weight,
                calories_in:calories_in,
                calories_out:calories_out,
                water:water
            },{
                where: { 
                    idUser:acc.User.idUser,
                    date:  d,
                }
            });
           
            res.status(200).json({
                message: 'Success'});
        }
        
    } catch{
        res.status(500).json({
            message: 'Error'
        });
    }
};

const getInfo = async(req,res)=>{
    const date = req.params;
    const d = date['date'];
    try {
        // const exercise1 = await Exercise.findAll();
        const acc = await Account.findOne({
            where: { mail: req.mail },
            include: User
        });
        let recipe_his = await Recipe_history.findAll({
            attributes: ['idRecipe'],
            where: { 
                date:d, 
                idUser:acc.User.idUser, 
            },
            include: [
                {
                  model: Recipe,
                  required: false,
                  attributes: ['calories','proteins','fats','carbo'],
                },
              ]
        });
        for (let item of recipe_his) {
            item.dataValues.calories=item.dataValues.Recipe.calories;
            item.dataValues.proteins=item.dataValues.Recipe.proteins;
            item.dataValues.fats=item.dataValues.Recipe.fats;
            item.dataValues.carbo=item.dataValues.Recipe.carbo;
            delete item.dataValues.Recipe;
          }
          res
              .status(200)
              .json({
                recipe_his
              });

    }catch{
        res.status(500).json({
            message: 'Error'
        });
    }

};
module.exports = {
    // getDetailTaiKhoan,
    getAllhistory,getHistory,getRecipeHistory,getInfoUser,editMenuUser,editUser,getUser,listUser,getInfo,editUserHistory
};