import { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import OptionsButton from "./OptionsButton";

import { EntryContext } from "../contexts/EntryContext";
import { JournalContext } from "../contexts/JournalContext"


import entryService from "../services/entries";
import journalService from "../services/journals";

const Entry = ({ entry }) => {
  const [showFullEntry, setShowFullEntry] = useState(false);
  const { entries, setEntries, currEntry, setCurrEntry } = useContext(EntryContext);
  const { currJournal } = useContext(JournalContext)

  let navigate = useNavigate();
  let location = useLocation();

  const handleDelete = () => {
    console.log('in handleDelete: entry', entry)
    entryService.remove(entry.id);
    alert(`${entry.entryTitle} has been deleted.`);
    //remove locally too
    setEntries(entries.filter((e) => e.id !== entry.id));
    // set the entries of its journal as well
    journalService.update(entry.journalId, { $pull: { entries: entry.id } });
  };

  const handleEdit = (event) => {
    setCurrEntry(entry)
    navigate("create", {
      state: {
        edit: true
      },
    });
  };

  const formatTime = (datetimeString) => {
    var time = datetimeString.slice(11,16)
    var hrs = Number(time.slice(0,2))
    var zone = ""
    if (hrs === 0) {
      hrs = 12
      zone = 'AM'
    } else if (hrs > 11) {
        hrs -= 12 
        zone = 'PM'
    } else {
      zone = 'AM'
    }
    const mins = time.slice(3,5)
    return ` ${hrs}:${mins} ${zone}`
  }
  //
  //
  //
  //
  return (
    <>
      {showFullEntry ? (
        <div>Hey</div>
      ) : (
        <div className="bg-teal-50 mx-2 p-6 border-b-2 first:rounded-t-xl last:border-b-0 last:rounded-b-xl hover:bg-slate-300">
          <div className="w-full flex justify-between">
            <h2 className="text-xl font-semibold col-span-4 truncate text-ellipsis pr-6">
              {entry.entryTitle}
            </h2>
              <OptionsButton
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              ></OptionsButton>
          </div>

          <div className="flex justify-between mt-2 relative ">
            <div className="flex flex-col w-[60%] h-full">
              <div className="text-md ml-2">{entry.mediaTitle}</div>

              <div className="text-md ml-2">{entry.startDate ? `${formatTime(entry.startDate)}` : "no date"}</div>
              <p className="p-2 text-left leading-relaxed line-clamp-3">
                {entry.text}
              </p>
            </div>
            <div className="h-full w-20">
              {'mediaObj' in entry ? 
                <img
                  className=" object-cover object-center rounded-md h-20 w-20 border-2 border-slate-800"
                  src={entry.mediaObj['sample_cover'].thumbnail_image}
                  alt="val"
                ></img>
              :
              <></>}  
              
            </div>

            <div className="hidden bg-gradient-to-t from-gray-100 absolute w-full h-full z-10 top-0 left-0 rounded-lg"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Entry;
