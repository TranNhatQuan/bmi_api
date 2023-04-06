const { Account } = require("../../models");
const { QueryTypes } = require("sequelize");

const authorize = (arrType) => async (req, res, next) => {
    const { mail } = req;
    const account = await Account.findOne({
            where:{
                mail
            }
        })
        if(arrType.findIndex((ele) => ele === account.role > -1)) {
            next();
    }else {
        res.status(403).json({message: "Bạn không có quyền sử dụng chức năng này!" });
    }
};

module.exports = {
    authorize,
}