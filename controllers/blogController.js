// const { Task } = require("../models/tables");
// exports.handleSearch = async (req, res, next) => {
//     const page = +req.query.page || 1;
//     const taskPerPage = 1;

//     try {
//         const numberOftasks = await Task.findAndCountAll({
//             $text: {$search: req.body.query},
//         }).then(result => result.count);
//         console.log(numberOftasks);

//         const tasks = await Task.findAndCountAll({ 
//             $text: {$search: req.query}, 
//          });
            
//         res.status(200).json({tasks, currentPage: page,
//             nextPage: page + 1,
//             previousPage: page - 1,
//             hasPreviousPage: page > 1,
//             hasNextPage: taskPerPage * page < numberOftasks,
//             lastPage: Math.ceil(numberOftasks / taskPerPage)});

//     }   catch (err) {
//         next(err);
//     }
// }
