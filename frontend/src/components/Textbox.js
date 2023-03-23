import Quill from 'quill'
import "quill/dist/quill.snow.css"
import { useCallback, useState, useEffect } from 'react'



const Textbox = ({setText, setContent}) => {  
  const [quill, setQuill] = useState()

  const outerRef = useCallback((wrapper) => {
        if (wrapper == null) {return }
        wrapper.innerHTML = ''
        const editor = document.createElement('div')
        wrapper.append(editor)
        const q = new Quill(editor, {theme: "snow", modules: {
            toolbar: [
              ["bold", "underline", "italic", { list: "ordered" }, { list: "bullet" },'link', 'image' ]
            ]
            },
            placeholder: 'Add text here...'
          })
          setQuill(q)
    }, [])

    useEffect(() => {
      if (quill) {
        quill.on('text-change', (e) => {
          setText(quill.getText())
          setContent(quill.getContents())
        })
      }
    }, [quill])

    return (
        <div id='container' ref={outerRef} className='border-2 border-teal-900 rounded-xl h-60'>
        
        </div>


    )
}

export default Textbox