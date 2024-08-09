const express=require(`express`);
const app=express();
const mongoose=require(`mongoose`);
app.use(express.json())
require("dotenv").config()
const port=process.env.port

const router=require("./router/userRouter")
app.use(router)

mongoose.connect(process.env.db).then(()=>{
    app.listen(port,()=>{
        console.log(`App is running on port:${port}`)
    })
    console.log(`Connection to MongoDB established successfully.`)})
    .catch((error)=>{
    console.log(`Unable to connect to MongoDB because: ${error}`);
    })