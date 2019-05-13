
import React, { Fragment } from 'react'
import { View, ScrollView } from 'react-native'

import { Card, TextInput, Button, DataTable, Colors, ActivityIndicator, } from 'react-native-paper'
import { withRouter } from 'react-router-native'

import MyHeader from './Header'
import MyStyles from './Styles'
import { Icon } from 'native-base'

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
      NomReport: this.state.NomReport,
      Reporte: this.state.Reporte,
      Fecha: this.state.Fecha,
      Resp: this.state.Resp,
      asig: this.state.asig,
      esta: this.state.esta,
      tipo: this.state.tipo,
      id: this.props.data.ID
    }

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }

    fetch('http://pablorosas.pythonanywhere.com/ReportesEve', options)
      .then(response => {
        this.setState({ loading: false })

        if (response.ok) return response.json()
        else alert('Algo fue mal con el servidor ')
      })
      .then(() => {
        this.setState({ loading: false })
        alert("Reporte hecho, su respuesta se atendera por su Correo Electronico.")
      })
    this.setState({ loading: true })
  }

  render() {
    return (
      <Fragment>
        <MyHeader text="Reportes" subtitle="Eventos" link="/" hasSetting />
        <View style={MyStyles.appContainer}>
          <ScrollView>
            <Card style={MyStyles.margen}>
              <Card.Title
                title="Reporte de Eventos"
                subtitle="Por Favor Ecribe tu problemas"
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

              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Id-Usuario</DataTable.Title>
                  <DataTable.Title numeric>Id-reporte</DataTable.Title>
                  <DataTable.Title numeric>Reporte</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                  <DataTable.Cell>Frozen yogurt</DataTable.Cell>
                  <DataTable.Cell numeric>159</DataTable.Cell>
                  <DataTable.Cell numeric>6.0</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                  <DataTable.Cell numeric>237</DataTable.Cell>
                  <DataTable.Cell numeric>8.0</DataTable.Cell>
                </DataTable.Row>
              </DataTable>

              <View style={MyStyles.sideIcon}>
                <TextInput
                  label="Fecha"
                  mode="outlined"
                  keyboardType='numeric'
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
                  value={this.state.NomReport}
                  onChange={e => this.setState({ NomReport: e.nativeEvent.text })}
                />
              </View>

              <Picker
                style={MyStyles.input}
                selectedValue={this.state.esta}
                onValueChange={itemValue => this.setState({ esta: itemValue })}
              >
                <Picker.Item label="Abierto" value="Abierto" />
                <Picker.Item label="Cerrado" value="Cerrado" />
              </Picker>

              <Picker
                style={MyStyles.input}
                selectedValue={this.state.asig}
                onValueChange={itemValue => this.setState({ asig: itemValue })}
              >
                <Picker.Item label="Gerente. Ceron" value="Ceron" />
                <Picker.Item label="Ing. Gaddi" value="Gaddi" />
              </Picker>

              <Picker
                style={MyStyles.input}
                selectedValue={this.state.tipo}
                onValueChange={itemValue => this.setState({ tipo: itemValue })}
              >
                <Picker.Item label="Error" value="Error" />
                <Picker.Item label="Duda" value="Duda" />
                <Picker.Item label="Mejora" value="Mejora" />
                <Picker.Item label="No responden" value="No responden" />
              </Picker>

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

              <View style={MyStyles.sideIcon}>
                <TextInput
                  label="Respeusta"
                  mode="outlined"
                  multiline
                  style={MyStyles.input}
                  value={this.state.Resp}
                  onChange={e => this.setState({ Resp: e.nativeEvent.text })}
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