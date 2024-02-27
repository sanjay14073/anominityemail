const express=require('express')
const complaintController=require('./controllers/complaintconroller');
const mongoose=require('mongoose')
const app=express();
require('dotenv').config()

const url="mongodb://localhost:27017/complaints";
mongoose.connect(url).then(()=>{console.log("successfully connected to mongoDB")}).catch((err)=>{console.log(err)})
app.use(express.json());
app.use('/',complaintController);
const PORT=process.env.PORT||3000
app.listen(PORT,(req,res)=>{
    console.log(`server started on port ${PORT}`)
})
