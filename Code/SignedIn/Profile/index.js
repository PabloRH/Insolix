import React, { Fragment } from 'react';
import { Text, TextInput, Avatar, Card, Button } from 'react-native-paper';
import { View, Icon, ScrollView } from 'react-native'

import MyHeader from "../../Header"
import MyStyles from "../../styles"

import { Data } from "../../App/Data" 

class Profile extends React.Component {

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
  render() {    
    return (
      <Fragment>
      <MyHeader text="Usuario" subtitle="tipo de usuario" link="/" hasSetting  />
      <View style={MyStyles.appContainer}>
      <ScrollView>
      <Card style={MyStyles.margen}>
  <Card.Title title="Nombre" subtitle="Apellido" left={(props) => <Avatar.Image size={12} source={require('../../../assets/avatar.png')} />} />
        <Card.Content>
          
        </Card.Content>
      </Card>
        <View style={MyStyles.appContainer}>
        <View style={MyStyles.sideIcon}>
            <Icon name="person" />
            <TextInput label='Name' mode='outlined' style={MyStyles.input} disabled={'true'}
            value={this.state.name} onChange={e => {
            this.setState({name: e.nativeEvent.text})
            }} /></View>

          <View style={MyStyles.sideIcon}>
            <Icon name="person" />  
            <TextInput label='User' mode='outlined' style={MyStyles.input} disabled={'true'}
            value={this.state.user} onChange={e => {
            this.setState({user: e.nativeEvent.text})
            }} /></View>

          <View style={MyStyles.sideIcon}>
            <Icon name="lock" />
            <TextInput label='Password' mode='outlined' style={MyStyles.input} disabled={'true'}
            value={this.state.password} onChange={e => {
            this.setState({password: e.nativeEvent.text})
            }} /></View>

          <View style={MyStyles.sideIcon}>
            <Icon name="mail" />
            <TextInput label='E-mail' mode='outlined' style={MyStyles.input} disabled={'true'}
            value={this.state.email} onChange={e => {
            this.setState({email: e.nativeEvent.text})
            }} /></View>

          <View style={MyStyles.sideIcon}>
            <Icon name="star" />
            <TextInput label='Tipo de usuario' mode='outlined' style={MyStyles.input} disabled={'true'}
            value={this.state.types} onChange={e => {
            this.setState({types: e.nativeEvent.text})
            }} /></View>

          <Button icon="send" mode="outlined" onPress={this.sendToDB} style={MyStyles.btn}>
            Sign Up
          </Button>
        </View>
      </ScrollView>  
        <Data.Consumer>
          {
            context => {
              console.log(context)
              const [data, setData] = context
              return (
                <Text theme={{colors: {text: '#000000',}}}> { data.ID } </Text>
              ) 
            }
          }
        </Data.Consumer>
      </View>
    </Fragment>
    );  
    }
};

export default Profile;

