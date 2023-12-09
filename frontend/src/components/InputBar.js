import { useState } from "react";

const InputBar = ({ inputName, label, placeholder, value, setValue }) => {
  return (
    <div>
      <label htmlFor={inputName} className="px-2 font-semibold">
        {label}:
      </label>
      <input
        className="w-full rounded-lg bg-slate-200 p-3 shadow-inner shadow-slate-300 outline-8 transition duration-300 ease-in-out focus-within:text-gray-700 focus:bg-teal-50 focus:shadow-none focus:outline-offset-1 focus:outline-teal-700"
        name={inputName}
        placeholder={placeholder}
        autoComplete="off"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
    </div>
  );
};
export default InputBar;
