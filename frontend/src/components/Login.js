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
      window.localStorage.setItem('cooldownUser', JSON.stringify(user))
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
      <div className=" bg-gradient-to-tl from-teal-100 to-white shadow-2xl p-4 w-[90%] h-[50%] mx-auto mt-[50%] rounded-2xl flex flex-col">
        <h1 className="text-2xl px-4 py-2 font-semibold">{signup ? 'Sign Up' : 'Login'}</h1>
        
        <div className="flex px-4 mx-2 flex-col text-lg text-left">
          <label className="text-md font-semibold px-2">Username:</label>
          <input 
            className="bg-transparent py-2 px-2  mb-2 border-2 border-teal-800 rounded-lg focus:bg-teal-100"
            value={username}
            name='username'
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          
          { signup ? 
            <>
              <label className="text-md font-semibold px-2">Email:</label>
              <input
              className="bg-transparent py-2 px-2 border-2 border-teal-800 rounded-lg focus:bg-teal-100"
              name="password"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              ></input>
            </>
          : <></>}
          <label className="text-md font-semibold px-2">Password:</label>
          <input
            className="bg-transparent py-2 px-2 border-2 border-teal-800 rounded-lg focus:bg-teal-100"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
          <button className="bg-teal-600 rounded-lg p-2 my-4 w-full shadow-2xl border-b-4 hover:to-teal-800 hover:from-teal-600 border-b-teal-900 text-teal-50  hover:bg-teal-700 border-teal-900 active:shadow-lg active:bg-teal-900  font-semibold text-xl tracking-widest uppercase focus"
          onClick={signup ? handleSignup : handleLogin}>
            {signup ? 'sign up' : 'log in'}
          </button>
        </div>
        
        <div className="mt-2 mx-auto">
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
