import React, { Fragment } from 'react'
import { TextInput, Avatar, Card, Button, ActivityIndicator } from 'react-native-paper'
import { View, ScrollView, Alert } from 'react-native'

import MyHeader from '../Header'
import MyStyles from '../Styles'

import { Icon } from 'native-base'

import UserDataContext from '../App/UserDataContext'

class Profile extends React.Component {

  state = {
    Age: '',
    Gender: '',
    Residence: '',
    Profesion: '',
    Descrip: '',
    loading: false,
  }

  sendToDB = () => {
    if (this.state.loading) return
    const data = {
      Age: this.state.Age,
      Gender: this.state.Gender,
      Residence: this.state.Residence,
      Profesion: this.state.Profesion,
      Descrip: this.state.Descrip,
    }
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
    fetch('http://pablorosas.pythonanywhere.com/MoreInfo', options)
      .then(res => res.json())
      .then(res => {
        if (res.ID == null)
          Alert.alert(
            '¡Oh ha ocurrido un error!',
            'El servido no parece Servir\n',
            [
              {
                text: 'Σ(▼ □ ▼メ)',
              },
            ],
          )
        else
          Alert.alert('Informacion Actualizada\n', [
            {
              text: '¡¡ ＼(￣▽￣)／ !!',
            },
          ])
      })
      .then(data => {
        this.setState({ loading: false })
      })
    this.setState({ loading: true })
  }

  render() {
    return (
      <UserDataContext.Consumer>
        {userData => {
          const { data } = userData
          return (
            <Fragment>
              <MyHeader
                text="Profile"
                subtitle={data.Type}
                link="/"
                hasSetting
              />
              <View style={MyStyles.appContainer}>
                <ScrollView>
                  <Card style={MyStyles.margen}>
                    <Card.Title
                      title={data.Name}
                      subtitle={data.User}
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
                        value={data.Descrip}
                      />
                    </View>

                    <View style={MyStyles.sideIcon}>
                      <Icon name="contacts" />
                      <TextInput
                        label="Edad"
                        mode="outlined"
                        style={MyStyles.input}
                        value={data.Age}
                      />
                    </View>

                    <View style={MyStyles.sideIcon}>
                      <Icon name="wc" />
                      <TextInput
                        label="Genero"
                        mode="outlined"
                        style={MyStyles.input}
                        value={data.Gender}
                      />
                    </View>

                    <View style={MyStyles.sideIcon}>
                      <Icon name="location-city" />
                      <TextInput
                        label="Residencia"
                        mode="outlined"
                        style={MyStyles.input}
                        value={data.Residence}
                      />
                    </View>

                    <View style={MyStyles.sideIcon}>
                      <Icon name="group" />
                      <TextInput
                        label="Profesion"
                        mode="outlined"
                        style={MyStyles.input}
                        value={data.Profesion}
                      />
                    </View>

                    <Button icon="refresh" mode="outlined" style={MyStyles.btn} onPress={this.sendToDB}>
                      Refresh Info
                    </Button>
                  </View>
                </ScrollView>
              </View>
            </Fragment>
          )
        }}
      </UserDataContext.Consumer>
    )
  }
}

export default Profile
