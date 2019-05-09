import React, { Fragment } from 'react'
import { View, Alert } from 'react-native'

import { Button, TextInput } from 'react-native-paper'
import { ActivityIndicator, Colors } from 'react-native-paper'
import { withRouter } from 'react-router-native'

import { Icon } from 'native-base'

import MyHeader from './Header'
import MyStyle from './Styles'

import UserDataContext from './App/UserDataContext'

class Login extends React.Component {
  state = { user: '', password: '', loading: false }
  sendToDB = updateUserData => {
    if (this.state.loading) return

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: this.state.user,
        password: this.state.password,
      }),
    }

    this.setState({ loading: true })

    fetch('http://pablorosas.pythonanywhere.com/logIn', options)
      .then(response => {
        this.setState({ loading: false })

        if (response.ok) return response.json()
        else alert('Algo fue mal con el servidor')
      })
      .then(data => {
        if (data == null || data.ID == null) {
          Alert.alert(
            '¡Oh ha ocurrido un error!',
            'No existe este Usuario\nΣ(▼ □ ▼メ)',
            [
              {
                text: '¿Quieres Registrarte?',
                onPress: () => this.props.history.push('/signUp'),
              },
            ],
          )
        } else {
          this.props.history.push('/signedIn')
          updateUserData(data)
        }
      })
  }

  render() {
    const textProps = {
      mode: 'outlined',
      style: MyStyle.input,
      theme: { colors: { text: 'black' } },
    }

    return (
      <Fragment>
        <MyHeader text="Derbild" subtitle="Log In" link="/" hasAnArrow />
        <View style={MyStyle.appContainer}>
        
          <View style={MyStyle.sideIcon}>
            <Icon name="person" />
            <TextInput
              {...textProps}
              label="User"
              value={this.state.user}
              onChange={e => this.setState({ user: e.nativeEvent.text })}
            />
          </View>
          
          <View style={MyStyle.sideIcon}>
            <Icon name="lock" />
            <TextInput
              {...textProps}
              label="Password"
              secureTextEntry
              password
              value={this.state.password}
              onChange={e => this.setState({ password: e.nativeEvent.text })}
            />
          </View>

          <UserDataContext.Consumer>
            {userData => (
              <Button
                icon="send"
                mode="outlined"
                onPress={() => this.sendToDB(userData.setData)}
                style={MyStyle.btn}
              >
                Log In
              </Button>
            )}
          </UserDataContext.Consumer>

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

export default withRouter(Login)
