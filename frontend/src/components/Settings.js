import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";



const Settings = ({ setShowSettings }) => {
  const windowRef = useRef(null);
  const navigate = useNavigate()
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (windowRef.current && !windowRef.current.contains(e.target)) {
        console.log("clicked outside");
        setShowSettings(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [windowRef]);
  
  const logoutUser = () => {
    window.localStorage.removeItem("cooldownUser");
    navigate(0)
  }
  
  return (
    <div  className="absolute flex h-screen w-screen items-center justify-center bg-slate-800 bg-opacity-30">
      <div ref={windowRef} className="h-[60%] w-80 rounded-xl border-b-4 border-b-slate-500 bg-slate-100">
        <div className="mb-4 flex items-center justify-between border-b-2 border-b-slate-200 p-4">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <button
            onClick={() => {
              setShowSettings(false);
            }}
            className="h-10 w-10 rounded-lg p-1 hover:bg-slate-300 active:bg-slate-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className=" "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col px-4">
          <div className="flex justify-start items-center text-slate-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>

            <h2 className="text-md ml-2 font-medium  ">Account:</h2>
          </div>
          <div className="flex flex-col mx-2">
            
            
            <div className="flex justify-around items-center">
                <button className="letter w-fit rounded-lg my-2 border-b-2 border-solid border-teal-900 bg-teal-600 p-3 font-medium uppercase tracking-wider text-teal-50 shadow-xl hover:bg-teal-700 active:bg-teal-900 active:shadow-md"
                  onClick={logoutUser}>
                    Log out
                </button>
                <button className="hidden letter w-fit rounded-lg my-2 border-b-2 border-solid border-teal-900 bg-teal-600 p-3 font-medium uppercase tracking-wider text-teal-50 shadow-xl hover:bg-teal-700 active:bg-teal-900 active:shadow-md">
                    Delete Account
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
