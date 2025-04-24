import { useState } from "react"
import Note from "./components/Note"

const Notes = ({ notes }) => {
  return (
    <div>
      <ul>
        {notes.map(note =>
          <li key={note.id}>
            {note.content}
          </li>)}
      </ul>
    </div>
  )
}



const App = ({ notes }) => {
  const [newNote, setNewNote] = useState("a new note...")
  const [currNote, setCurrNote] = useState(notes)

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("default event submission prevented")

    const noteObj = {
      content: newNote,
      important: Math.random() > 0.5,
      id: String(currNote.length + 1),
    }

    setCurrNote(currNote.concat(noteObj))
    setNewNote("")
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <p>NOTES:</p>
      <ul>
        <li>Hello</li>
        {currNote.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          value={newNote}
          onChange={handleChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
