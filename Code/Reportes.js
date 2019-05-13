import React, { Fragment } from 'react'
import { View, ScrollView } from 'react-native'

import { Card, TextInput, Button, Colors, ActivityIndicator, } from 'react-native-paper'

import MyHeader from './Header'
import MyStyles from './Styles'

import UserDataContext from './App/UserDataContext'

class Reportes extends React.Component {
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
      Reporte: this.state.Reporte,
      id: this.props.data.ID
    }

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }

    fetch('http://pablorosas.pythonanywhere.com/Reportes', options)
      .then(response => {
        this.setState({ loading: false })

        if (response.ok) return response.json() 
        else alert('Algo fue mal con el servidor')
      })
      .then(() => {
        this.setState({ loading: false })
        alert("Reporte Exitoso \nUn operador atendera tu reporte y te responderemos en la brevedad por tu Correo Electronico, Gracias")
      })
    this.setState({ loading: true })
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
                  value={this.state.Reporte}
                  onChange={e => this.setState({ Reporte: e.nativeEvent.text })}
                />
              </View>

              <Button
                icon="refresh"
                mode="outlined"
                style={MyStyles.btn}
                onPress={this.sendToDB}
              >
                Subir Reporte
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
    {({ data }) => <Reportes {...props} data={data} />}
  </UserDataContext.Consumer>
)

export default ContextWrapper