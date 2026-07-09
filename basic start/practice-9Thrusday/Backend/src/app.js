const express = require("express");
const app = express();
const productModel = require("./model/product.model");
const cors = require("cors")

app.use(cors())

//Middleware
app.use(express.json());


//POST
app.post("/api/product/create",async(req,res)=>{
  const {productName, price, image, description} = req.body;
  const product = await productModel.create({productName, price, image, description});
  res.status(201).json({
     message:"Product created successfully...",
     product
  })
})


//GET
app.get("/api/product",async(req,res)=>{
    const product = await productModel.find();
    res.status(200).json({
        message:"Products fetched successfully...",
        product
    })
})

//DELETE -> params.id
app.delete("/api/product/delete/:id",async(req,res)=>{
    const id = req.params.id;
    await productModel.findByIdAndDelete(id);
    res.status(200).json({
        message:"Product deleted successfully..."
    })
})

//Update
app.patch("/api/product/update/:id",async(req,res)=>{
    const id = req.params.id;
    const {productName, price} = req.body;
    await productModel.findByIdAndUpdate(id,{productName, price});
    res.status(200).json({
        message:"Product updated successfully..."
    })
})


module.exports = app;