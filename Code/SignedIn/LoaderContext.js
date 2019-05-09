import React from "react";

export const createLoaderState = defaultValue => {
  let hasToLoadImages = defaultValue
  return {
    hasToLoadImages: () => hasToLoadImages,
    setToFalse: () => {hasToLoadImages = false},
    setToTrue: () => {hasToLoadImages = true}
  }
}

export const LoaderStateContext = React.createContext(null)
