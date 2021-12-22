const jwt = require("jsonwebtoken");

const {User} = require("../models/tables");
const { sendEmail } = require("../utils/mailer");


exports.getAccounts = async (req, res, next) => {
    const page = +req.query.page || 1;
    const accPerPage = 2;

    try {
        const numberOfaccounts = await User.findAndCountAll().then(result => result.count);

        const accounts = await User.findAndCountAll({ limit: accPerPage, offset: (page - 1) * accPerPage});
        res.status(200).json({accounts, currentPage: page,
            nextPage: page + 1,
            previousPage: page - 1,
            hasPreviousPage: page > 1,
            hasNextPage: accPerPage * page < numberOfaccounts,
            lastPage: Math.ceil(numberOfaccounts / accPerPage)});

    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.handleLogin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await (await User.findOne({
            where: {email: req.body.email}
        }));
        if (!user) {
            const error = new Error("کاربری با این ایمیل یافت نشد");
            error.statusCode = 404;
            throw error;
        }

        if (password === user.password) {
            const token = jwt.sign(
                {
                     user: user.email
                },
                process.env.JWT_SECRET
            );
            res.status(200).json({ token, email: user.email });
        } else {
            const error = new Error("آدرس ایمیل یا کلمه عبور اشتباه است");
            error.statusCode = 422;
            throw error;
        }
    } catch (err) {
        next(err);
    }
};

exports.createUser = async (req, res, next) => {
    try {
        // await User.validate(req.body);
        const { fullname, email, password } = req.body;

        const user = await User.findOne({ where: {email: req.body.email}});
        if (user) {
            const error = new Error(
                "کاربری با این ایمیل در پایگاه داده موجود است"
            );
            error.statusCode = 422;
            throw error;
        } else {
            await User.create({ fullname, email, password });
            res.status(201).json({ message: "عضویت موفقیت آمیز بود" });
        }
    } catch (err) {
        next(err);
    }
};

exports.handleForgetPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({where: {email: req.body.email}});

        if (!user) {
            const error = new Error("کاربری با ایمیل در پایگاه داده ثبت نشده");
            error.statusCode = 404;
            throw error;
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        const resetLink = `http://localhost:3000/users/reset-password/${token}`;

        sendEmail(
            user.email,
            user.fullname,
            "فراموشی رمز عبور",
            `
        جهت تغییر رمز عبور فعلی رو لینک زیر کلیک کنید
        <a href="${resetLink}">لینک تغییر رمز عبور</a>
    `
        );
        

        res.status(200).json({
            message: "لینک ریست کلمه عبور با موفقیت ارسال شد",
            resetLink,
        });
    } catch (err) {
        next(err);
    }
};

exports.handleResetPassword = async (req, res, next) => {
    const token = req.params.token;
    const { password, confirmPassword } = req.body;

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            const error = new Error("شما مجوز این عملیات را ندارید");
            error.statusCode = 401;
            throw error;

        }

        if (password !== confirmPassword) {
            const error = new Error("کلمه های عبور یکسان نمی باشند");
            error.statusCode = 422;
            throw error;
        }

        const user = await User.findOne({where: {email: decodedToken.email}});

        if (!user) {
            const error = new Error(
                "کاربری با این شناسه در پایگاه داده یافت نشد"
            );
            error.statusCode = 404;
            throw error;
        }

        user.password = password;
        await user.save();

        res.status(200).json({ message: "عملیات با موفقیت انجام شد" });
    } catch (err) {
        next(err);
    }
};

exports.editUser = async (req, res, next) => {
    try {
        const user = await User.findOne({where: { id: req.params.id }});
        if(!user) {
            const error = new Error("کاربری وجود ندارد.");
            error.statusCode = 422;
            throw error;
        }
        else {
            const {fullname, email } = req.body;
            user.fullname = fullname;
            user.email = email;            
            await user.save();
            res.status(200).json({fullname, email, message:"اطلاعات کاربر با موفقیت تغییر کرد." });
        }
    } catch (err) {
        next(err)
    }
   }

exports.deleteUser = async(req, res, next) => {
    try {
        const user = await User.findOne({where: {email: req.body.email}});
        if (!user) {
            const error = new Error("کاربری با این ایمیل یافت نشد");
            error.statusCode = 404;
            throw error;
        }
            else{
                user.destroy();
                res.status(200).json({user, message: "کاربر با موفقیت حذف شد."})
            }    
        }
    catch (err) {
        next(err); }
}
