import React from "react";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import App from "./Code/App/"

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200EE',
    accent: '#03DAC6',
    background:'#FFFFFF', 
    surface: '#FFFFFF',
    text: '#000000',
    error: '#B00020',
  },
  roundness: 20,
};
  
const AppWrapper = () => {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

export default AppWrapper
