import { useEffect, useState } from "react"
import axios from "axios"
import Note from "./components/Note"

const baseUrl = `${import.meta.env.VITE_API_URL}/api/notes`

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


const AppLocal = ({ notes }) => {
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

const App = () => {
  const [newNote, setNewNote] = useState("a new note...")
  const [currNote, setCurrNote] = useState([])

  const fetchDataFromServer = () => {
    axios.get(baseUrl)
      .then(response => {
        setCurrNote(response.data)
      })
  }

  useEffect(fetchDataFromServer, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("default event submission prevented")

    const noteObj = {
      content: newNote,
      important: Math.random() > 0.5,
      id: String(currNote.length + 1),
    }

    axios.post(baseUrl, noteObj)
      .then(response => {
        setCurrNote(currNote.concat(response.data))
        setNewNote("")
      })
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
