const { Account, User, User_history } = require("../models");
const moment = require('moment'); // require

const { QueryTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const createAccountForCustomer = async (req, res) => {
    const { mail, password, name, gender, height, weight } = req.body;
    try {
        //tạo ra một chuỗi ngẫu nhiên
        const salt = bcrypt.genSaltSync(10);
        //mã hoá salt + password
        const hashPassword = bcrypt.hashSync(password, salt);
        const newAccount = await Account.create({
            mail,
            role: 0,
            password: hashPassword,
        });
        const newCustomer = await User.create({
            idAcc: newAccount.idAcc,
            name,
            mail,
            gender,
            height,
            weight,
        });
        const newHistory = await User_history.create({
            idUser: newCustomer.idUser,
            date: moment().format("YYYY-MM-DD"),
            weight: newCustomer.weight,
            water: 0,
            calories_in: 0,
            calories_out: 0,
        });

        res.status(200).json({
            message: "Tạo tài khoản thành công!",
        });

    } catch (error) {
        res.status(500).json({
            message: "Thao tác thất bại!",
        });
    }
};
//tam thoi chua co

const loginAdmin = async (req, res) => {

};

const login = async (req, res) => {
    const { mail, password } = req.body;
    const account = await Account.findOne({
        where: {
            mail,
        },
    });
    const isAuth = bcrypt.compareSync(password, account.password);
    if (isAuth) {
        const customer = await User.findOne({
            where: {
                idAcc: account.idAcc,
            },
        });
        const token = jwt.sign({ mail: account.mail }, "hehehe", {
            expiresIn: 60 * 60 * 60,
        });
        res
            .status(200)
            .json({
                message: "Đăng nhập thành công!",
                token,

                expireTime: 60 * 60 * 60,
            });
    } else {
        res.status(400).json({ message: "Sai thông tin đăng nhập!" });
    }
};

const changePassword = async (req, res) => {
    const { oldPassword, newPassword, repeatPassword } = req.body;
    console.log("test")
    console.log(req.mail)
    try {
        const accountUpdate = await Account.findOne({
            where: {
                mail: req.mail,
            },
        });
        const isAuth = bcrypt.compareSync(oldPassword, accountUpdate.password);
        if (isAuth) {
            if (newPassword == repeatPassword) {
                if (newPassword == oldPassword) {
                    res.status(400).json({
                        message: "Mật khẩu mới không được giống với mật khẩu cũ!",
                    });
                } else {
                    //tạo ra một chuỗi ngẫu nhiên
                    const salt = bcrypt.genSaltSync(10);
                    //mã hoá salt + password
                    const hashPassword = bcrypt.hashSync(newPassword, salt);

                    accountUpdate.password = hashPassword;
                    await accountUpdate.save();
                    res.status(200).json({
                        message: "Đổi mật khẩu thành công!",
                    });
                }
            } else {
                res.status(400).json({
                    message: "Mật khẩu lặp lại không đúng!",
                });
            }
        } else {
            res.status(400).json({
                message: "Mật khẩu không chính xác!",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Thao tác thất bại!",
        });
    }
};

const logout = async (req, res, next) => {
    res.removeHeader("access_token");
    res.status(200).json({ message: "Đăng xuất thành công!" });
};

const forgotPassword = async (req, res) => {
    const { mail } = req.body;
    try {
        const randomID = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
        const isExist = await Account.findOne({
            where: {
                forgot: randomID,
            },
        });
        if (isExist !== null) {
            res.status(400).json({
                message: `Có lỗi xảy ra vui lòng thử lại!`,
            });
        } else {

            await Account.sequelize.query(
                "UPDATE accounts SET forgot = :randomID WHERE mail = :mail",
                {
                    type: QueryTypes.UPDATE,
                    replacements: {
                        randomID: randomID,
                        mail: mail,
                    },
                }
            );
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "n19dccn107@student.ptithcm.edu.vn", // generated ethereal user
                    pass: "bqztpfkmmbpzmdxl", // generated ethereal password
                },
            });
            // send mail with defined transport object
            await transporter.sendMail({
                from: "n19dccn107@student.ptithcm.edu.vn", // sender address
                to: `${mail}`, // list of receivers
                subject: "FORGOT PASSWORD", // Subject line
                text: "FORGOT PASSWORD", // plain text body
                html: `Mã xác nhận của bạn là: ${randomID}`, // html body
            });

            res.status(200).json({
                message: `Mã xác minh đã được gửi về email: ${mail} vui lòng kiểm tra hòm thư!`,
            });
        }
    } catch (error) {
        console.log(error);
    }
};

// const forgotPassword = async (req, res, next) => {
//   const { username } = req.body;
//   const randomID = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
//   try {
//     const account = await Account.sequelize.query(
//       "SELECT CU.email FROM customers as CU, accounts as A WHERE A.id_account = CU.id_account AND A.username = :username",
//       {
//         type: QueryTypes.SELECT,
//         replacements: {
//           username: username,
//         },
//       }
//     );
//     if (account) {
//       await Account.sequelize.query(
//         "UPDATE account SET forgot = :randomID WHERE username = :username",
//         {
//           type: QueryTypes.UPDATE,
//           replacements: {
//             randomID: randomID,
//             username: username,
//           },
//         }
//       );

//       let transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//           user: "n19dccn107@student.ptithcm.edu.vn", // generated ethereal user
//           pass: "bqztpfkmmbpzmdxl", // generated ethereal password
//         },
//       });
//       // send mail with defined transport object
//       let info = await transporter.jsonMail({
//         from: "n19dccn107@student.ptithcm.edu.vn", // sender address
//         to: `${account[0].email}`, // list of receivers
//         subject: "FORGOT PASSWORD", // Subject line
//         text: "FORGOT PASSWORD", // plain text body
//         html: `Mã xác nhận của bạn là: ${randomID}`, // html body
//       });
//       var s2 = account[0].email
//       var s1 = s2.substring(0, s2.length - 15)
//       var s3 = s2.substring(s2.length - 15, s2.length)
//       var email = s1+s3.replace(/\S/gi, '*');
//       res.status(200).json({
//         message: `Mã xác minh đã được gửi về email: ${email} vui lòng kiểm tra hòm thư!`,
//       });
//     } else {
//       res.status(201).json({
//         message: `Không tìm thấy username!`,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

const verify = async (req, res, next) => {
    const { verifyID, mail } = req.body;
    const account = await Account.findOne({
        where: {
            forgot: verifyID,
            mail
        },
        raw: true,
    });
    if (account) {
        res.status(200).json({
            message: `Mã xác nhận chính xác!`,
            isSuccess: true
        });
    } else {
        res.status(400).json({
            message: `Mã xác nhận không chính xác!`,
            isSuccess: false
        });
    }
};

const accessForgotPassword = async (req, res, next) => {
    const { mail, password, repeatPassword } = req.body;
    if (password != repeatPassword) {
        res.status(400).json({
            message: `Mật khẩu lặp lại không chính xác!`,
        });
    } else {
        const salt = bcrypt.genSaltSync(10);
        //mã hoá salt + password
        const hashPassword = bcrypt.hashSync(password, salt);
        try {
            const accountUpdate = await Account.findOne({
                where: {
                    mail,
                },
            });
            accountUpdate.password = hashPassword;
            accountUpdate.forgot = 0;

            await accountUpdate.save();
            res.status(200).json({
                message: `Lấy lại mật khẩu thành công!`,
            });
        } catch (error) {
            res.status(500).json({
                message: `Lấy lại mật khẩu thất bại!`,
            });
        }
    }
};


// const information = async (req, res) => {
//   const { username } = req;
//   const infors = await Account.sequelize.query(
//     "SELECT NV.*, PQ.tenQuyen FROM taikhoans as TK, nhanviens as NV, phanquyens as PQ WHERE TK.maNV = NV.maNV AND NV.maQuyen = PQ.maQuyen AND TK.username = :username",
//     {
//       type: QueryTypes.SELECT,
//       replacements: {
//         username: username,
//       },
//     }
//   );
//   res.status(200).json("infor", {
//     infors: infors[0],
//   });
// };

module.exports = {
    // getDetailTaiKhoan,
    login, logout, createAccountForCustomer, changePassword, forgotPassword, loginAdmin, verify, accessForgotPassword
};