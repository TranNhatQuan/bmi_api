const { Account } = require("../../models");
const { QueryTypes } = require("sequelize");

const authorize = (arrType) => async (req, res, next) => {
    try {
        const { mail } = req;
        const account = await Account.findOne({
            where: {
                mail
            }
        })
        if (arrType.findIndex((ele) => ele === account.role > -1)) {
            next();
            
        } else {
            res.status(403).json({ message: "Bạn không có quyền sử dụng chức năng này!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Sth wrong!" });
    }

};

module.exports = {
    authorize,
}