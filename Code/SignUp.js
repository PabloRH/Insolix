import React, { Fragment } from 'react'
import { View, Alert } from 'react-native'

import { Button, TextInput } from 'react-native-paper'
import { ActivityIndicator, Colors } from 'react-native-paper'

import { withRouter } from 'react-router-native'

import { Icon } from 'native-base'

import MyHeader from './Header'
import MyStyles from './Styles'

class Profile extends React.Component {
  state = {
    name: '',
    password: '',
    email: '',
    user: '',
    types: '',
    loading: false,
  }

  sendToDB = () => {
    if (this.state.loading) return

    this.setState({ loading: true })

    const data = {
      name: this.state.name,
      password: this.state.password,
      user: this.state.user,
      email: this.state.email,
      types: this.state.types,
    }
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
    fetch('http://pablorosas.pythonanywhere.com/SignUp', options)
      .then(response => {
        this.setState({ loading: false })

        if (response.ok) return response.json()
        else alert('Algo fue mal con el servidor')
      })
      .then(data => {
        if (data == null)
          Alert.alert(
            '¡Oh ha ocurrido un error!',
            'El servido no parece Servir\n',
            [
              {
                text: 'Σ(▼ □ ▼メ)',
                onPress: () => this.props.history.push('/'),
              },
            ],
          )
        else
          Alert.alert('¡Bienvenido a DERBILD!', 'Por Favor Inicia Sesion.\n', [
            {
              text: '¡¡ Vamos ♡＼(￣▽￣)／♡ !!',
              onChange: () => this.props.history.push('/logIn'),
            },
          ])
      })
  }

  render() {
    return (
      <Fragment>
        <MyHeader text="Derbild" subtitle="Sign In" link="/" hasAnArrow />
        <View style={MyStyles.bottomView}>
          <View style={MyStyles.sideIcon}>
            <Icon name="person" />
            <TextInput
              label="Name"
              mode="outlined"
              style={MyStyles.input}
              theme={{ colors: { text: 'black' } }}
              value={this.state.name}
              onChange={e => {
                this.setState({ name: e.nativeEvent.text })
              }}
            />
          </View>

          <View style={MyStyles.sideIcon}>
            <Icon name="person" />
            <TextInput
              label="User"
              mode="outlined"
              style={MyStyles.input}
              theme={{ colors: { text: 'black' } }}
              value={this.state.user}
              onChange={e => {
                this.setState({ user: e.nativeEvent.text })
              }}
            />
          </View>

          <View style={MyStyles.sideIcon}>
            <Icon name="lock" />
            <TextInput
              label="Password"
              mode="outlined"
              style={MyStyles.input}
              theme={{ colors: { text: 'black' } }}
              value={this.state.password}
              onChange={e => {
                this.setState({ password: e.nativeEvent.text })
              }}
            />
          </View>

          <View style={MyStyles.sideIcon}>
            <Icon name="mail" />
            <TextInput
              label="E-mail"
              mode="outlined"
              style={MyStyles.input}
              theme={{ colors: { text: 'black' } }}
              value={this.state.email}
              onChange={e => {
                this.setState({ email: e.nativeEvent.text })
              }}
            />
          </View>

          <View style={MyStyles.sideIcon}>
            <Icon name="star" />
            <TextInput
              label="Tipo de usuario"
              mode="outlined"
              style={MyStyles.input}
              theme={{ colors: { text: 'black' } }}
              value={this.state.types}
              onChange={e => {
                this.setState({ types: e.nativeEvent.text })
              }}
            />
          </View>

          <Button
            icon="send"
            mode="outlined"
            onPress={this.sendToDB}
            style={MyStyles.btn}
          >
            Sign Up
          </Button>

          {this.state.loading && (
            <ActivityIndicator
              animating={true}
              size={'large'}
              color={Colors.red800}
            />
          )}
        </View>
      </Fragment>
    )
  }
}

export default withRouter(Profile)
