import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";


const EntryForm = ({ createEntry }) => {
  const [entryTitle, setEntryTitle] = useState("");
  const [mediaTitle, setMediaTitle] = useState("");
  const [date, setDate] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState([]);
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  
  
  let navigate = useNavigate()

  const addEntry = async (event) => {
    event.preventDefault();
    console.log({ entryTitle, mediaTitle, date, text, tags });
    createEntry({ entryTitle, mediaTitle, date, text, tags });
    setEntryTitle("");
    setMediaTitle("");
    setDate("");
    setText("");
    setTags([]);
  };

  

  const modules = {
    toolbar: [
      ["bold", "underline", "italic", { list: "ordered" }, { list: "bullet" },'link', 'image' ]
    ],
  };

  return (
    <div className="h-screen w-screen">
      <div className=" bg-gradient-to-b from-teal-50 to-teal-100 text-teal-900 w-full h-full z-20 absolute">
        <div className="grid grid-cols-5 p-4 items-center">
          <h1 className=" col-span-4 mx-4" >Journal Name</h1>
          <button onClick={()=>navigate(-1)} className='w-8 h-8 justify-self-end mr-2 mt-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
        </div>
        <div className="flex px-4 w-full items-center text-gray-500 focus-within:text-gray-700  ">
          <input
            className="w-full p-2 mx-2 mt-2 mb-4 rounded-lg bg-transparent focus:outline-none h-14 text-3xl font-semibold underline underline-offset-[40%] decoration-teal-800 decoration-4"
            autoFocus
            name="title"
            placeholder="Untitled"
            autoComplete="off"
            value={entryTitle}
            onChange={(e) => setEntryTitle(e.target.value)}
          ></input>
        </div>
        
        
        <div className="flex px-4 mx-2 flex-col text-lg text-left">
          <label className="text-md font-semibold px-2">Start:</label>
          <input className="bg-transparent py-2 px-2  mb-2 border-2 border-teal-800 rounded-lg focus:bg-teal-100" onChange={(e) => setStartDate(e.target.value)} type="datetime-local" name="start-time" value={startDate.toISOString().slice(0,16)}></input>
          <label className="text-md font-semibold px-2">End:</label>
          <input className="bg-transparent p-2 mb-4 border-2 border-teal-800 rounded-lg focus:bg-teal-100" onChange={(e) => setEndDate(e.target.value)} type="datetime-local" name="end-time" value={endDate.toISOString().slice(0,16)}></input>
          
        </div>

        <div className="px-4 mx-2 h-80">
          <ReactQuill
            theme="snow"
            placeholder="Text here"
            modules={modules}
          ></ReactQuill>
        </div>

        <div className="w-full h-[10%] bg-teal-100 flex fixed left-0 bottom-0 p-4 mt-5 text-l text-teal-100 font-semibold tracking-wider uppercase">
          
          
          <div className="text-teal-900 rounded-lg border-solid hover:bg-teal-400 hover:border-2 hover:border-blue-400 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 p-2 m-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
          <div className="flex justify-start w-full overflow-x-auto">
            
            <div className="mx-1 rounded-lg bg-teal-600 border-solid shadow-md hover:bg-teal-900 border-teal-900 border-b-2 w-fit h-fit px-2 py-1 whitespace-nowrap">
              Valorant
            </div>
            <div className="mx-1 rounded-lg bg-teal-600 border-solid shadow-md hover:bg-teal-900 border-teal-900 border-b-2 w-fit h-fit px-2 py-1 whitespace-nowrap">
              Video games
            </div>
            <div className="mx-1 rounded-lg bg-teal-600 border-solid shadow-md hover:bg-teal-900 border-teal-900 border-b-2 w-fit h-fit px-2 py-1 whitespace-nowrap">
              FPS
            </div>
            
          </div>
        </div>
      
        
      </div>
      
      
    </div>
  );
};

export default EntryForm;

