const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator"); //For data calidation we need to install this

//Route 1: get all the notes: GET"/api/auth/getUser"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    //catch emthod if there is any error to handle
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//Route 2: Add a new note: POST"/api/auth/addNote". Login required(authentication of user is required)
router.post(
  "/addNote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description ust be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      //Destructures the "title","desc","tag" from the request body.
      const { title, description, tag } = req.body;

      //Validating the request.
      const errors = validationResult(req);
      //If the validation fails, the errors will be added to the "errors" array.
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //Creating a note object that needs to be saved in the MongoDB.
      //Where user: req.user.id is fetched from the auth-token used in fetchUser.
      //req.user is defined in fetchUser.js
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      //catch method if there is any error to handle
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 3 : Update an exisitng Note : PUT "api/auth/updateNote".Login required
router.put(
  //"id" is the url parameter to fetch the details to that particular user only.
  "/updateNote/:id",
  fetchuser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      //Creating an empty object.
      const newNote = {};
      //Only the updated values will be stored in the above empty object.
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      //Find the note to be updated and update it
      //req.params.id this takes the id from the url endpoint.
      //Finds the note in the db by its ID, which is taken from the URL parameter.
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not found");
      }
      //Checks if the user who is attempting to update the note is the owner of the note.
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      //"findByIdAndUpdate" takes id of the note to be updated as the 1st parameter.
      //"{$set:newNote}" sets the new values from the "newNote".
      //"{new:true}" returns the updated note as the result of the operation.
      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json(note);
    } catch (error) {
      //catch method if there is any error to handle
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 4 : Delete an exisitng Note : DELETE "api/auth/deleteNote".Login required
router.delete(
  //"id" is the url parameter to fetch the details to that particular user only.
  "/deleteNote/:id",
  fetchuser,
  async (req, res) => {
    try {
      //Find the note to be deleted and delete it
      //req.params.id this takes the id from the url endpoint.
      //Finds the note in the db by its ID, which is taken from the URL parameter.
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not found");
      }
      //Checks if the user who is attempting to update the note is the owner of the note.
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      //"findByIdAndDelete" takes id of the note to be deleted as the 1st parameter.
      note = await Note.findByIdAndDelete(req.params.id);
      res.json({ Success: "Note has been deleted", note: note });
    } catch (error) {
      //catch method if there is any error to handle
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;
