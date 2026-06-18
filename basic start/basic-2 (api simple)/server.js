const express = require("express");
const app = express();
app.use(express.json())

const user = [];

app.post("/user",(req,res)=>{
    const {name, age} = req.body;
    console.log(req.body)
})



app.listen(3000,()=>{
    console.log("Server is running on port 3000...")
})