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



module.exports = {
  checkCreateAccount,
  
};
