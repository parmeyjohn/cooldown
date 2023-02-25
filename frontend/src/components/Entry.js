import { useState } from "react";

const Entry = ({ entry }) => {
    const [showFullEntry, setShowFullEntry] = useState(false)
    
    var shortDate = new Date(entry.date)
    shortDate = shortDate.toDateString()
    return(
        <div className='w-full z-10'>
            {showFullEntry ? 
                <div>
                    Hey
                </div>
                : 
                <div className='flex flex-col justify-around relative bg-teal-50 rounded-lg shadow-md mx-2 p-8'>
                <div className='flex justify-between w-full'>
                    <h2 className='text-xl font-semibold'>{entry.entryTitle}</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
                    </svg>
                </div>
                

                
                <div className='hidden bg-gradient-to-t from-gray-100 absolute w-full h-full z-10 top-0 left-0 rounded-lg'></div>
                    <div className='flex flex-col w-full'>
                        
                        <h3 className='text-lg'>{entry.mediaTitle} on {shortDate}</h3>
                        <div className="flex justify-between w-full mt-5 line">
                            <p className='pr-5 w-60 text-left leading-relaxed line-clamp-3'>{entry.text}</p>
                            <div className="bg-black h-12 w-12 rounded-md "></div>
                        </div>
                        
                        
                    </div>
                    
                </div> 
            }
        </div>
    )
}

export default Entry