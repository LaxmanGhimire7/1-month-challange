import React from "react";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [user, setuser] = useState([]);

  axios.get("http://localhost:3000/api/user")
  .then(res=>{
    setuser(res.data.user)
  })

  return (
    <div className="min-h-screen p-3">
      <div className="h-96 w-72 rounded-xl bg-emerald-400 ">
        {user.map((users) => {
          return (
            <div className="">
              <div className="p-3 ">
              <img className="h-52 w-full object-cover rounded-xl " src={users.photo} alt="" />
              </div>
              <div>
                <h2>{users.userName}  <span>{users.age}</span></h2>
                <p>{users.email}</p>
                <p>{users.country}</p>
              </div>

            </div>
          )
        })}
      </div>
    </div>
  );
};

export default App;
