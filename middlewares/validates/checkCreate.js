const { Recipe, Recipe_ingredient, Ingredient, User_recipe, User, Account, Recipe_rank, Sequelize } = require("../../models")

const checkCreateAccount = (Model) => {
  return async (req, res, next) => {
    const { mail } = req.body;
    const account = await Model.findOne({
      where: {
        mail,
      },
    });
    if (!account) {
      next();
    } else {
      res.status(409).json({ isExist: true, isSuccess:false });
    }
  };
};
const checkCreateRecipe = () => {
  return async (req, res, next) => {
    try {
      const { name } = req.body;
      console.log('check')
      const account = await Recipe.findOne({
        where: {
          name,
        },
      });
      if (!account) {
        next();
      } else {
        return res.status(409).send({ isSuccess:false, isExist: true, status: true });
      }
    } catch (error) {
      return res.status(500).send({isSuccess:false, isExist: true, status: true });
    }
    }
   
  };


module.exports = {
  checkCreateAccount,checkCreateRecipe
  
};
