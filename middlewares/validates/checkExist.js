

const checkExistAccount = (Model) => {
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


module.exports = {
 
  checkExistAccount,checkExistAccount1
};
