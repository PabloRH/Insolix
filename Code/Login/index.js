import React from 'react';
import { Button, TextInput } from 'react-native-paper';
import { View } from 'react-native'

import MyHeader from "../Header"
import MyStyle from "./styles"

class Login extends React.Component {
  state = {name: "", password: ""}

  sendToDB = () => {
    const data = {name: this.state.name, password: this.state.password};
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    fetch('http://pablorosas.pythonanywhere.com/logIn', options)
      .then(res => res.json())
      .then(res => alert(res.ID))
  }

  render () {
    return (
      <React.Fragment>
        <MyHeader text="Derbild" subtitle="Log In" link="/" hasAnArrow />
        <View style={MyStyle.bottomView}> 
          <TextInput label='User' mode='outlined' style={MyStyle.input} theme={{ colors:{text:'black'}}}
          value={this.state.name} onChange={e => {
          this.setState({name: e.nativeEvent.text})
          }} />
           
          <TextInput label='Password' mode='outlined' style={MyStyle.input} theme={{ colors:{text:'black'}}}
          value={this.state.password} onChange={e => {
          this.setState({password: e.nativeEvent.text})
          }} />

          <Button mode="outlined" onPress={this.sendToDB} style={MyStyle.btn}>
            Log In
          </Button>
        </View>
      </React.Fragment>
    );
  }  
};

export default Login;