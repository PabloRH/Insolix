import React, { Fragment } from 'react'
import { Button } from 'react-native-paper'

import { Colors, ActivityIndicator, DataTable } from 'react-native-paper'
import { TextInput, Text } from 'react-native-paper'
import { View, ScrollView, RefreshControl, Picker, ToastAndroid } from 'react-native'

import MyHeader from '../Header'
import MyStyles from '../Styles'

import UserDataContext from '../App/UserDataContext'

class AddReport extends React.Component {
  state = { reports: [],  Estado: 'Pendiente'}

  sendToDB = (theId) => {
    const data = { ...this.state, id: theId }
    console.log(data)

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }

    fetch('http://pablorosas.pythonanywhere.com/AddReport', options)
      .then(response => {
        this.setState({ loading: false })

        if (response.ok) {
          ToastAndroid.showWithGravityAndOffset(
            'Guardado Exitoso',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          return response.json()
        }
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
        <View style={{ marginBottom: 85 }}>
          <ScrollView contentContainerStyle={MyStyles.content}>
            <View>
              <View style={MyStyles.sideIcon}>
                <TextInput
                  label="Fecha"
                  mode="outlined"
                  keyboardType="numeric"
                  style={MyStyles.input}
                  value={this.state.Fecha}
                  onChange={e => this.setState({ Fecha: e.nativeEvent.text })}
                />
              </View>

              <View style={MyStyles.sideIcon}>
                <TextInput
                  label="Nombre de Reporte"
                  mode="outlined"
                  style={MyStyles.input}
                  value={this.state.Nombre}
                  onChange={e => this.setState({ Nombre: e.nativeEvent.text })}
                />
              </View>

              {(this.props.data.Type === 'Gerente Soporte' ||
                this.props.data.Type === 'Ing. Soporte' ||
                this.props.data.Type === 'Gerente Mantenimiento' ||
                this.props.data.Type === 'Programador') && (
                  <Picker
                    style={MyStyles.input}
                    selectedValue={this.state.Estado}
                    onValueChange={itemValue =>
                      this.setState({ Estado: itemValue })
                    }
                  >
                    <Picker.Item label="Abierto" value="Abierto" />
                    <Picker.Item label="Pendiente" value="Pendiente" />
                  </Picker>
                )}

              {(this.props.data.Type === 'Gerente Soporte' ||
                this.props.data.Type === 'Ing. Soporte' ||
                this.props.data.Type === 'Gerente Mantenimiento' ||
                this.props.data.Type === 'Programador') && (
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
                )}
            </View>

            <Button
              icon="refresh"
              mode="outlined"
              style={MyStyles.btn}
              onPress={() => this.sendToDB(this.props.data.ID)}
            >
              Agregar Reporte
            </Button>

            {this.state.loading && (
              <ActivityIndicator
                animating={true}
                size={'large'}
                color={Colors.red800}
              />
            )}

          </ScrollView>
        </View>
      </Fragment>
    )
  }
}

const ContextWrapper = props => (
  <UserDataContext.Consumer>
    {({ data }) => <AddReport {...props} data={data} />}
  </UserDataContext.Consumer>
)

export default ContextWrapper
