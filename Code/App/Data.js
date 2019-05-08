import React from "react"

export const Data = React.createContext({
    state: {}, 
    setter: () => console.log("Empty context")
});