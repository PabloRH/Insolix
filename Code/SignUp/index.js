import React, { Fragment } from 'react';
import { withRouter } from "react-router-native";
import { Button, TextInput, ActivityIndicator, Colors } from 'react-native-paper';
import { View, Alert } from 'react-native'

import MyHeader from "../Header"
import MyStyles from "../styles"

class Login extends React.Component {

  state = {name: "", password: "", email: "", user: "", types:"", loading: false}

  sendToDB = () => {
    if (this.state.loading) return
    const data = {
        name: this.state.name, 
        password: this.state.password,
        user: this.state.user,
        email: this.state.email,
        types: this.state.types
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    fetch('http://pablorosas.pythonanywhere.com/SignUp', options)
      .then(res => res.json())
      .then(res => {
        if (res.ID == null)
          Alert.alert('¡Oh ha ocurrido un error!',
          'El servido no parece Servir\n',
          [{text: 'Σ(▼ □ ▼メ)', onPress: () => this.props.history.push("/")}])
        else
          Alert.alert('¡Bienvenido a DERBILD!',
          'Por Favor Inicia Sesion.\n',
          [{text: '¡¡ Vamos ♡＼(￣▽￣)／♡ !!', onChange: () => this.props.history.push("/Login")}])
        })
      .then(data => {
        this.setState({loading: false})
      })
        this.setState({loading: true})
      }
  render () {
    return (
      <Fragment>
        <MyHeader text="Derbild" subtitle="Sign In" link="/" hasAnArrow />
        <View style={MyStyles.bottomView}> 
          <TextInput label='Name' mode='outlined' style={MyStyles.input} theme={{ colors:{text:'black'}}}
          value={this.state.name} onChange={e => {
          this.setState({name: e.nativeEvent.text})
          }} />
           
          <TextInput label='User' mode='outlined' style={MyStyles.input} theme={{ colors:{text:'black'}}}
          value={this.state.user} onChange={e => {
          this.setState({user: e.nativeEvent.text})
          }} />

          <TextInput label='Password' mode='outlined' style={MyStyles.input} theme={{ colors:{text:'black'}}}
          value={this.state.password} onChange={e => {
          this.setState({password: e.nativeEvent.text})
          }} />

          <TextInput label='E-mail' mode='outlined' style={MyStyles.input} theme={{ colors:{text:'black'}}}
          value={this.state.email} onChange={e => {
          this.setState({email: e.nativeEvent.text})
          }} />

          <TextInput label='Tipo de usuario' mode='outlined' style={MyStyles.input} theme={{ colors:{text:'black'}}}
          value={this.state.types} onChange={e => {
          this.setState({types: e.nativeEvent.text})
          }} /> 

          <Button mode="outlined" onPress={this.sendToDB} style={MyStyles.btn}>
            Sign Up
          </Button>
          {
            this.state.loading && 
            <ActivityIndicator animating={true} size={"large"} color={Colors.red800} />
          }
        </View>
      </Fragment>
    );
  }  
};

export default withRouter(Login);