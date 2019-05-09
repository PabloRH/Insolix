import React from "react"

const UserDataContext = React.createContext({
    state: {}, 
    setter: () => console.log("Empty context")
});

export default UserDataContext