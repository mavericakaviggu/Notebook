//Context is a way to pass data through the component tree without
// having to pass props down manually at every level.


import { createContext } from "react";

//context object being used to share data and state between components.
const noteContext = createContext();

export default noteContext;
/*Once you have created and exported this context, you can use it
in your application by wrapping components with the context
provider and consuming the data stored within the context in
various parts of your application. Contexts are often used to
manage global state, making data accessible to different parts 
of your application without having to pass props down through
multiple levels of the component tree.
*/