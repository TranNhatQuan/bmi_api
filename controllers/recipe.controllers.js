const { json, text } = require("body-parser");
const { Recipe, Recipe_ingredient, Ingredient, User_recipe, User, Account, Recipe_rank, Sequelize } = require("../models")
const moment = require('moment-timezone'); // require
const { QueryTypes, Op } = require("sequelize");
const { query } = require("express");



const getInfoRecipe = async (req, res) => {



  try {
    const { idRecipe } = req.params;
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
        required: false,
        attributes: ['unitName', 'quantity', 'idIngredient'],
        include: [{
          model: Ingredient,
          required: false,
          attributes: [['name', 'inName'], ['image', 'inImage']]
        }]
      },
      {
        model: User_recipe,
        where: { isLike: 1, idUser: acc.User.idUser },
        required: false,
        attributes: ['isLike']
      },
      {
        model: Recipe_rank,
        require: false,
        attributes: ['rank']
      }
      ],


    });


    //console.log(recipe.dataValues.Recipe_rank)
    if (recipe.dataValues.User_recipes[0]) {
      recipe.dataValues.isLike = recipe.dataValues.User_recipes[0].isLike
      delete recipe.dataValues.User_recipes
    }
    else {
      recipe.dataValues.isLike = 0
      delete recipe.dataValues.User_recipes
    }
    if (recipe.dataValues.Recipe_rank) {
      recipe.dataValues.rank = recipe.dataValues.Recipe_rank.rank
      delete recipe.dataValues.Recipe_rank
    }
    else {
      recipe.dataValues.rank = 0;
      delete recipe.dataValues.Recipe_rank
    }
    for (let item of recipe.dataValues.Recipe_ingredients) {

      item.dataValues.name = item.dataValues.Ingredient.dataValues.inName;
      item.dataValues.image = item.dataValues.Ingredient.dataValues.inImage;
      delete item.dataValues.Ingredient;
    }





    res
      .status(200)
      .json({
        recipe, isSuccess: true
      });
  } catch (error) {
    res.status(500).json({ isSuccess: false });
  }
};
const editRecipe = async (req, res) => {



  try {
    const { idRecipe } = req.params;

    const { name, info, calories, proteins, fats, carbo, image } = req.body;

    let recipe = await Recipe.findOne({
      where: {
        idRecipe: { [Op.ne]: idRecipe },
        name: name
      },
    })
    if (recipe) {
      return res.status(409).send({ isSuccess: false, isExist: true, status: true, recipe });
    }
    recipe = await Recipe.findOne({
      where: {
        idRecipe: idRecipe,
      },
    });


    if (recipe) {
      await recipe.update(
        {
          name: name,
          info: info,

          calories: calories,

          fats: fats,
          carbo: carbo,
          proteins: proteins,

          image: image
        },
      )

      return res
        .status(200)
        .json({
          recipe, isSuccess: true
        });
    }
    else {
      return res.status(403).json({ isSuccess: false });
    }







  } catch (error) {
    res.status(500).json({ isSuccess: false });
  }
};
const addRecipe = async (req, res) => {



  try {


    const { name, info, calories, proteins, fats, carbo, image } = req.body;
    //console.log(name)
    let recipe = await Recipe.create({
      name: name,
      info: info,

      calories: calories,

      fats: fats,
      carbo: carbo,
      proteins: proteins,
      points: 0,
      idType: 1,
      image: image
    })

    return res
      .status(200)
      .json({
        recipe, isSuccess: true, isExist: false
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


  try {
    const idRecipe = parseInt(req.query.idRecipe);
    //console.log(idRecipe)
    const isLike = parseInt(req.query.isLike);
    //console.log(isLike)
    //console.log(1)
    const acc = await Account.findOne({
      where: { mail: req.mail },
      include: User
    })
    //console.log(2)
    let recipe = await Recipe.findOne({
      where: { idRecipe }
    })
    //console.log(3)
    let recipe_fa = await User_recipe.findOne({
      where: {
        idUser: acc.User.idUser,
        idRecipe,

      }


    });
    //console.log(4)
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
    //console.log(5)
    //let test =1;

    res
      .status(200)

      .json({
        recipe_fa, isSuccess: true
      });
  } catch (error) {
    return res.status(500).json({ isSuccess: false, error });
  }
};
const userCMT = async (req, res) => {


  try {
    const { idRecipe } = req.params;
    const { cmt } = req.body;
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
          date: moment().format("YYYY-MM-DD HH:mm:ss"),
          cmt: cmt
        }
      )

    }
    else {
      recipe_fa.cmt = cmt;
      recipe_fa.date = moment().format("YYYY-MM-DD HH:mm:ss"),
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
function transformIdUsertoName(listCMT) {
  return listCMT.map(recipe => {
    const name = recipe.User.name;
    return {
      ...recipe,
      name,
      User: undefined
    };
  });
}
const getAllRecipeFilter = async (req, res) => {




  try {
    const calories = req.query.calories.split(',').map(Number);
    const ingredient = req.query.ingredient.split(',').map(Number);
    const limit = Number(req.query.limit);
    const page = Number(req.query.page);
    const limit_page = [limit * (page - 1), limit * page]
    const acc = await Account.findOne({
      where: { mail: req.mail },
      include: User
    })
    let result;
    if (calories[0] === 0 && calories[1] === 0) {
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
            required: id !== 0,
            attributes: []
          }))
        ]
      });
    } else {
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
            required: id !== 0,
            attributes: []
          }))
        ]
      });
    }



    let maxPage = Math.ceil(result.count / limit);

    let recipes = result.rows;
    let recipeJson = JSON.stringify(recipes)

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
const getAllRecipeFilterAdmin = async (req, res) => {




  try {
    const calories = req.query.calories.split(',').map(Number);
    const ingredient = req.query.ingredient.split(',').map(Number);
    const limit = Number(req.query.limit);
    const page = Number(req.query.page);
    const limit_page = [limit * (page - 1), limit * page]

    let result;
    if (calories[0] === 0 && calories[1] === 0) {
      result = await Recipe.findAndCountAll({

        attributes: ['idRecipe', 'name', 'image', 'calories', 'points'],
        offset: limit_page[0],
        limit: limit_page[1] - limit_page[0],
        nest: true,
        include: [

          ...ingredient.map(id => ({
            model: Recipe_ingredient,
            where: { idIngredient: id },
            required: id !== 0,
            attributes: []
          }))
        ]
      });
    } else {
      result = await Recipe.findAndCountAll({
        where: {
          calories: { [Op.between]: calories }
        },
        attributes: ['idRecipe', 'name', 'image', 'calories', 'points'],
        offset: limit_page[0],
        limit: limit_page[1] - limit_page[0],
        nest: true,
        include: [

          ...ingredient.map(id => ({
            model: Recipe_ingredient,
            where: { idIngredient: id },
            required: id !== 0,
            attributes: []
          }))
        ]
      });
    }



    let maxPage = Math.ceil(result.count / limit);

    let recipes = result.rows;

    res
      .status(200)
      .json({
        recipes, isSuccess: true, maxPage
      });
  } catch (error) {
    res.status(500).json({ isSuccess: false });
  }
};
const listCmtRecipe = async (req, res) => {
  const idRecipe = Number(req.query.idRecipe)
  const limit = Number(req.query.limit);
  const page = Number(req.query.page);
  const limit_page = [limit * (page - 1), limit * page]


  try {

    const cmt = await User_recipe.findAndCountAll({
      where: {
        idRecipe,
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
    listCMT = transformIdUsertoName(JSON.parse(listCMT))
    res
      .status(200)
      .json({
        listCMT, maxPage, isSuccess: true
      });
  } catch (error) {
    res.status(500).json({ isSuccess: false });
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
    res.status(500).json({ isSuccess: false });
  }
};
const getRecipeRank = async (req, res) => {


  try {


    const recipeRank = await Recipe_rank.findAll();



    res
      .status(200)
      .json({
        recipeRank,
        isSuccess: true
      });
  } catch (error) {
    res.status(500).json({ isSuccess: false });
  }
};
const searchRecipe = async (req, res) => {


  try {
    const name = req.query.name
    const limit = Number(req.query.limit);
    const page = Number(req.query.page);
    const limit_page = [limit * (page - 1), limit * page]
    console.log(name, limit, page, limit_page)
    const acc = await Account.findOne({
      where: { mail: req.mail },
      include: User
    })

    const result = await Recipe.findAndCountAll({
      where: {
        name: { [Op.like]: `%${name}%` }
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
      ]
    });
    console.log('test')
    let maxPage = Math.ceil(result.count / limit);
    let recipes = result.rows;
    let recipeJson = JSON.stringify(recipes)
    console.log(recipeJson)
    recipeJson = transformRecipes(JSON.parse(recipeJson))


    res
      .status(200)
      .json({
        recipeJson,
        maxPage,
        isSuccess: true
      });
  } catch (error) {
    res.status(500).json({ isSuccess: false });
  }
};

module.exports = {
  getInfoRecipe, getFavorite, getAllRecipe, getRecipeByTitle, likeRecipe,
  userCMT, updateRank, listCmtRecipe, getAllRecipeFilter,
  getRecipeRank, searchRecipe, getAllRecipeFilterAdmin, editRecipe
  , addRecipe
};

