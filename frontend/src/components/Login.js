import { useState, useEffect, useContext } from "react";

import { ReactComponent as Logo } from "../assets/logo_v4.svg";
import { ReactComponent as ClosedEyeIcon } from "../assets/heroicons/closed-eye.svg";
import { ReactComponent as OpenEyeIcon } from "../assets/heroicons/open-eye.svg";
import { ReactComponent as CheckmarkIcon } from "../assets/heroicons/checkmark.svg";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

import loginService from "../services/login";
import journalService from "../services/journals";
import entryService from "../services/entries";
import userService from "../services/users";
import BetaAlert from "./BetaAlert";

const Login = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [isSignup, setIsSignUp] = useState(false);
  const [trustedDevice, setTrustedDevice] = useState(false);

  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passErrorMsg, setPassErrorMsg] = useState("");

  const demoEmail = "teeeeeestuser@gmail.com";
  const demoPass = "password";

  /* send login POST request to server, set access tokens for services,
   and handle local storage of user object */
  const handleLogin = async (e, email, password, isSignup) => {
    e.preventDefault();
    await checkPassword(password);
    await checkEmail(email);
    if (emailErrorMsg || passErrorMsg) {
      return;
    }
    try {
      if (isSignup) {
        await userService.create({
          email,
          password,
        });
      }
      const loggedInUser = await loginService.login({
        email,
        password,
      });
      if (trustedDevice) {
        window.localStorage.setItem(
          "cooldownUser",
          JSON.stringify(loggedInUser)
        );
      }
      journalService.setToken(loggedInUser.token);
      entryService.setToken(loggedInUser.token);
      setUser((prevUser) => {
        return loggedInUser;
      });
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  /* validates email input */
  const checkEmail = async (email) => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(emailRegex)) {
      setEmailErrorMsg("Please provide a standard email");
    } else {
      setEmailErrorMsg("");
    }
  };

  /* validates password input */
  const checkPassword = async (password) => {
    if (password.length < 6) {
      setPassErrorMsg("Please provide a valid password of 6+ chars");
    } else {
      setPassErrorMsg("");
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleLogin(e, email, password, isSignup);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center overflow-y-auto bg-gradient-to-b from-teal-900 to-slate-800 text-teal-900">
      <BetaAlert></BetaAlert>
      <div className="mb-10 mr-4 flex items-center justify-start stroke-slate-800 stroke-2 text-4xl font-semibold text-teal-100 md:text-5xl">
        <Logo className="h-12 w-12 md:h-16 md:w-16"></Logo>
        <div className="title">Cooldown</div>
      </div>
      <div className="mx-auto flex h-auto w-[80%] max-w-sm flex-col rounded-2xl bg-gradient-to-tl from-teal-100 to-white p-4 shadow-2xl transition-all duration-300 ease-in-out">
        <h1 className="mx-2 px-4 py-4 text-2xl font-semibold">
          {isSignup ? "Sign up" : "Log in"}
        </h1>
        <div className="mx-2 flex flex-col px-4 text-left text-lg">
          <label htmlFor="email" className="text-md mb-1 font-semibold">
            Email:
          </label>
          <input
            id="email"
            className={`mb-1 w-full rounded-lg bg-slate-300 p-2 shadow-inner shadow-slate-400 transition duration-300 ease-in-out focus:bg-teal-50 focus:shadow-none focus:outline-offset-1 focus:outline-teal-700 ${
              emailErrorMsg
                ? "shadow-none outline outline-red-400 focus:outline-none"
                : ""
            }`}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="off"
            onKeyDown={handleEnter}
            onBlur={() => setEmailErrorMsg("")}
          ></input>
          {emailErrorMsg ? (
            <p className="text-sm text-red-600">{emailErrorMsg}</p>
          ) : (
            <p className="text-sm text-slate-500">
              Email must follow standard format
            </p>
          )}

          <label htmlFor="password" className="text-md mt-2 mb-1 font-semibold">
            Password:
          </label>
          <div className="relative flex w-full">
            <input
              className={`mb-1 w-full rounded-lg bg-slate-300 p-2 shadow-inner  shadow-slate-400 transition duration-300 ease-in-out focus:bg-teal-50 focus:shadow-none focus:outline-offset-1 focus:outline-teal-700 ${
                passErrorMsg
                  ? "shadow-none outline outline-red-400 focus:outline-none"
                  : ""
              }`}
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="off"
              onKeyDown={handleEnter}
              type={showPassword ? "text" : "password"}
              onBlur={() => setPassErrorMsg("")}
            ></input>
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 z-20 mb-2 mr-2 p-2"
            >
              {showPassword ? (
                <OpenEyeIcon></OpenEyeIcon>
              ) : (
                <ClosedEyeIcon></ClosedEyeIcon>
              )}
            </button>
          </div>
          {passErrorMsg ? (
            <p className="text-sm text-red-600">{passErrorMsg}</p>
          ) : (
            <p className="text-sm text-slate-500">
              Password must be at least 6 characters
            </p>
          )}
          <div className="mt-4 flex items-center justify-start">
            <input
              id="trust_device"
              type="checkbox"
              className="m-2 ml-0 h-6 w-6 cursor-pointer appearance-none rounded-md bg-slate-300 transition duration-300 ease-in-out checked:bg-green-300 checked:shadow-none focus:ring-2 focus:ring-teal-700"
              checked={trustedDevice}
              onChange={() => setTrustedDevice(!trustedDevice)}
            ></input>
            {trustedDevice && <CheckmarkIcon></CheckmarkIcon>}

            <label htmlFor="trust_device" className="m-2 font-medium">
              Trust this device
            </label>
          </div>
          <button
            className="focus my-4 mx-auto w-full rounded-lg border-b-4 border-teal-900 border-b-teal-900 bg-teal-600 p-2 text-xl font-semibold text-teal-50 shadow-2xl  hover:bg-teal-700 hover:from-teal-600 hover:to-teal-800 active:bg-teal-900 active:shadow-lg"
            onClick={(e) => handleLogin(e, email, password, isSignup)}
            id="signup-button"
          >
            {isSignup ? "Sign up" : "Log in"}
          </button>
        </div>

        <div className="mt-2 flex flex-col items-center text-teal-700">
          <p>{isSignup ? "Already have an account?" : "Not a user yet?"}</p>
          <div className="flex">
            <button
              className="m-2 rounded-lg border-b-2 border-teal-600 bg-green-300 px-4 py-2"
              onClick={() => setIsSignUp(!isSignup)}
            >
              {isSignup ? "Log in" : "Sign up"}
            </button>
            <button
              onClick={async (e) => {
                setIsSignUp(false);
                await handleLogin(e, demoEmail, demoPass, false);
              }}
              className="m-2 rounded-lg border-b-2 border-teal-600 bg-green-300 px-4 py-2"
            >
              View demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
