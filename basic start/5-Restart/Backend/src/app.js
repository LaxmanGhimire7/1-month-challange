// to create and config

const express = require("express");
const app = express();
const userModel = require("./model/user.model")

//middleware
app.use(express.json())

//POST
app.post("/api/register", async(req, res) => {
  const{userName, email, country, age} = req.body;
  const user =await userModel.create({userName, email, country, age})

  res.status(201).json({
    message: "User registered successfully",
    user
  })
})

//GET
app.get("/api/user",async(req,res)=>{
   const user = await userModel.find();
   res.status(200).json({
    message: "User fetched successfully",
    user
   })
})


//Delete -> req.parama.id
app.delete("/api/delete/:id",async(req,res)=>{
    const id = req.params.id;
    console.log(id)
    await userModel.findByIdAndDelete(id)
    res.status(200).json({
        message: "User deleted successfully"
    })
})

//update -> req.params.id = req.body;
app.patch("/api/update/:id",async(req,res)=>{
    const id = req.params.id;
    const {age,country  } = req.body;
    await userModel.findByIdAndUpdate(id,{age,country})
    res.status(200).json({
        message:"User Updated Successfully...",
    })
})


module.exports = app;