import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  //defining intial value of the variables to use them in "onChange" function.
  const [note, setNote] = useState({ title: "", description: "", tag: "default" });

  //handleClick function is triggered by clicking on submit button.
  const handleClick = (e) => {
    //prevents the reloading of the page.
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
  };

  const onChange = (e) => {
    /*pread operator is being used.It ensures to update specific variables 
    which are getting varied as per described in the form. The value assosciated 
    with the name described in the form will be updated.*/ 
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Add a note</h1>
      <form>
        <div className="mb-3">
          <label for="title" className="form-label">
            Title
          </label>
          <input
            type="test"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label for="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
        
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
