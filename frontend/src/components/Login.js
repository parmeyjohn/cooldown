import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

import loginService from "../services/login";
import journalService from "../services/journals";
import entryService from "../services/entries";
import userService from "../services/users";


const Login = ({}) => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("")
  const [signup, setSignUp] = useState(false)
  
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(username, password)
    try {
      const loggedInUser = await loginService.login({
        username,
        password
      });
      window.localStorage.setItem('cooldownUser', JSON.stringify(loggedInUser))
      journalService.setToken(loggedInUser.token)
      entryService.setToken(loggedInUser.token)
      setUser(loggedInUser);
      console.log(loggedInUser)
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (exception) {
      //error msg
      console.log(exception)
      console.log("error logging in");
      //display here which log in error occurred
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault()
    console.log('signup',email, username, password)
    try {
      const newUser = await userService.create({
        username,
        email,
        password
      });
      console.log(newUser)
      setEmail("")
      handleLogin(e)

    } catch(exception) {
      console.log(exception)
      console.log("error signing up");
    }
    
  }

  return (
    <div className="bg-gradient-to-b from-teal-900 to-slate-800 h-screen w-screen overflow-y-auto text-teal-900">
      <div className=" bg-gradient-to-tl from-teal-100 to-white shadow-2xl p-4 w-[90%] h-min-[50%] mx-auto mt-[50%] rounded-2xl flex flex-col">
        <h1 className="text-2xl px-4 py-2 font-semibold">{signup ? 'Sign Up' : 'Login'}</h1>
        
        <div className="flex px-4 mx-2 flex-col text-lg text-left">
          <label className="text-md font-semibold px-2">Username:</label>
          <input 
            className="bg-slate-300 p-2 mb-2 w-full shadow-inner shadow-slate-400  outline-8 focus:outline-offset-1 focus:outline-teal-700 focus:bg-teal-50 focus:shadow-none rounded-lg transition ease-in-out duration-300"
            value={username}
            name='username'
            onChange={(e) => setUsername(e.target.value)}
            autoFocus={true}
            autoComplete="off"
          ></input>
          
          { signup ? 
            <>
              <label className="text-md font-semibold px-2">Email:</label>
              <input
              className="bg-slate-300 p-2 mb-2 w-full shadow-inner shadow-slate-400  outline-8 focus:outline-offset-1 focus:outline-teal-700 focus:bg-teal-50 focus:shadow-none rounded-lg transition ease-in-out duration-300"
              name="password"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoComplete="off"
              ></input>
            </>
          : <></>}
          <label className="text-md font-semibold px-2">Password:</label>
          <input
            className="bg-slate-300 p-2 mb-2 w-full shadow-inner shadow-slate-400  outline-8 focus:outline-offset-1 focus:outline-teal-700 focus:bg-teal-50 focus:shadow-none rounded-lg transition ease-in-out duration-300"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="off"
          ></input>
          {signup ?
            <button className="bg-teal-600 rounded-lg p-2 my-4 mx-auto w-full shadow-2xl border-b-4 hover:to-teal-800 hover:from-teal-600 border-b-teal-900 text-teal-50  hover:bg-teal-700 border-teal-900 active:shadow-lg active:bg-teal-900  font-semibold text-xl tracking-widest uppercase focus"
              onClick={handleSignup}>
              sign up
            </button>
          : 
            <button className="bg-teal-600 rounded-lg p-2 my-4 mx-auto w-full shadow-2xl border-b-4 hover:to-teal-800 hover:from-teal-600 border-b-teal-900 text-teal-50  hover:bg-teal-700 border-teal-900 active:shadow-lg active:bg-teal-900  font-semibold text-xl tracking-widest uppercase focus"
              onClick={handleLogin}>
              log in
            </button>
          }
        </div>
        
        <div className="flex flex-col items-center mt-2">
          <p>{signup ? 'Already have an account?' : 'Not a user yet?'}</p>
          <button 
            className="px-4 py-2 m-2 bg-teal-200 rounded-lg border-b-2 border-teal-500"
            onClick={() => setSignUp(!signup)}
            >
            {signup ? 'log in':'sign up' }
          </button>
        </div>

        
      </div>
    </div>
  );
};

export default Login;
