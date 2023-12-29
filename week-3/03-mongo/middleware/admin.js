// Middleware for handling auth
const {Admin} = require('../db/index');
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    let entry = {
        adminname: req.headers.adminname,
        password: req.headers.password
    }
    
    Admin.findOne(entry)
    .then((document) => {
        if(document == null){
            res.status(401).json({
                mssg:"wrong credentials/user doesnt exist."
            })
            return
        }
        next()
    })
    .catch((err => {
        console.log('trouble retrieving info from the database.');
        console.error(err);
        res.status(500).json({
            mssg:'trouble retrieving info from the database.'
        })
        return
    }))
}

module.exports = adminMiddleware;

// async function adminMiddleware(req, res, next) {
//     // Implement admin auth logic
//     // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
//     let entry = {
//         adminname: req.headers.username,
//         password: req.headers.password
//     }
    
//     try{
//         let adminExists = await Admin.findOne(entry)
//         if(adminExists == null){
//             req.adminExists = false
//             next()
//         }
//         req.adminExists = true
//         next()
//     }
//     catch(err){
//         console.log('trouble retrieving info from the database.');
//         console.error(err);
//         res.status(500).json({
//             mssg:'trouble retrieving info from the database.'
//         })
//         return
//     }
// }


