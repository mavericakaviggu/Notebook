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
      //Where as the fourth argument "user" is caught from req header?
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      //catch emthod if there is any error to handle
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;
