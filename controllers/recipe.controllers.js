const {Recipe, Recipe_ingredient, Ingredient, User_recipe} = require("../models")
const { QueryTypes } = require("sequelize");

const getInfoRecipe = async (req, res) => {
    const { idRecipe } = req.params;
    const idUser = 2
    try {
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
                where: { isLike: 2 },
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

  module.exports = {
    getInfoRecipe,
   
  };