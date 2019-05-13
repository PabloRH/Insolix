import React, { Fragment } from 'react'
import {
  TextInput,
  Avatar,
  Card,
  Button,
  Colors,
  ActivityIndicator,
} from 'react-native-paper'
import { View, ScrollView } from 'react-native'

import MyHeader from '../Header'
import MyStyles from '../Styles'

import { Icon } from 'native-base'

import UserDataContext from '../App/UserDataContext'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.data
  }

  static getDerivedStateFromProps(props, state) {
    if (state.ID === 0) return props.data
    else return null
  }

  sendToDB = () => {
    const data = {
      Age: this.state.Age,
      Gender: this.state.Gender,
      Residence: this.state.Residence,
      Profesion: this.state.Profesion,
      Descrip: this.state.Descrip,
      id: this.props.data.ID
    }

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }

    fetch('http://pablorosas.pythonanywhere.com/MoreInfo', options)
      .then(response => {
        this.setState({ loading: false })

        if (response.ok) return response.json()
        else alert('Algo fue mal con el servidor')
      })
      .then(() => {
        this.setState({ loading: false })
      })
    this.setState({ loading: true })
  }

  render() {
    return (
      <Fragment>
        <MyHeader text="Profile" subtitle={this.props.data.Type} link="/" hasSetting />
        <View style={MyStyles.appContainer}>
          <ScrollView>
            <Card style={MyStyles.margen}>
              <Card.Title
                title={this.props.data.Name}
                subtitle={this.props.data.User}
                left={props => (
                  <Avatar.Image
                    size={50}
                    source={require('../../assets/avatar.png')}
                  />
                )}
              />
              <Card.Content />
            </Card>
            <View style={MyStyles.appContainer}>
              {this.state.loading && (
                <ActivityIndicator
                  animating={true}
                  size={'large'}
                  color={Colors.red800}
                />
              )}
              <View style={MyStyles.sideIcon}>
                <Icon name="person" />
                <TextInput
                  multiline
                  label="Descripcion"
                  mode="outlined"
                  style={MyStyles.input}
                  value={this.state.Descrip}
                  onChange={e => this.setState({ Descrip: e.nativeEvent.text })}
                />
              </View>

              <View style={MyStyles.sideIcon}>
                <Icon name="contacts" />
                <TextInput
                  label="Edad"
                  mode="outlined"
                  style={MyStyles.input}
                  value={this.state.Age}
                  onChange={e => this.setState({ Age: e.nativeEvent.text })}
                />
              </View>

              <View style={MyStyles.sideIcon}>
                <Icon name="contacts" />
                <TextInput
                  label="Genero"
                  mode="outlined"
                  style={MyStyles.input}
                  value={this.state.Gender}
                  onChange={e => this.setState({ Gender: e.nativeEvent.text })}
                />
              </View>

              <View style={MyStyles.sideIcon}>
                <Icon name="contacts" />
                <TextInput
                  label="Residencia"
                  mode="outlined"
                  style={MyStyles.input}
                  value={this.state.Residence}
                  onChange={e =>
                    this.setState({ Residence: e.nativeEvent.text })
                  }
                />
              </View>

              <View style={MyStyles.sideIcon}>
                <Icon name="contacts" />
                <TextInput
                  label="Profesion"
                  mode="outlined"
                  style={MyStyles.input}
                  value={this.state.Profesion}
                  onChange={e =>
                    this.setState({ Profesion: e.nativeEvent.text })
                  }
                />
              </View>

              <Button
                icon="refresh"
                mode="outlined"
                style={MyStyles.btn}
                onPress={this.sendToDB}
              >
                Refresh Info
              </Button>
            </View>
          </ScrollView>
        </View>
      </Fragment>
    )
  }
}

const ContextWrapper = props => (
  <UserDataContext.Consumer>
    {({ data }) => <Profile {...props} data={data} />}
  </UserDataContext.Consumer>
)

export default ContextWrapper
