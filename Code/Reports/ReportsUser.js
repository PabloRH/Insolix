import React, { Fragment } from 'react'
import { View, ScrollView } from 'react-native'

import { Card, TextInput, Button } from 'react-native-paper'
import { Colors, ActivityIndicator } from 'react-native-paper'

import MyHeader from '../Header'
import MyStyles from '../Styles'

import UserDataContext from '../App/UserDataContext'

class ReportsUser extends React.Component {
  state = {
    reportText: '',
    loading: false,
  }

  sendToDB(theId) {
    this.setState({ loading: true })

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: theId, Reporte: this.state.reportText }),
    }

    fetch('http://pablorosas.pythonanywhere.com/Reportes', options)
      .then(response => {
        this.setState({ loading: false })

        if (response.ok) return response.json()
        else alert('Algo fue mal con el servidor')
      })
      .then(_response => {
        this.setState({ loadring: false })
        alert(
          `Reporte Exitoso
          
           Un operador atendera tu reporte y te responderemos en la brevedad por tu Correo Electronico, Gracias`,
        )
      })
  }

  render() {
    return (
      <Fragment>
        <MyHeader text="Reportes" subtitle="" link="/" hasSetting />
        <View style={MyStyles.appContainer}>
          <ScrollView>
            <Card style={MyStyles.margen}>
              <Card.Title
                title="Reportes"
                subtitle="Por Favor Escribe tus problemas o dudas"
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
                <TextInput
                  label="Reporte"
                  mode="outlined"
                  multiline
                  style={MyStyles.input}
                  value={this.state.reportText}
                  onChange={e => this.setState({ reportText: e.nativeEvent.text })}
                />
              </View>

              <UserDataContext.Consumer>
                {({ data }) => (
                  <Button
                    icon="refresh"
                    mode="outlined"
                    style={MyStyles.btn}
                    onPress={() => this.sendToDB(data.ID)}
                  >
                    Subir Reporte
                  </Button>
                )}
              </UserDataContext.Consumer>
            </View>
          </ScrollView>
        </View>
      </Fragment>
    )
  }
}

export default ReportsUser
