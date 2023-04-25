const Tag = ({ title, removeTag }) => {
    
    return (
        <div className="mx-1 rounded-2xl bg-green-300 border-solid shadow-xl hover:bg-emerald-400 border-emerald-500 active:shadow-md active:bg-emerald-500 border-b-2 w-fit h-fit whitespace-nowrap text-teal-900 px-3 py-1 font-semibold tracking-wider uppercase focus">
              <div className="mx-auto">
                {title}
              </div>
              {removeTag && 
                <div className="inline" onClick={() => removeTag(title)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 ml-2 inline">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>}
            

        </div>
    )
}

export default Tag