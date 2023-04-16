const { Recipe, Recipe_ingredient, Ingredient, User_recipe, User, Account } = require("../models")
const { QueryTypes } = require("sequelize");

const getInfoRecipe = async (req, res) => {

    const { idRecipe } = req.params;
    
    try {
        const acc = await Account.findOne({
          where: {mail: req.mail},
          include: User
        })
        
        const recipe = await Recipe.findOne({
            where: {
            idRecipe: idRecipe,
            },
            include: [{
                model: Recipe_ingredient,
                attributes: ['unitName','quantity'],
                include: [{
                  model: Ingredient,
                  attributes: [['name', 'inName'], ['image', 'inImage']]
                }]
              },
              {
                model: User_recipe,
                where: { isLike: 1, idUser: acc.User.idUser},
                required: false,
                attributes: ['isLike']
              }
            ],
          
          
        });
        const ingredients = recipe.Recipe_ingredients.map(ri => ri.Ingredient);
        delete recipe.Recipe_ingredients;
        recipe.ingredients = ingredients;
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
          recipe
        });
    } catch (error) {
      res.status(500).json(error);
    }
  };
  const getFavorite= async (req, res) => {
    
    
    try {
      const acc = await Account.findOne({
        where: {mail: req.mail},
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
          recipe_fa
        });
    } catch (error) {
      res.status(500).json(error);
    }
  };
  const getAllRecipe= async (req, res) => {
    
    
    try {
      
        const recipe = await Recipe.findAll();
      
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
          recipe
        });
    } catch (error) {
      res.status(500).json(error);
    }
  };
  const getRecipeByTitle= async (req, res) => {
    const title = req.params
    
    try {
      
        const recipe = await Recipe.findAll({
          where: title
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
          recipe
        });
    } catch (error) {
      res.status(500).json(error);
    }
  };
  module.exports = {
    getInfoRecipe, getFavorite, getAllRecipe ,getRecipeByTitle
   
  };

 