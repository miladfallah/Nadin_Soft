const {Task} = require('../models/tables');
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
    