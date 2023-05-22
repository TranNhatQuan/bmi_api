const { Account } = require("../../models");
const { QueryTypes } = require("sequelize");

const authorize = (role) => async (req, res, next) => {
    try {
        const { mail } = req;
        const account = await Account.findOne({
            where: {
                mail
            }
        })
        if (account.dataValues.role===role) {
            next();
            
        } else {
           return  res.status(403).json({ message: "Bạn không có quyền sử dụng chức năng này!" });
        }
    } catch (error) {
       return  res.status(500).json({ message: "Sth wrong!" });
    }

};

module.exports = {
    authorize,
}