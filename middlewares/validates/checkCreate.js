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
      res.status(400).json({ message: "Tài khoản đã tồn tại!" });
    }
  };
};



module.exports = {
  checkCreateAccount,
  
};
