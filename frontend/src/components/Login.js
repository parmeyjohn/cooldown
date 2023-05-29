import { useState, useEffect, useContext } from "react";
import { ReactComponent as Logo } from "../assets/logo_v4.svg";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [signup, setSignUp] = useState(false);
  const [trustedDevice, setTrustedDevice] = useState(false);

  // TODO: extract into error component
  const [userError, setUserError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  /* send login POST request to server, set access tokens for services,
   and handle local storage of user object */
  const handleLogin = async (e) => {
    e.preventDefault();
    if (userError || emailError || passError) {
      return;
    }
    try {
      const loggedInUser = await loginService.login({
        username,
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
      setUsername("");
      setPassword("");
      navigate("/", { replace: true });
    } catch (exception) {
      setError(true);
      // TODO: add alert component displaying banner on error
    }
  };

  /* validates username input */
  const checkUsername = async (e, username) => {
    if (!e.target?.value || e.target.value.length < 6) {
      setUserError(true);
      setErrorMsg("username must be 6+ chars");
    } else {
      setUserError(false);
      setErrorMsg("");
    }
  };

  /* validates email input */
  const checkEmail = async (e) => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!e.target?.value) {
      setEmailError(true);
      setErrorMsg("email must be provided ");
    } else if (!e.target.value.match(emailRegex)) {
      setEmailError(true);
      setErrorMsg("email needs to follow format");
    } else {
      setEmailError(false);
      setErrorMsg("");
    }
  };

  /* validates password input */
  const checkPassword = async (e) => {
    if (!e.target?.value || e.target.value.length < 6) {
      setPassError(true);
      setErrorMsg("password must be 6+ chars");
    } else {
      setPassError(false);
      setErrorMsg("");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (userError || emailError || passError) {
      return;
    }
    try {
      const newUser = await userService.create({
        username,
        email,
        password,
      });
      setEmail("");
      handleLogin(e);
    } catch (exception) {
      setError(true);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      if (signup) {
        handleSignup(e);
      } else {
        handleLogin(e);
      }
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center overflow-y-auto bg-gradient-to-b from-teal-900 to-slate-800 text-teal-900">
      <BetaAlert></BetaAlert>
      <div className="mb-10 flex items-center justify-start  stroke-slate-800 stroke-2 text-4xl font-semibold text-teal-100 md:text-5xl">
        <Logo className="h-12 w-12 md:h-16 md:w-16"></Logo>
        <div className="title">Cooldown</div>
      </div>
      <div className="mx-auto flex h-auto w-[80%] max-w-sm flex-col rounded-2xl bg-gradient-to-tl from-teal-100 to-white p-4 shadow-2xl transition-all duration-300 ease-in-out">
        <h1 className="mx-2 px-4 py-4 text-2xl font-semibold">
          {signup ? "Sign Up" : "Login"}
        </h1>
        <div className="mx-2 flex flex-col px-4 text-left text-lg">
          <label htmlFor="username" className="text-md mb-1 px-2 font-semibold">
            Username:
          </label>
          <input
            id="username"
            className={`mb-2 w-full rounded-lg bg-slate-300 p-2 shadow-inner  shadow-slate-400 transition duration-300 ease-in-out focus:bg-teal-50 focus:shadow-none focus:outline-offset-1 focus:outline-teal-700 ${
              userError
                ? "shadow-none outline outline-red-400 focus:outline-none"
                : ""
            }`}
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            autoFocus={true}
            autoComplete="off"
            onKeyDown={handleEnter}
            onBlur={(e) => checkUsername(e)}
          ></input>
          {userError ? (
            <p className="my-1 rounded-sm bg-red-200 p-2 text-sm text-red-800">
              Enter a valid username
            </p>
          ) : (
            <></>
          )}

          {signup ? (
            <>
              <label htmlFor="email" className="text-md px-2 font-semibold">
                Email:
              </label>
              <input
                id="email"
                className={`mb-2 w-full rounded-lg bg-slate-300 p-2 shadow-inner  shadow-slate-400 transition duration-300 ease-in-out focus:bg-teal-50 focus:shadow-none focus:outline-offset-1 focus:outline-teal-700 ${
                  emailError
                    ? "shadow-none outline outline-red-400 focus:outline-none"
                    : ""
                }`}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                autoComplete="off"
                onKeyDown={handleEnter}
                onBlur={(e) => checkEmail(e)}
              ></input>
              {emailError ? (
                <p className="my-1 rounded-sm bg-red-200 p-2 text-sm text-red-800">
                  Enter a valid email
                </p>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}

          <label htmlFor="password" className="text-md px-2 font-semibold">
            Password:
          </label>
          <div className="relative flex w-full">
            <input
              className={`mb-2 w-full rounded-lg bg-slate-300 p-2 shadow-inner  shadow-slate-400 transition duration-300 ease-in-out focus:bg-teal-50 focus:shadow-none focus:outline-offset-1 focus:outline-teal-700 ${
                passError
                  ? "shadow-none outline outline-red-400 focus:outline-none"
                  : ""
              }`}
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="off"
              onKeyDown={handleEnter}
              onBlur={(e) => checkPassword(e)}
              type={showPassword ? "text" : "password"}
            ></input>
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 z-20 mb-2 mr-2 p-2"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>

          {passError ? (
            <p className="my-1 rounded-sm bg-red-200 p-2 text-sm text-red-800 accent-black transition-all duration-300 ease-in-out ">
              Enter a valid password
            </p>
          ) : (
            <></>
          )}
          <div className="flex items-center justify-start">
            <input
              id="trust_device"
              type="checkbox"
              className="m-2 ml-0 h-6 w-6 cursor-pointer appearance-none rounded-md bg-slate-300 shadow-inner shadow-slate-400 transition duration-300 ease-in-out checked:bg-green-300 checked:shadow-none focus:ring-2 focus:ring-teal-700"
              checked={trustedDevice}
              onChange={() => setTrustedDevice(!trustedDevice)}
            ></input>
            {trustedDevice && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="pointer-events-none absolute m-1 h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            )}

            <label htmlFor="trust_device" className="m-2">
              Trust this device
            </label>
          </div>
          {signup ? (
            <button
              className="focus my-4 mx-auto w-full rounded-lg border-b-4 border-teal-900 border-b-teal-900 bg-teal-600 p-2 text-xl font-semibold  uppercase tracking-widest text-teal-50 shadow-2xl  hover:bg-teal-700 hover:from-teal-600 hover:to-teal-800 active:bg-teal-900 active:shadow-lg"
              onClick={handleSignup}
              id='signup-button'
            >
              sign up
            </button>
          ) : (
            <button
              className="focus my-4 mx-auto w-full rounded-lg border-b-4 border-teal-900 border-b-teal-900 bg-teal-600 p-2 text-xl font-semibold  uppercase tracking-widest text-teal-50 shadow-2xl  hover:bg-teal-700 hover:from-teal-600 hover:to-teal-800 active:bg-teal-900 active:shadow-lg"
              onClick={handleLogin}
              id='login-button'
            >
              log in
            </button>
          )}
        </div>

        <div className="mt-2 flex flex-col items-center text-teal-700">
          <p>{signup ? "Already have an account?" : "Not a user yet?"}</p>
          <button
            className="m-2 rounded-lg border-b-2 border-teal-600 bg-green-300 px-4 py-2"
            onClick={() => setSignUp(!signup)}
          >
            {signup ? "log in" : "sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
