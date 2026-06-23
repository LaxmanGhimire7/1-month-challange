import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const App = () => {
  const [user, setuser] = useState([]);

  const getUser = () => {
    axios.get("http://localhost:3000/api/user").then((res) => {
      setuser(res.data.user);
    });
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { userName, photo, age, email, country } = e.target.elements;
    console.log(userName.value);
    axios
      .post("http://localhost:3000/api/register", {
        userName: userName.value,
        email: email.value,
        age: age.value,
        photo: photo.value,
        country: country.value,
      })
      .then((res) => {
        getUser();
      });
  };

  const handleDelete = (userId) =>{
   console.log(userId)
   axios.delete("http://localhost:3000/api/user/"+userId)
   .then(res=>{
      getUser()
   })
  }

  return (
    <div className="min-h-screen p-4 flex gap-20">
      <div className="p-3  h-fit bg-amber-50 rounded-xl">
        <form onSubmit={handleSubmit} className=" flex flex-col w-72 gap-1">
          <input
            className="border p-2 rounded-sm"
            type="text"
            name="userName"
            placeholder="Enter your name"
          />
          <input
            className="border p-2 rounded-sm"
            type="age"
            name="age"
            placeholder="Enter your age"
          />
          <input
            className="border p-2 rounded-sm"
            type="url"
            name="photo"
            id=""
            placeholder="Enter your photo url"
          />
          <input
            className="border p-2 rounded-sm"
            type="email"
            name="email"
            placeholder="Enter your email"
          />
          <input
            className="border p-2 rounded-sm"
            type="text"
            name="country"
            placeholder="Enter your country"
          />

          <div className="flex justify-center gap-3 text-white font-medium mt-2">
            <button className="bg-emerald-600 p-2 w-full rounded-sm">
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="flex gap-5">
        {user.map((users) => {
          return (
            <div className="h-96 w-72 rounded-xl bg-emerald-400 ">
              <div className="p-3 ">
                <img
                  className="h-52 w-full object-top object-cover rounded-xl "
                  src={users.photo}
                  alt=""
                />
              </div>
              <div className="p-4 -mt-3">
                <h2>
                  {users.userName} <span>{users.age}</span>
                </h2>
                <p>{users.email}</p>
                <p>{users.country}</p>
              </div>
              <div className="flex gap-2 justify-center">
                <button className="bg-yellow-400 p-2 w-32 rounded-sm">
                  Update
                </button>
                <button onClick={()=>{
                  handleDelete(users._id)
                }} className="bg-red-500 p-2 w-32 rounded-sm">
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
