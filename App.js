import React from "react";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import App from "./Code/App"

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200EE',
    accent: '#03DAC6',
    background:'#FFFFFF', 
    surface: '#FFFFFF',
    text: '#FFFFFF'
    },
};
  
  export default function Main() {
    return (
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    );
  }
