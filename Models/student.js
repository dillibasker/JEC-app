const mongoose=require("mongoose")

const studenSchema= new mongoose.Schema({
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true }, // Student Reference
      rollNumber: { type: String, required: true }, // Student Roll Number
      studentName: { type: String, required: true }, // Student Name
      status: { type: String, enum: ["Present", "Absent", "Late"], required: true }, // Attendance Status
      timestamp: { type: Date, default: Date.now },
})

const studentModel=mongoose.model("studentdetail",studenSchema)