 const express = require('express')
 const usercontroller=require('../Controller/usercontroller')
const projectController = require('../Controller/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')


 const router = new express.Router()

 //register
 router.post('/register',usercontroller.register)
 //login
 router.post('/login',usercontroller.login)
//addProject
router.post('/add-project',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)
//getallprojects
router.get('/all-projects',jwtMiddleware,projectController.getAllProjects)
//getuserprojects
router.get('/user-projects',jwtMiddleware,projectController.getUserProjects)
//gethomeprojects
router.get('/home-projects',projectController.getHomeProjects)
//edit project
router.put('/edit-project/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.editProject)
//remove project
router.delete('/remove-project/:pid',jwtMiddleware,projectController.removeproject)
//edit user
router.put('/edit-user',jwtMiddleware,multerConfig.single("profileImage"),usercontroller.editUser)


 //export router
 module.exports=router