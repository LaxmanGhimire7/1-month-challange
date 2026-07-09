import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [product, setProduct] = useState([]);
  const [form, setForm] = useState({
    userName: "",
    price: "",
    image: "",
    description: "",
  });

  const getProduct = () => {
    axios.get("http://localhost:3000/api/product").then((res) => {
      setProduct(res.data.product);
    });
  };

  useEffect(() => {
    getProduct();
  }, []);

  // const createProduct = () => {
  //   axios.create("http://localhost:3000/api/product/create")
  // };

  // const handleChange = (e) =>{

  // }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleDelete = (idx) => {
    console.log(idx);

    axios.delete("http://localhost:3000/api/product/delete/" + idx)
    .then(res=>{
      getProduct()
    })
    
  };

  return (
    <div className="min-h-screen flex gap-40 bg-black p-6">
      {/* form */}

      <div className="bg-white flex h-fit p-3 w-fit">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-72">
          <input className="border " type="text" name="productName" id="" />
          <input
            className="border"
            type="number"
            name="price"
            id=""
            placeholder="Enter ur price"
          />
          <input
            className="border"
            type="url"
            name="image"
            id=""
            placeholder="Enter image url"
          />
          <input
            className="border"
            type="text"
            name="description"
            id=""
            placeholder="Enter ur description"
          />

          <button className="bg-green-500 active:scale-95">Create</button>
        </form>
      </div>
      {/* card */}
      <div className="bg-white h-fit p-2 w-72 rounded-2xl">
        {product.map((res, idx) => {
          return (
            <div key={idx}>
              <h1>{res.productName}</h1>
              <img src={res.image} alt="" />
              <p>${res.price}</p>
              <p>{res.description}</p>

              {/* Buttons */}
              <button
                className="bg-red-600"
                onClick={() => {
                  handleDelete(res._id);
                }}
              >
                Detele
              </button>
              <button className="bg-blue-600 ml-20">Update</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
