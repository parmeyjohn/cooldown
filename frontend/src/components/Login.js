import { useState, useEffect, useContext } from "react";

import loginService from "../services/login";
import { UserContext } from "../contexts/UserContext";

import { useNavigate } from "react-router-dom";

const Login = ({}) => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(username, password)
    try {
      const loggedInUser = await loginService.login({
        username,
        password,
      });
      setUser(loggedInUser);
      console.log(loggedInUser)
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (exception) {
      //error msg
      console.log("error logging in");
    }
  };

  return (
    <div className="bg-gradient-to-t from-teal-900 to-green-400 h-screen w-screen overflow-y-auto text-teal-900">
      <div className=" bg-gradient-to-tl from-teal-100 to-white shadow-2xl p-4 w-[90%] h-[50%] mx-auto mt-[50%] rounded-2xl flex flex-col">
        <h1 className="text-2xl px-4 py-2 font-semibold">Login</h1>
        <div className="flex px-4 mx-2 flex-col text-lg text-left">
          <label className="text-md font-semibold px-2">Email:</label>
          <input 
            className="bg-transparent py-2 px-2  mb-2 border-2 border-teal-800 rounded-lg focus:bg-teal-100"
            value={username}
            name='username'
            onChange={(e) => setUsername(e.target.value)}
          ></input>

          <label className="text-md font-semibold px-2">Password:</label>
          <input
            className="bg-transparent py-2 px-2 border-2 border-teal-800 rounded-lg focus:bg-teal-100"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
          <button className="bg-teal-600 rounded-lg p-2 my-4 w-full shadow-2xl border-b-4 hover:to-teal-800 hover:from-teal-600 border-b-teal-900 text-teal-50  hover:bg-teal-700 border-teal-900 active:shadow-lg active:bg-teal-900  font-semibold text-xl tracking-widest uppercase focus"
          onClick={handleLogin}>
            Sign in
          </button>
        </div>
        <div className="mt-2 mx-auto">
          <p>Not a user yet?</p>
          <button 
            className="px-4 py-2 m-2 bg-teal-200 rounded-lg border-b-2 border-teal-500"
            >
            sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
