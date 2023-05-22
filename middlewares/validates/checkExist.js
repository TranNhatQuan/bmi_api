
const { Recipe, Recipe_ingredient, Ingredient, User_recipe, User, Account } = require("../../models")
const checkExistAccount = (Model) => {
  return async (req, res, next) => {
    try {
      const { mail } = req.body;
      console.log(mail)
      const account = await Model.findOne({
        where: {
          mail,
        },
      });
      if (account) {
        next();
      } else {
        res.status(404).send({ message: "Không tìm thấy tài khoản!",isSuccess:false, isExist: false, status: true });
      }
    } catch (error) {
      res.status(500).send({ message: "Không tìm thấy tài khoản!",isSuccess:false, isExist: false, status: true });
    }
    }
   
  };
  const checkExistRecipe = (Model) => {
    return async (req, res, next) => {
      try {
        const { name } = req.body;
      
        const account = await Model.findOne({
          where: {
            name,
          },
        });
        if (account) {
          next();
        } else {
          res.status(404).send({ isSuccess:false, isExist: false, status: true });
        }
      } catch (error) {
        res.status(500).send({isSuccess:false, isExist: false, status: true });
      }
      }
     
    };

const checkExistAccount1 = (Model) => {
  return async (req, res, next) => {
    const { mail } = req.body;
    
    const account = await Model.findOne({
      where: {
        mail,
      },
    });
    if (account) {
      next();
    } else {
      res.status(404).send({ message: "Không tìm thấy tài khoản!" });
    }
  };
};
const checkExistUserRecipe = () => {
  return async (req, res, next) => {
    try {
      const idRecipe =req.query.idRecipe;
      console.log(idRecipe)
      const acc = await Account.findOne({
        where: {mail: req.mail},
        include: User
      })
      console.log(acc)
      const recipe_fa = await User_recipe.findOne({
          where: {
          idUser: acc.User.idUser,
          idRecipe:idRecipe,
          
          }
        
        
      });
      req.idUser=acc.User.idUser;
    if (recipe_fa) {
      next();
    } else {
      recipe_fa = await User_recipe.create(
        {
          idUser:acc.User.idUser,
          idRecipe,
          isLike:0,
          cmt:null
        }
      )
      next();
    }
    } catch (error) {
      res.status(500).json({isSuccess:false});
    }
    
  };
};

module.exports = {
 
  checkExistAccount,checkExistAccount1,checkExistUserRecipe, checkExistRecipe
};
