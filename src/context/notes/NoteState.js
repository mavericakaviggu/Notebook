//This hook is used to manage state within a functional component.
import { useState,useEffect } from "react";
import NoteContext from "./noteContext";

//Functional component named 'NoteState' takes 'props' as an arguement.
const NoteState = (props) => {
  const host = "http://localhost:5000";
  // Initialized notes state as an empty array
  const [notes, setNotes] = useState([]);

  //Provide a name(notes) to update the states of that variable("notesInitial").
  //"useState" is used in updatu=ing the states of the variable.
  

  //Get all notes
  const getNotes = async () => {
    //to do api call
    try{
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "auth-token":localStorage.getItem('token'),
          "Content-Type": "application/json",
        }
      });
      //parses the json input
      const json = await response.json();
      setNotes(json);
    }
    catch(error){
      console.error("Error while fetching notes:",error)
    }
    
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //to do api call
    try{
      const response = await fetch(`${host}/api/notes/addNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag}),
      });
      
      if(response.ok){
        const note = await response.json();
      // Used the spread operator to update the state when adding a new note
      // setNotes((prevNotes)=>[...prevNotes,note]);
      setNotes(notes.concat(note));
      }
      else{
        console.error("failed to add one:",response.status,response.statusText)
      }
    }
    catch(error){
      console.error("Error adding note:",error);
    } 
  };

  //Delete a Note
  const deleteNote = async (id) => {
    //add api call
    try{
      //const response = 
      await fetch(`${host}/api/notes/deleteNote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        
      });
      //const json = await response.json();
      //setNotes((prevNotes)=> prevNotes.filter((note)=>note._id!==id));     
      const newNotes = notes.filter((note)=>{return notes._id!==id})
      setNotes(newNotes);
    }
    catch(error){
      console.error("Error deleting note:",error);
    } 
    
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //Api call
    try{
    //const response = 
    await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "auth-token":localStorage.getItem('token'),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, tag }),
    });
      
    //const json = await response.json();
    //console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit in client side
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes)

    // Used map to create a new array with the updated note when editing
    // setNotes((prevNotes) =>
    // prevNotes.map((note) =>
    //   note._id === id
    //     ? { ...note, title, description, tag }
    //     : note
    // )
    // );
  } catch (error) {
    console.error("Error editing note:", error);

    // const json = await response.json();

    // let newNotes = JSON.parse(JSON.stringify(notes))
    // //Logic to edit in client side
    // for (let i = 0; i < newNotes.length; i++) {
    //   const element = newNotes[i];
    //   if (element._id === id) {
    //     newNotes[i].title = title;
    //     newNotes[i].description = description;
    //     newNotes[i].tag = tag;
    //     break;
    //   }
     
    // }
    // setNotes(newNotes)
  }
};

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    }
    //eslint-disable-next-line
  }, []);

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
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
