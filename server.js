const express=require("express")
const dotenv=require("dotenv")
const cors=require("cors")
const { default: mongoose } = require("mongoose")

const app=express()
app.use(express.json())
app.use(cors())
dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(()=> console.log("Mongo DB is connect")).catch((err) => console.log("Mongo db is not connected",(err)))

app.use("/api/student", require("./Routes/studentRoutes"));
app.use("/api/register", require("./Routes/auth/registerRoutes"));
app.use("/api/login", require("./Routes/auth/loginRoutes"));

const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{ console.log(`server running on port ${PORT}`)})