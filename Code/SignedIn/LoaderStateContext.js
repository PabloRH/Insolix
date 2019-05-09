import React from "react";

export const createStateLoader = defaultValue => {
  let value = defaultValue
  return {
    getValue: () => value,
    setToFalse: () => {value = false},
    setToTrue: () => {value = true}
  }
}

export const HasToUpdate = React.createContext(null)
