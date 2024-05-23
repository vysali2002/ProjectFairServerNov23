const projects = require('../Models/projectModel')


//addProject
exports.addProject = async(req,res) =>{
    console.log("Inside Add Projects request");
    console.log(req.payload);
    console.log(req.body);
    console.log(req.file);
    const {title,language,overview,github,website} = req.body
    const userId = req.payload
    const projectImage = req.file.filename
    try{
       const existingProject = await projects.findOne({github})
       if(existingProject){
        res.status(406).json("Project already available in our system , Kindly upload another.")
       }else{
        const newProjects = new projects({
            title,language,overview,github,website,projectImage,userId
        })
        await newProjects.save()
        res.status(200).json(newProjects)
       }
    }catch(err){
        res.status(200).json("Request recieved")


    }

} 

//get all projects
exports.getAllProjects = async (req,res)=>{
    const searchKey = req.query.search
    const query={
        language:{
            $regex:searchKey, $options:'i'
        }
    }

    try{
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    }catch(err){
        res.status(401).json(err)
    }
}
//get userprojects
exports.getUserProjects = async (req,res)=>{
    const userId = req.payload
    try{
        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)
    }catch(err){
        res.status(401).json(err)
    }
}
//get home projects
exports.getHomeProjects = async (req,res)=>{
    try{
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.editProject = async (req,res) =>{
    console.log("Inside edit project");
    const {pid} = req.params
    const userId = req.payload
    const {title,language,overview,github,website,projectImage} = req.body
    const uploadImage = req.file?req.file.filename:projectImage
     try{
       const updatedProject = await projects.findByIdAndUpdate({_id:pid},{
        title,language,overview,github,website,projectImage:uploadImage,userId
       },{new:true})
       await updatedProject.save()
       res.status(200).json(updatedProject)
     }catch(err){
        res.status(401).json(err)
     }
}

exports.removeproject = async(req,res)=>{
    console.log("Inside remove project");
    const {pid} = req.params
    try{
       const projectDetails = await projects.findByIdAndDelete({_id:pid})
       res.status(200).json(projectDetails)
    }catch(err){
        res.status(401).json(err)
    }
}