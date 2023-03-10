import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ showSidebar, setShowSidebar, journals, setCurrJournal }) => {
  
    return (

    <div className="w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-40 z-20" onClick={()=>setShowSidebar(false)}>
    <nav
        id="sidebar"
        className="z-30 absolute top-0 left-0 flex flex-col h-screen w-80 bg-slate-800 text-green-100 shadow-md"
    >
        <h1 className='text-2xl font-semibold p-8'>Cooldown</h1>
        
        <NavLink to='/create'>Hello</NavLink>
        
        {journals.map((j) => (
            <div className=" w-full h-auto p-4 divide-y" key={j.id}>
              <div className="p-5 m-5 text-xl hover:bg-gray-300" onClick={() => setCurrJournal(j)}>
                {j.journalName}
              </div>
            </div>
          ))}



        <div className="flex-col flex divide-y">
            <NavLink className="p-5 m-5 text-xl hover:bg-gray-300" to='/create'>All journals</NavLink>
            <NavLink className="p-5 m-5 text-xl hover:bg-gray-300" to='/create'>Timeline</NavLink>
            <NavLink className="p-5 m-5 text-xl hover:bg-gray-300" to='/create'>Settings</NavLink>
        </div>
        <div className="bg-gray-400 fixed bottom-0 w-60 rounded-tr-xl">
        <p>username/email</p>
        <button>Log out</button>
        </div>
        </nav>
    </div>

  );
};

export default Sidebar;
