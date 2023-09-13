import { createContext } from "react";

const wordContext = createContext({
    currWord: '',
    setcurrWord: (word) => {}
  });
  
export default wordContext;