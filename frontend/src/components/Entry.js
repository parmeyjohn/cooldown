import { useState } from "react";

import OptionsButton from "./OptionsButton";
import entryService from "../services/entries";
import journalService from "../services/journals";

const Entry = ({ entry, entries, setEntries }) => {
  const [showFullEntry, setShowFullEntry] = useState(false);
  const [showOptions, setShowOptions] = useState(false);



  const handleDelete = () => {
    entryService.remove(entry.id);
    alert(`${entry.entryTitle} has been deleted.`)
    //remove locally too
    setEntries(entries.filter((e) => e.id !== entry.id))
    // set the entries of its journal as well
    console.log(entry)
    journalService.update(entry.journalId, {$pull: {entries: entry.id}})
  };
  
  const handleEdit = (event) => {
    // navigate to create element page with prefilled info
    //focus on the element


  };

  var shortDate = new Date(entry.date).toLocaleDateString('en-US');
  return (
    <div className="w-full h-full z-10">
      {showFullEntry ? (
        <div>Hey</div>
      ) : (
        <div className="bg-gradient-to-b from-white to-green-100 rounded-lg shadow-md mx-2 p-6">
          <div className="w-full flex justify-between">
            <h2 className="text-xl font-semibold col-span-4 truncate text-ellipsis pr-6">
              {entry.entryTitle}
            </h2>
            <OptionsButton handleEdit={handleEdit} handleDelete={handleDelete}></OptionsButton>
          </div>
            
        
        <div className="flex justify-around relative ">
          
          <div className="flex flex-col w-[50%] h-full">
            
            <div className="text-md">{shortDate}</div>
            <p className="p-2 text-left leading-relaxed line-clamp-3">
                {entry.text}
              </p>
          </div>
        <div className="h-[100%] w-[50%] p-4">
            <img
            className=" object-cover object-center rounded-md"
            src="https://cdn.vox-cdn.com/thumbor/O4lh3lTJG3YKWzGqEcsCr1Sb4TI=/0x0:3840x2160/920x613/filters:focal(1613x773:2227x1387):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/69376580/VALORANT_YR1_KeyArt_4k_3_.0.jpg"
            alt="val"
            ></img>
        </div>

          <div className="hidden bg-gradient-to-t from-gray-100 absolute w-full h-full z-10 top-0 left-0 rounded-lg"></div>
        </div>
        </div>
      )}
    </div>
  );
};

export default Entry;
