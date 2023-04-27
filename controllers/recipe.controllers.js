const { json } = require("body-parser");
const { Recipe, Recipe_ingredient, Ingredient, User_recipe, User, Account, Recipe_rank, Sequelize } = require("../models")
const moment = require('moment-timezone'); // require
const { QueryTypes, Op } = require("sequelize");


async function getRecipes(calories, limit) {
  const recipes = await Recipe.findAll({
    where: {
      calories: { [Op.between]: calories, }
    },
    offset: limit[0],
    limit: limit[1] - limit[0],
  })
}
const getInfoRecipe = async (req, res) => {

  const { idRecipe } = req.params;

  try {
    const acc = await Account.findOne({
      where: { mail: req.mail },
      include: User
    })

    let recipe = await Recipe.findOne({
      where: {
        idRecipe: idRecipe,
      },
      //raw : true,
      nest: true,
      include: [{
        model: Recipe_ingredient,
        attributes: ['unitName', 'quantity', 'idIngredient'],
        include: [{
          model: Ingredient,
          attributes: [['name', 'inName'], ['image', 'inImage']]
        }]
      },
      {
        model: User_recipe,
        where: { isLike: 1, idUser: acc.User.idUser },
        required: false,
        attributes: ['isLike']
      }
      ],


    });

    recipe.dataValues.isLike = recipe.dataValues.User_recipes[0].isLike;
    delete recipe.dataValues.User_recipes




    res
      .status(200)
      .json({
        recipe, isSuccess: true
      });
  } catch (error) {
    res.status(500).json({ isSuccess: false });
  }
};
const getFavorite = async (req, res) => {


  try {
    const acc = await Account.findOne({
      where: { mail: req.mail },
      include: User
    })
    const recipe_fa = await User_recipe.findAll({
      where: {
        idUser: acc.User.idUser,
        isLike: 1,
      },
      include: Recipe,


    });

    // const equips = await Recipe_ingredient.;
    // const info = await Order.sequelize.query(
    //     "SELECT SUM((I.price*OD.quantity)) as total, DATE_FORMAT(O.datetime, '%d/%m/%Y %H:%i') as datetime, O.status, P.name as name_payment FROM payments as P, orders as O, order_details as OD, items as I WHERE O.id_order = OD.id_order AND OD.id_item = I.id_item AND P.id_payment = O.id_payment AND O.id_order = :id_order",
    //     {
    //     replacements: { id_order: id_order },
    //     type: QueryTypes.SELECT,
    //     raw: true,
    //     }
    // );
    res
      .status(200)
      .json({
        recipe_fa, isSuccess: true
      });
  } catch (error) {
    res.status(500).json({ isSuccess: false });
  }
};
const likeRecipe = async (req, res) => {
  const idRecipe = req.query.idRecipe;
  const isLike = parseInt(req.query.isLike);

  try {
    const acc = await Account.findOne({
      where: { mail: req.mail },
      include: User
    })

    let recipe = await Recipe.findOne({
      where: { idRecipe }
    })
    let recipe_fa = await User_recipe.findOne({
      where: {
        idUser: acc.User.idUser,
        idRecipe,

      }


    });

    if (!recipe_fa) {

      recipe_fa = await User_recipe.create(
        {
          idUser: acc.User.idUser,
          idRecipe: idRecipe,
          isLike: isLike,
          date: new Date(),
          cmt: null
        }
      )
      if (isLike === 0) {
        recipe.points = recipe.points - 1
        await recipe.save();
      } else {
        recipe.points = recipe.points + 1
        await recipe.save();
      }
    } else {

      if (isLike === 0 && recipe_fa.isLike == 1) {
        recipe.points = recipe.points - 1
        await recipe.save();
      }
      else {
        if (isLike === 1 & recipe_fa.isLike == 0) {
          recipe.points = recipe.points + 1
          await recipe.save();
        }
      }

      recipe_fa.isLike = isLike;
      await recipe_fa.save();
    }

    //let test =1;

    res
      .status(200)

      .json({
        recipe_fa, isSuccess: true
      });
  } catch (error) {
    res.status(500).json({ isSuccess: false });
  }
};
const userCMT = async (req, res) => {
  const { idRecipe } = req.params;
  const { cmt } = req.body;

  try {
    const acc = await Account.findOne({
      where: { mail: req.mail },
      include: User
    })

    let recipe_fa = await User_recipe.findOne({
      where: {
        idUser: acc.User.idUser,
        idRecipe,

      }


    });

    if (!recipe_fa) {

      recipe_fa = await User_recipe.create(
        {
          idUser: acc.User.idUser,
          idRecipe: idRecipe,
          isLike: 0,
          date: moment().add(7, 'hours').format("YYYY-MM-DD HH:mm:ss"),
          cmt: cmt
        }
      )

    }
    else {
      recipe_fa.cmt = cmt;
      recipe_fa.date = moment().add(7, 'hours').format("YYYY-MM-DD HH:mm:ss"),
        await recipe_fa.save();
    }

    //let test =1;

    res
      .status(200)

      .json({
        isSuccess: true
      });
  } catch (error) {
    res.status(500).json({ isSuccess: false });
  }
};
const getAllRecipe = async (req, res) => {


  try {

    const recipe = await Recipe.findAll();


    res
      .status(200)
      .json({
        recipe
      });
  } catch (error) {
    res.status(500).json(error);
  }
};
function transformRecipes(recipes) {
  return recipes.map(recipe => {
    const isLike = recipe.User_recipes.some(userRecipe => userRecipe.isLike === 1);
    return {
      ...recipe,
      isLike,
      User_recipes: undefined
    };
  });
}
const getAllRecipeFilter = async (req, res) => {
  console.log('test')
  const calories = req.query.calories.split(',').map(Number);
  const ingredient = req.query.ingredient.split(',').map(Number);
  const limit = Number(req.query.limit);
  const page = Number(req.query.page);
  const limit_page = [limit * (page - 1), limit * page]
  console.log(ingredient)

  try {
    const acc = await Account.findOne({
      where: { mail: req.mail },
      include: User
    })
    let result;
    if(calories[0]===0&&calories[1]===0){
       result = await Recipe.findAndCountAll({
        
        attributes: ['idRecipe', 'name', 'image', 'calories', 'points'],
        offset: limit_page[0],
        limit: limit_page[1] - limit_page[0],
        nest: true,
        include: [
          {
            model: User_recipe,
            where: { isLike: 1, idUser: acc.User.idUser },
            required: false,
            attributes: ['isLike']
          },
          ...ingredient.map(id => ({
            model: Recipe_ingredient,
            where: { idIngredient: id },
            required: id!==0,
            attributes: []
          }))
        ]
      });
    }else{
       result = await Recipe.findAndCountAll({
        where: {
          calories: { [Op.between]: calories }
        },
        attributes: ['idRecipe', 'name', 'image', 'calories', 'points'],
        offset: limit_page[0],
        limit: limit_page[1] - limit_page[0],
        nest: true,
        include: [
          {
            model: User_recipe,
            where: { isLike: 1, idUser: acc.User.idUser },
            required: false,
            attributes: ['isLike']
          },
          ...ingredient.map(id => ({
            model: Recipe_ingredient,
            where: { idIngredient: id },
            required: id!==0,
            attributes: []
          }))
        ]
      });
    }
    

    let maxPage = Math.ceil(result.count/4);
    let recipes = result.rows;
    let recipeJson = JSON.stringify(recipes)
    console.log(recipeJson)
    recipeJson = transformRecipes(JSON.parse(recipeJson))
    res
      .status(200)
      .json({
        recipeJson, isSuccess: true, maxPage
      });
  } catch (error) {
    res.status(500).json({ isSuccess: false });
  }
};
const listCmtRecipe = async (req, res) => {


  try {

    const recipe = await Recipe.findAll();


    res
      .status(200)
      .json({
        recipe
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getRecipeByTitle = async (req, res) => {
  const title = req.params

  try {

    const recipe = await Recipe.findAll({
      where: title
    });


    res
      .status(200)
      .json({
        recipe
      });
  } catch (error) {
    res.status(500).json(error);
  }
};
const updateRank = async (req, res) => {
  const title = req.params

  try {

    const topRecipes = await Recipe.findAll({
      order: [['points', 'DESC']],
      limit: 30
    });

    for (let i = 0; i < topRecipes.length; i++) {
      let recipe = topRecipes[i];
      await Recipe_rank.upsert({
        rank: i + 1,
        idRecipe: recipe.idRecipe,
        name: recipe.name,
        points: recipe.points,
        calories: recipe.calories,
        image: recipe.image

      });
    }


    res
      .status(200)
      .json({
        isSuccess: true
      });
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
  getInfoRecipe, getFavorite, getAllRecipe, getRecipeByTitle, likeRecipe, userCMT, updateRank, listCmtRecipe, getAllRecipeFilter

};

