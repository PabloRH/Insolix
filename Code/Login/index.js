import React, { Fragment } from 'react';
import { withRouter } from "react-router-native";
import { Button, TextInput, ActivityIndicator, Colors } from 'react-native-paper';
import { View, Alert } from 'react-native'

import MyHeader from "../Header"
import MyStyle from "../styles"
import { Icon } from 'native-base';
//import { Data } from "../App/Data" 

class Login extends React.Component {
  state = {user: "", password: "", loading: false}

  sendToDB = () => {
    if (this.state.loading) return
    const data = {user: this.state.user, password: this.state.password};
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };

    fetch('http://pablorosas.pythonanywhere.com/logIn', options)
      .then(res => res.json())
      .then(res => {
        if (res.ID == null) {
          Alert.alert('¡Oh ha ocurrido un error!',
          'No existe este Usuario\nΣ(▼ □ ▼メ)',
          [{text: '¿Quieres Regitarte?', onPress: () => this.props.history.push("/SignUp")}])
          this.setState({loading: false})

        } else this.props.history.push("/SignedIn")
        })
    
    this.setState({loading: true})
  }

  render () {

    const textProps = {
      mode: 'outlined',
      style: MyStyle.input,
      theme: { colors:{text:'black'}}
    }

    return (
      <Fragment>
        <MyHeader text="Derbild" subtitle="Log In" link="/" hasAnArrow />
        <View style={MyStyle.appContainer}> 
          <View style={MyStyle.sideIcon}>
            <Icon name="person" />
            <TextInput 
              {...textProps} 
              label = 'User'
              value = {this.state.user} 
              onChange = {e => this.setState({user: e.nativeEvent.text})}
            />
          </View>
          <View style={MyStyle.sideIcon}>
            <Icon name="lock" />
            <TextInput 
              {...textProps} 
              label = 'Password' 
              value = {this.state.password} 
              onChange = {e => this.setState({password: e.nativeEvent.text})}
            />
          </View>
          <Button icon="send" mode="outlined" onPress={this.sendToDB} style={MyStyle.btn}>
            Log In
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


// Login.contextType = Data;

export default withRouter(Login);