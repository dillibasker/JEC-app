const express=require("express")
const student=require("../Models/student")
const router=express.Router()
router.post("/student",async(req,res)=>{
    try{
        const {studentId,rollNumber,studentName,status,timestamp}=req.body;
        const newStudent=new student({
            studentId,
            rollNumber,
            studentName,
            status,
            timestamp,
        });
        await newStudent.save();
        res.status(201).json({Message:"Student Added Successfully"});
    }
    catch(err){
        req.status(500).json({Message:"Failed to add Student"})
    }
})

router.get("/students",async(req,res)=>{
    try{
        const students=await student.find();
        res.json(students)
    }
    catch(err){
        res.status(500).json({Message:"Failed to fetch Students"})
    }
})
module.exports=router