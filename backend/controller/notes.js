const notesRouter = require("express").Router();
const logger = require("../utils/logger");
const Note = require("../models/note");

notesRouter.get("/", (request, response) => {
  logger.info("Getting note api...");
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

notesRouter.get("/:id", (request, response, next) => {
  const id = request.params.id;

  Note.findById(id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

notesRouter.post("/", (request, response, next) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = notesRouter;
