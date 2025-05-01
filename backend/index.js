const cors = require("cors")
const express = require('express')
const app = express()

app.use(cors())
//app.use(express.static("dist"))

//let notes = [
//	{
//		id: "1",
//		content: "HTML is easy",
//		important: true
//	},
//	{
//		id: "2",
//		content: "Browser can execute only JavaScript",
//		important: false
//	},
//	{
//		id: "3",
//		content: "GET and POST are the most important methods of HTTP protocol",
//		important: true
//	}
//]

const mongoose = require('mongoose')

// DO NOT SAVE PASSWORD TO GITHUB!!
const password = process.argv[2]
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
	content: String,
	important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

app.get('/', (request, response) => {
	response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
	//response.json(notes)
	Note.find({}).then(notes => {
		response.json(notes)
	})
})

app.get('/api/notes/:id', (request, response) => {
	const id = request.params.id
	//const note = notes.find(note => note.id === id)

	Note.findById(id).then(note => {
		response.json(note)
	})

	//if (note) {
	//	response.json(note)
	//} else {
	//	response.status(404).end()
	//}
})

const generateId = () => {
	const maxId = notes.length > 0
		? Math.max(...notes.map(n => Number(n.id)))
		: 0
	return String(maxId + 1)
}

app.use(express.json())

app.post('/api/notes', (request, response) => {
	const body = request.body

	if (!body.content) {
		return response.status(400).json({
			error: 'content missing'
		})
	}

	//const note = {
	//	content: body.content,
	//	important: body.important || false,
	//	id: generateId(),
	//}

	const note = new Note({
		content: body.content,
		important: body.important || false,
	})
	//notes = notes.concat(note)

	note.save().then(savedNote => {
		response.json(savedNote)
	})


	//response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
