//This hook is used to manage state within a functional component.
import { useState } from "react";
import NoteContext from "./noteContext";

//Functional component named 'NoteState' takes 'props' as an arguement.
const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "6526a9981a6417a0ae3d0880",
      user: "65267408d96ca56ee7fcc53a",
      title: "My title different",
      description: "Please wake up early",
      tag: "personnel",
      date: "2023-10-11T13:56:40.106Z",
      __v: 0,
    },
    {
      user: "65267408d96ca56ee7fcc53a",
      title: "My title late",
      description: "Woke up late today",
      tag: "private",
      _id: "652bf020cbe8da4feb5c7907",
      date: "2023-10-15T13:58:56.062Z",
      __v: 0,
    },
    {
      _id: "6526a9981a6417a0ae3d0880",
      user: "65267408d96ca56ee7fcc53a",
      title: "My title different",
      description: "Please wake up early",
      tag: "personnel",
      date: "2023-10-11T13:56:40.106Z",
      __v: 0,
    },
    {
      user: "65267408d96ca56ee7fcc53a",
      title: "My title late",
      description: "Woke up late today",
      tag: "private",
      _id: "652bf020cbe8da4feb5c7907",
      date: "2023-10-15T13:58:56.062Z",
      __v: 0,
    },
    {
      _id: "6526a9981a6417a0ae3d0880",
      user: "65267408d96ca56ee7fcc53a",
      title: "My title different",
      description: "Please wake up early",
      tag: "personnel",
      date: "2023-10-11T13:56:40.106Z",
      __v: 0,
    },
    {
      user: "65267408d96ca56ee7fcc53a",
      title: "My title late",
      description: "Woke up late today",
      tag: "private",
      _id: "652bf020cbe8da4feb5c7907",
      date: "2023-10-15T13:58:56.062Z",
      __v: 0,
    },
  ];

  //Provide a name(notes) to update the states of that variable("notesInitial").
  //"useState" is used in updatu=ing the states of the variable.
  const [notes, setNotes] = useState(notesInitial);

  //Add a note
  const addNote = (title, description, tag) => {
    //to do api call
    var note = {
      user: "65267408d96ca56ee73fcc53a",
      title: title,
      description:description,
      tag: tag,
      _id: "652bf020cbe8da4feb5c7907",
      date: "2023-10-15T13:58:56.062Z",
      __v: 0,
    };
    //Code to add new notes.
    setNotes(notes.concat(note));
  };

  //Delete a Note
  const deleteNote = (id) => {
    //add api call
    var newNotes = notes.filter((note)=>{return notes._id!==id})
    setNotes(newNotes);
  };

  //Edit a Note
  const editNote = (id,title,description,tag) => {
    
  };

  // //Initialize the initial state using 'useState'.
  // //'s1' is an object having 2 properties 'name' and 'class'.
  // const s1 = {
  //     "name":"Vignesh",
  //     "class":"Accenture"
  // }
  // //'useState' is used to create a state variable name 'state'
  // //and a function'setState' to update the state.
  // const [state, setState] = useState(s1);

  /*
    The update function is defined. Inside this function, 
    a setTimeout is used to change the state to a new object
     with different values after a 1-second delay.
    
    const update = () =>{
        setTimeout(()=>{
            setState({
                "name":"Megha",
                "class":"Redbus"
            })
        },1000);
    }
    */

  /*The "NoteContext.Provider" component is used to provide the
     state and update function to components in the component tree.
    '"props.children"' allows this component to wrap its children
     components and provide the context data to them.*/
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
