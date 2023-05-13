const { Recipe,User_history,Recipe_history,Account,User,Sequelize,Userswithbmi,User_recipe,User_exercise} = require("../models");
const moment = require('moment'); // require
const { Op } = require("sequelize");
const { QueryTypes, DATEONLY, DATE } = require("sequelize");

// const  getRecommend = async (req,res) =>{
    // function convertToJSONDate(strDate){
    //     var splitted = strDate.split(".");
    //     var dt = new Date(splitted[2],splitted[0],splitted[1]);
    //     var newDate = new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds()));
    //     return '/Date(' + newDate.getTime() + ')/';
    //   }
// };
const getHistory = async (req,res) =>{
    const date = req.params;
    const d = date['date']
    const acc = await Account.findOne({
        where: { mail: req.mail },
        include: User
    });
    try {
        let u_history = await User_history.findOne({
            where: {
                date:d, idUser:acc.User.idUser,
            },
        });
        
        console.log(!u_history);
        if(!u_history){
            let u_history_temp = await User_history.findOne({
                where: {
                 idUser:acc.User.idUser,
                },
            });

            u_history = await User_history.create({
                idUser: acc.User.idUser,
                date: d,
                weight: u_history_temp.dataValues.weight,
                height: u_history_temp.dataValues.height,
                water: 0,
                calories_in: 0,
                calories_out: 0,
            });
            console.log(u_history);
        }
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

const getRecipeHistory = async (req,res) =>{
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
                date:d, idUser:acc.User.idUser,
            },
        });
        if(!recipe_his && d>=now){
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
                    
                    date:d, 
                    idUser:acc.User.idUser, 
                    filter:1,
                },
                include: [
                    {
                      model: Recipe,
                      required: false,
                      attributes:['name','calories','image','points'],
                    },
                  ]
            });
            let id_Recipe= breakfast.map(item=>item.idRecipe)
            let islike = await User_recipe.findAll({
               
                where: {
                    idRecipe: {[Op.in]: id_Recipe
                    },
                    idUser:acc.User.idUser, 
                },
            });
            for (let item of breakfast) {
                item.dataValues.isLike = 0;
                let like = islike.find(like => like.dataValues.idRecipe === item.dataValues.idRecipe);
                if (like) {
                  item.dataValues.isLike = like.dataValues.isLike;
                }
                item.dataValues.name=item.dataValues.Recipe.name;
                item.dataValues.calories=item.dataValues.Recipe.calories;
                item.dataValues.image=item.dataValues.Recipe.image;
                item.dataValues.points=item.dataValues.Recipe.points;
                delete item.dataValues.Recipe;
              }
            let lunch = await Recipe_history.findAll({
                attributes: ['idRecipe'],
                where: {
                    date:d, 
                    idUser:acc.User.idUser, 
                    filter:2,
                },
                include: [
                    {
                      model: Recipe,
                      required: false,
                      attributes: ['name','calories','image','points']
                    }
                  ]
            });
            id_Recipe= lunch.map(item=>item.idRecipe)
            islike = await User_recipe.findAll({
                
                where: {
                    idRecipe: {[Op.in]: id_Recipe
                    },
                    idUser:acc.User.idUser, 
                },
            });
            for (let item of lunch) {
                item.dataValues.isLike = 0;
                let like = islike.find(like => like.dataValues.idRecipe === item.dataValues.idRecipe);
                if (like) {
                  item.dataValues.isLike = like.dataValues.isLike;
                }
                item.dataValues.name=item.dataValues.Recipe.name;
                item.dataValues.calories=item.dataValues.Recipe.calories;
                item.dataValues.image=item.dataValues.Recipe.image;
                item.dataValues.points=item.dataValues.Recipe.points;
                delete item.dataValues.Recipe;
              }
            let dinner = await Recipe_history.findAll({
                attributes: ['idRecipe'],
                where: {
                    date:d, 
                    idUser:acc.User.idUser, 
                    filter:3,
                },
                include: [
                    {
                      model: Recipe,
                      required: false,
                      attributes: ['name','calories','image','points']
                    }
                  ]
            });
            id_Recipe= dinner.map(item=>item.idRecipe)
            islike = await User_recipe.findAll({
                
                where: {
                    idRecipe: {[Op.in]: id_Recipe
                    },
                    idUser:acc.User.idUser, 
                },
            });
            for (let item of dinner) {
                item.dataValues.isLike = 0;
                let like = islike.find(like => like.dataValues.idRecipe === item.dataValues.idRecipe);
                if (like) {
                  item.dataValues.isLike = like.dataValues.isLike;
                }
                item.dataValues.name=item.dataValues.Recipe.name;
                item.dataValues.calories=item.dataValues.Recipe.calories;
                item.dataValues.image=item.dataValues.Recipe.image;
                item.dataValues.points=item.dataValues.Recipe.points;
                delete item.dataValues.Recipe;
              }
              res
              .status(200)
              .json({
                breakfast, lunch, dinner
              });
        }
        else{
            let breakfast = await Recipe_history.findAll({
                attributes: ['idRecipe'],
                where: {
                    
                    date:d, 
                    idUser:acc.User.idUser, 
                    filter:1,
                },
                include: [
                    {
                      model: Recipe,
                      required: false,
                      attributes: ['name','calories','image','points']
                    },
                  ]
            });
            let id_Recipe= breakfast.map(item=>item.idRecipe)
            let islike = await User_recipe.findAll({
               
                where: {
                    idRecipe: {[Op.in]: id_Recipe
                    },
                    idUser:acc.User.idUser, 
                },
            });
            for (let item of breakfast) {
                item.dataValues.isLike = 0;
                let like = islike.find(like => like.dataValues.idRecipe === item.dataValues.idRecipe);
                if (like) {
                  item.dataValues.isLike = like.dataValues.isLike;
                }
                item.dataValues.name=item.dataValues.Recipe.name;
                item.dataValues.calories=item.dataValues.Recipe.calories;
                item.dataValues.image=item.dataValues.Recipe.image;
                item.dataValues.points=item.dataValues.Recipe.points;
                delete item.dataValues.Recipe;
              }
            let lunch = await Recipe_history.findAll({
                attributes: ['idRecipe'],
                where: {
                    date:d, 
                    idUser:acc.User.idUser, 
                    filter:2,
                },
                include: [
                    {
                      model: Recipe,
                      required: false,
                      attributes: ['name','calories','image','points']
                    }
                  ]
            });
            id_Recipe= lunch.map(item=>item.idRecipe)
            islike = await User_recipe.findAll({
                
                where: {
                    idRecipe: {[Op.in]: id_Recipe
                    },
                    idUser:acc.User.idUser, 
                },
            });
            for (let item of lunch) {
                item.dataValues.isLike = 0;
                let like = islike.find(like => like.dataValues.idRecipe === item.dataValues.idRecipe);
                if (like) {
                  item.dataValues.isLike = like.dataValues.isLike;
                }
                item.dataValues.name=item.dataValues.Recipe.name;
                item.dataValues.calories=item.dataValues.Recipe.calories;
                item.dataValues.image=item.dataValues.Recipe.image;
                item.dataValues.points=item.dataValues.Recipe.points;
                delete item.dataValues.Recipe;
              }
            let dinner = await Recipe_history.findAll({
                attributes: ['idRecipe'],
                where: {
                    date:d, 
                    idUser:acc.User.idUser, 
                    filter:3,
                },
                include: [
                    {
                      model: Recipe,
                      required: false,
                      attributes: ['name','calories','image','points']
                    }
                  ]
            });
            id_Recipe= dinner.map(item=>item.idRecipe)
            islike = await User_recipe.findAll({
                
                where: {
                    idRecipe: {[Op.in]: id_Recipe
                    },
                    idUser:acc.User.idUser, 
                },
            });
            for (let item of dinner) {
                item.dataValues.isLike = 0;
                let like = islike.find(like => like.dataValues.idRecipe === item.dataValues.idRecipe);
                if (like) {
                  item.dataValues.isLike = like.dataValues.isLike;
                }
                item.dataValues.name=item.dataValues.Recipe.name;
                item.dataValues.calories=item.dataValues.Recipe.calories;
                item.dataValues.image=item.dataValues.Recipe.image;
                item.dataValues.points=item.dataValues.Recipe.points;
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
const getInfoUser = async (req, res) =>{
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

const editMenuUser = async (req,res) =>{
    const date = req.params;
    const d = date['date'];
    let { breakfast, lunch,dinner } = req.body;
    console.log(breakfast);
    breakfast= breakfast.split(',').map(Number);
    lunch=lunch.split(',').map(Number);
    dinner=dinner.split(',').map(Number);
    try {
        const acc = await Account.findOne({
            where: { mail: req.mail },
            include: User
        });
        let recipe_his = await Recipe_history.findOne({
            where: {
                date:d, idUser:acc.User.idUser,
            },
        });
        if(!recipe_his){
           recipe_his = await Recipe_history.destroy({
            where: {
                date:d, idUser:acc.User.idUser,
            },
        });
    }
    // recipe_his = await Recipe_history.create({
    //             idUser: acc.User.idUser,
    //             date: d,
    //             idRecipe: breakfast[0],
    //             filter: 1,
    //         });
        for (let x of breakfast) {
                recipe_his = await Recipe_history.create({
                idUser: acc.User.idUser,
                date: d,
                idRecipe: x,
                filter: 1,
            });
        }
        for (let x of lunch) {
                recipe_his = await Recipe_history.create({
                idUser: acc.User.idUser,
                date: d,
                idRecipe:x,
                filter: 2,
            });
        }
        for (let x of dinner) {
                recipe_his = await Recipe_history.create({
                idUser: acc.User.idUser,
                date: d,
                idRecipe: x,
                filter: 3,
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

const editUser = async (req,res) =>{
    const { name, gender,height,weight,isshare } = req.body;
    try {
        const acc = await Account.findOne({
            where: { mail: req.mail },
            include: User
        });
        console.log(name,gender,height,weight);

        await User.update({name :name,
            gender :gender,
            height : height,
            weight : weight,
            isShare: isshare },{
            where: { 
                idUser:acc.User.idUser,
            }
        });
        let user_his = await User_history.findOne({
            where: {
                date: moment().tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD"),
                idUser:acc.User.idUser,
            },
        });
        if(!user_his){
            let u_history_temp = await User_history.findOne({
                where: {
                 idUser:acc.User.idUser,
                },
            });

            user_his = await User_history.create({
                idUser: acc.User.idUser,
                date: moment().tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD"),
                weight: u_history_temp.dataValues.weight,
                height: u_history_temp.dataValues.height,
                water: 0,
                calories_in: 0,
                calories_out: 0,
            });
        }
        else{
            await User_history.update({height :height,
                weight :weight},{
                where: { 
                    idUser:acc.User.idUser,
                    date:  moment().tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DD"),
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
const getUser = async (req,res) =>{
    const idUser = req.params;
    const id = idUser['idUser'];
    console.log(idUser);
    try {
        const user = await Userswithbmi.findAll({
            where: {
            idUser: id,
            },
        });
        const user_recipe = await User_recipe.sequelize.query(
            `select user_recipes.idRecipe,name,calories,image,cmt from user_recipes inner join recipes
            on user_recipes.idRecipe= recipes.idRecipe 
            where user_recipes.idUser=${id} and isLike=1`,
            {
                type: QueryTypes.SELECT,
                raw: true,
            }
        );
        const user_ex = await User_exercise.sequelize.query(
            `select user_exercises.idExercise,name,calories,image,cmt from user_exercises inner join exercises
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
            user,user_recipe,user_ex
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error'
        });
    }
};
const listUser = async (req,res) =>{
  const min = Number(req.query.min);
  const max = Number(req.query.max);
  const limit = Number(req.query.limit);
  const page = Number(req.query.page);
  const limit_page = [limit * (page - 1), limit * page]

    
    // try {
    //         const user = await User.sequelize.query(
    //             `SELECT idUser , name,gender,weight,height, weight/((height/100)*(height/100)) as BMI FROM users
    //             where weight/((height/100)*(height/100))<=${max} and weight/((height/100)*(height/100))>=${min} and isShare=1`,
    //             {
    //                 type: QueryTypes.SELECT,
    //                 raw: true,
    //             }
    //         );
    //         res.status(200).json(user); 

//   } catch (error) {
//     res.status(500).json({ isSuccess: false });
//   }
try {
    const acc = await Account.findOne({
      where: { mail: req.mail },
      include: User
    })
    let result;
    if(min===0&&max===0){
       result = await Userswithbmi.findAndCountAll({
        
        attributes: ['idUser', 'name','gender' ,'height', 'weight', 'bmi'],
        offset: limit_page[0],
        limit: limit_page[1] - limit_page[0],
        nest: true,   
      });
      console.log(result);

    }
    else{
        console.log(max);
       result = await Userswithbmi.findAndCountAll({
        where: { bmi: { [Op.gte]: min,
                        [Op.lte]: max
                    }
        },
        attributes: ['idUser', 'name','gender' ,'height', 'weight', 'bmi'],
        offset: limit_page[0],
        limit: limit_page[1] - limit_page[0],
        nest: true,
      });
    }
    
    let maxPage = Math.ceil(result.count/limit);
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
module.exports = {
    // getDetailTaiKhoan,
    getAllhistory,getHistory,getRecipeHistory,getInfoUser,editMenuUser,editUser,getUser,listUser,
};