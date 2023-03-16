const Tag = ({ title, removeTag }) => {
    
    return (
        <div className="mx-1 rounded-lg bg-teal-600 border-solid shadow-xl hover:bg-teal-700 border-teal-900 active:shadow-md active:bg-teal-900 border-b-2 w-fit h-fit px-2 py-1 whitespace-nowrap text-teal-100 font-semibold tracking-wider uppercase focus">
              {title}
              <div className="inline" onClick={() => removeTag(title)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 ml-2 inline">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            

        </div>
    )
}

export default Tag