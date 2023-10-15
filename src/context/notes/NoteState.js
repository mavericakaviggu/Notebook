//This hook is used to manage state within a functional component.
// import { useState } from "react";
import NoteContext from "./noteContext";

//Functional component named 'NoteState' takes 'props' as an arguement.
const NoteState = (props) =>{
    const notes = [
        {
          "_id": "6526a9981a6417a0ae3d0880",
          "user": "65267408d96ca56ee7fcc53a",
          "title": "My title",
          "description": "Please wake up early",
          "tag": "personnel",
          "date": "2023-10-11T13:56:40.106Z",
          "__v": 0
        }
      ]

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
        <NoteContext.Provider value={{notes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;