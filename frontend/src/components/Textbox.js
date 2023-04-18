import Quill from 'quill'
import "quill/dist/quill.snow.css"
import { useCallback, useState, useEffect } from 'react'



const Textbox = ({initialContent, setText, setContent}) => {  
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
          q.setContents(initialContent)
    }, [])

    useEffect(() => {
      if (quill) {
        
        quill.on('text-change', (e) => {
          setText(quill.getText())
          setContent(quill.getContents())
        })
        // quill.on('selection-change', (range, prevRange, source) => {
        //   if (range) {
        //     if (range.length === 0) {
        //       console.log('user is focused')
        //       console.log(quill.container)
        //       quill.container.style.backgroundColor = 'white'
        //       //outerRef.current.backgroundColor = 'red'
        //     } else {
        //       console.log('user is not focused')
        //     }
        //   }
        // })
      }
    }, [quill, setText, setContent])


    return (
        <div id='container' ref={outerRef} className='rounded-xl h-60'>
        </div>


    )
}

export default Textbox