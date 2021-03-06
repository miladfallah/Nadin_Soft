const {Task} = require('../models/tables');
const multer = require("multer");
const sharp = require("sharp");
const shortId = require("shortid");
const { fileFilter } = require("../utils/multer");


exports.createTask = async (req, res, next) => {
 try {
const {name, priority} = req.body;
 await Task.create({ name, priority });
    res.status(201).json({ message: "تسک با موفقیت ساخته شد." });
} catch (err) {
     console.log(err);
      next(err);
     }
 };  

 exports.editTask = async (req, res, next) => {
     try {
         const task = await Task.findOne({where: { id: req.params.id }});
         if(!task) {
             const error = new Error("تسکی وجود ندارد.");
             error.statusCode = 422;
             throw error;
         }
         else {
             const {name, priority} = req.body;
             task.name = name;
             task.priority = priority;
             await task.save();
             res.status(200).json({name, priority, message:"نام و اولویت تسک با موفقیت تغییر کرد." });
         }
     } catch (err) {
         next(err)
     }
    }
    

    exports.getTasks = async (req, res, next) => {
        const page = +req.query.page || 1;
        const taskPerPage = 2;
    
        try {
            const numberOftasks = await Task.findAndCountAll().then(result => result.count);
    
            const tasks = await Task.findAndCountAll({ limit: taskPerPage, offset: (page - 1) * taskPerPage});
            res.status(200).json({tasks, currentPage: page,
                nextPage: page + 1,
                previousPage: page - 1,
                hasPreviousPage: page > 1,
                hasNextPage: taskPerPage * page < numberOftasks,
                lastPage: Math.ceil(numberOftasks / taskPerPage)});
    
        } catch (err) {
            console.log(err);
            next(err);
        }
    };

    exports.deleteTask = async(req, res, next) => {
        try {
            const task = await Task.findOne({where: {id: req.body.id}});
            if (!task) {
                const error = new Error("هیچ تسکی با این ایدی یافت نشد.");
                error.statusCode = 404;
                throw error;
            }
                else{
                    task.destroy();
                    res.status(200).json({task, message: "تسک با موفقیت حذف شد."})
                }    
            }
        catch (err) {
            next(err); }
    }

    exports.uploadImage = (req, res, next) => {
        try {
            const upload = multer({
                limits: { fileSize: 4000000 },
                fileFilter: fileFilter,
            }).single("image");
        
            upload(req, res, async (err) => {
                if (err) {
                    if (err.code === "LIMIT_FILE_SIZE") {
                        return res
                            .status(422)
                            .json({error: "حجم عکس ارسالی نباید بیشتر از 4 مگابایت باشد."});
                    }
                    res.status(400).json({error: err});
                } else {
                    if (req.file) {
                        const fileName = `task_${shortId.generate()}_${
                            req.file.originalname
                        }`;
                        await sharp(req.file.buffer)
                            .jpeg({
                                quality: 60,
                            })
                            .toFile(`./public/uploads/${fileName}`)
                            .catch((err) => console.log(err));
                        res.status(200).json( { image: 
                            `http://localhost:3000/uploads/${fileName}` }
                        );
                    } else {
                        res.json({error: "جهت آپلود باید عکسی انتخاب کنید"});
                    }
                }
            });
        } catch (err) {
            next(err);
    };
};
    