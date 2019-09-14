var StudentModel = require("../Models/StudentModel")
var DepartModel = require("../Models/DepartmentModel")
var mongoose = require("mongoose")

function EMData(express){

express.post("/AddStudent",(req,resp)=>{
const{name,age,phone,salary,Department,password} = req.body
var StModel = new StudentModel({
    _id : mongoose.Types.ObjectId(),
    name :name,
    password : password,
    age : age,
    phone : phone,
    salary : salary,
    Department :Department,
   
    
    
})
StModel.save((err,data)=>{
 
    DepartModel.findById({_id:req.body.Department}).exec((err,Departdata) =>{
        debugger
        Departdata.Students.push(StModel._id)
        debugger
        Departdata.save((err,final)=>{
            debugger
         
            err?resp.status(500).json({message:"err"}):resp.status(200).json(final)
    
        })
    })
    
})
   
})



express.get('/GetallStudents',(req,resp)=>{
 StudentModel.find({}).lean().populate("Department").exec((err,alldata)=>{
        err? resp.status(500).json({message : "nodata"}):resp.status(200).json(alldata)
    })
})

express.post('/FindByname',(req,resp)=>{
 StudentModel.find({name:req.body.name},(err,data)=>{
    err ? resp.status(500).json({message : "Not Found"}):resp.status(200).json(data)

})

})
express.post('/FindByid',(req,resp)=>{
 StudentModel.findById({_id: req.body._id },(err,data)=>{
    err ? resp.status(500).json({message : "Not Found"}):resp.status(200).json(data)

})

})
express.post('/RemoveBYid',(req,resp)=>{
 StudentModel.findByIdAndRemove({_id:req.body._id}).lean().exec((err)=>{
    err ? resp.status(500).json({}):resp.status(200).json("removed succesfly")
})})

express.post('/Updata',(req,resp)=>{
    const{name , prop} = req.body
 StudentModel.finOneAndUpdata({name : name},{[prop]:prop},((err,newdata)=>{
        err ? resp.status(500).json({}):resp.status(200).json("updated Successfly" , newdata)
    })
    )})
    express.get('/Rall',(req,resp)=>{
     StudentModel.remove({}).exec((err,data)=>
        err ? resp.status(500).json({A:"ass"}):resp.status(200).json("removed succesfly"))
    })
express.post('/Login',(req,resp)=>{
    debugger
    const{name , password} = req.body
    StudentModel.findOne({name:name , password:password}).exec((err,data)=>{
        if(data){
            debugger
            req.session.Dta = data
            debugger
            resp.json({message:"You r login " , token : req.sessionID})
            debugger
        }

    })
    
})
}
module.exports = EMData;