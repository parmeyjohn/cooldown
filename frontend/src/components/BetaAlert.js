import { useRef, useEffect, useState } from "react";

const BetaAlert = ({ searchValue, setSearchValue, placeholder }) => {
  const alertRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (alertRef.current && !alertRef.current.contains(e.target)) {
        console.log("clicked outside");
        setShowAlert(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [alertRef]);

  const [showAlert, setShowAlert] = useState(false);

  return (
    <div
      onClick={() => setShowAlert(true)}
      className="absolute right-0 bottom-0 m-4 cursor-pointer rounded-full border-b-2 border-teal-600 bg-green-300 p-1 text-xs font-medium text-slate-800"
    >
      {showAlert ? (
        <div
          ref={alertRef}
          className="absolute bottom-8 right-8 z-20 h-auto w-auto rounded-md border-2 border-teal-600 bg-green-200 p-2 shadow-xl"
        >
          <p>
            Cooldown is currently in beta; some features may be incomplete,
            missing, or contain bugs. Please submit any bugs via the github
            issues tab at https://github.com/parmeyjohn/cooldown/issues.
          </p>
        </div>
      ) : (
        <></>
      )}
      beta
    </div>
  );
};
export default BetaAlert;
