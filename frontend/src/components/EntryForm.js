import { useState } from 'react'

const EntryForm = ({ createEntry }) => {
    
    const [entryTitle, setEntryTitle] = useState("")
    const [mediaTitle, setMediaTitle] = useState("")
    const [date, setDate] = useState("")
    const [text, setText] = useState("")
    const [tags, setTags] = useState([])
    
    const addEntry = async (event) => {
        event.preventDefault()
        console.log({ entryTitle, mediaTitle, date, text, tags })
        createEntry({ entryTitle, mediaTitle, date, text, tags })
        setEntryTitle('')
        setMediaTitle('')
        setDate('')
        setText('')
        setTags([])
      }
    
    return (
    <div>
      <h2>Create Entry:</h2>
      <form onSubmit={addEntry}>
        <div>
          Your title
          <input
            type="text"
            value={entryTitle}
            name="Title"
            onChange={({ target }) => setEntryTitle(target.value)}
          />
        </div>
        <div>
          Media
          <input
            type="text"
            value={mediaTitle}
            name="The game you played"
            onChange={({ target }) => setMediaTitle(target.value)}
          />
        </div>
        <div>
          Date
          <input
            type="datetime-local"
            value={date}
            name="Date"
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          Text
          <input
            type="text"
            value={text}
            name="Text"
            onChange={({ target }) => setText(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default EntryForm