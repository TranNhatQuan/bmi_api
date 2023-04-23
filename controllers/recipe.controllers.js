const { Recipe, Recipe_ingredient, Ingredient, User_recipe, User, Account } = require("../models")
const { QueryTypes } = require("sequelize");

const getInfoRecipe = async (req, res) => {

    const { idRecipe } = req.params;
    
    try {
        const acc = await Account.findOne({
          where: {mail: req.mail},
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
                attributes: ['unitName','quantity','idIngredient'],
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
        
        recipe.dataValues.isLike=recipe.dataValues.User_recipes[0].isLike;
        delete recipe.dataValues.User_recipes
        
        
       
        
        res
        .status(200)
        .json({
          recipe, isSuccess:true
        });
    } catch (error) {
      res.status(500).json({isSuccess:false});
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
          recipe_fa,isSuccess:true
        });
    } catch (error) {
      res.status(500).json({isSuccess:false});
    }
  };
  const likeRecipe= async (req, res) => {
    const idRecipe =req.query.idRecipe;
    const isLike = parseInt(req.query.isLike);
    
    try {
      const acc = await Account.findOne({
        where: {mail: req.mail},
        include: User
      })
      
        let recipe = await Recipe.findOne({
          where: {idRecipe}
        })
        let recipe_fa = await User_recipe.findOne({
            where: {
            idUser: acc.User.idUser,
            idRecipe,
            
            }
          
          
        });
        
        if(!recipe_fa){
          
          recipe_fa = await User_recipe.create(
            {
              idUser:acc.User.idUser,
              idRecipe:idRecipe,
              isLike:isLike,
              cmt:null
            }
          )
          if(isLike===0){
            recipe.points = recipe.points-1
            await recipe.save();
          }else{
            recipe.points = recipe.points+1
            await recipe.save();
          }
        }else{
          
          if(isLike === 0&&recipe_fa.isLike==1){
          recipe.points = recipe.points-1
          await recipe.save();
          } 
          else{
            if(isLike === 1&recipe_fa.isLike==0){
            recipe.points = recipe.points+1
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
          recipe_fa,isSuccess:true
        });
    } catch (error) {
      res.status(500).json({isSuccess:false});
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
    getInfoRecipe, getFavorite, getAllRecipe ,getRecipeByTitle, likeRecipe
   
  };

 