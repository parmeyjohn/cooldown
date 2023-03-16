import Quill from 'quill'
import "quill/dist/quill.snow.css"
import { useCallback, useRef } from 'react'



const Textbox = () => {
    const outerRef = useCallback((wrapper) => {
        if (wrapper == null) {return }
        wrapper.innerHTML = ''
        const editor = document.createElement('div')
        wrapper.append(editor)
        new Quill(editor, {theme: "snow", modules: {
            toolbar: [
              ["bold", "underline", "italic", { list: "ordered" }, { list: "bullet" },'link', 'image' ]
            ]
            },
            placeholder: 'Add text here...'
          })
    }, [])

    return (
        <div id='container' ref={outerRef} className='border-2 border-teal-900 rounded-xl h-60'>
        
        </div>


    )
}

export default Textbox