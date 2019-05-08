import React from "react";

export const updater = () => {
  let state = false
  return {
    getState: () => state,
    setToFalse: () => {state = false},
    setToTrue: () => {state = true}
  }
}


export const HasToUpdate = React.createContext(updater())
