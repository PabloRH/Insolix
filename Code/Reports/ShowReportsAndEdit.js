import React, { Fragment } from 'react'
import { Button } from 'react-native-paper'

import { Colors, ActivityIndicator, DataTable } from 'react-native-paper'
import { TextInput, Text } from 'react-native-paper'
import { View, ScrollView, RefreshControl, Picker, ToastAndroid } from 'react-native'

import MyHeader from '../Header'
import MyStyles from '../Styles'

import UserDataContext from '../App/UserDataContext'

class ShowReportsAndEdit extends React.Component {
  state = { reports: [] }

  componentDidMount() {
    this.setState({ loading: true })

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    }

    fetch('http://pablorosas.pythonanywhere.com/GetReports', options)
      .then(response => {

        if (response.ok) return response.json()
        else {
          alert('Algo fue mal con el servidor')
          this.setState({ loading: false })
        }
      })
      .then(reports => {
        console.log({reports})
        if (this.props.data.Type === 'Programador') {
          const result = reports.filter(r => r.AsigID == 5)
          this.setState({ reports: result, ...result[0], loading: false })
        }
        else if (this.props.data.Type === 'Ing. Soporte') {
          const result = reports.filter(r => r.AsigID == 2)
          this.setState({ reports: result, ...result[0], loading: false })
        }
        else if (this.props.data.Type === 'Programador' || this.props.data.Type === 'Gerente Mantenimiento') {
          const result = reports.filter(r => r.Tipo === 'Mantenimiento')
          this.setState({ reports: result, ...result[0], loading: false })
        } 
        else {
          const result = reports.filter(r => r.Tipo != 'Mantenimiento')
          this.setState({ reports: result, ...result[0], loading: false })
        }
      })
      
  }

  sendToDB = () => {
    const data = { ...this.state }

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }

    fetch('http://pablorosas.pythonanywhere.com/UpdateOpera', options)
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
          return response.json()}
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
        <MyHeader
          text="Profile"
          subtitle={this.props.data.Type}
          link="/"
          hasSetting
        />
        <View style={{ marginBottom: 85 }}>
          <ScrollView contentContainerStyle={MyStyles.content}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={() => this.componentDidMount()}
            />
          }
          >
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Numero</DataTable.Title>
                <DataTable.Title>Texto</DataTable.Title>
                <DataTable.Title numeric>Id de Usuario</DataTable.Title>
              </DataTable.Header>

              {this.state.reports.map(report => (
                <DataTable.Row
                  key={report.NoReporte}
                  onPress={() => {
                    this.setState({ ...report })
                  }}
                >
                  <DataTable.Cell>{report.NoReporte}</DataTable.Cell>
                  <DataTable.Cell>{report.Reporte}</DataTable.Cell>
                  <DataTable.Cell numeric>{report.UserID}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>

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

              <Picker
                style={MyStyles.input}
                selectedValue={this.state.Tipo}
                enabled={
                  this.props.data.Type !== 'Programador' &&
                  this.props.data.Type !== 'Gerente Mantenimiento'
                }
                onValueChange={itemValue => this.setState({ Tipo: itemValue })}
              >
                <Picker.Item label="Error" value="Error" />
                <Picker.Item label="Duda" value="Duda" />
                <Picker.Item label="Mejora" value="Mejora" />
                <Picker.Item label="Mantenimiento" value="Mantenimiento" />
                <Picker.Item label="No responden" value="No responden" />
              </Picker>

              {this.props.data.Type === 'Gerente Soporte' && (
                <Picker
                  style={MyStyles.input}
                  selectedValue={this.state.AsigID}
                  onValueChange={itemValue =>
                    this.setState({ AsigID: itemValue })
                  }
                >
                  <Picker.Item label="Gerente Ceron" value={3} />
                  <Picker.Item label="Inge Gaddi" value={2} />
                </Picker>
              )}

              {this.props.data.Type === 'Gerente Mantenimiento' && (
                <Picker
                  style={MyStyles.input}
                  selectedValue={this.state.AsigID}
                  onValueChange={itemValue =>
                    this.setState({ AsigID: itemValue })
                  }
                >
                  <Picker.Item label="Gerente Fernanda" value={4} />
                  <Picker.Item label="Programador Oscar" value={5} />
                </Picker>
              )}

              {this.props.data.Type === 'Ing. Soporte' && (
                <Picker
                  style={MyStyles.input}
                  selectedValue={this.state.Estado}
                  onValueChange={itemValue =>
                    this.setState({ Estado: itemValue })
                  }
                >
                  <Picker.Item label="Abierto" value="Abierto" />
                  <Picker.Item label="Cerrado" value="Cerrado" />
                  <Picker.Item label="Pendiente" value="Pendiente" />
                </Picker>
              )}

              {this.props.data.Type === 'Programador' && (
                <Picker
                  style={MyStyles.input}
                  selectedValue={this.state.Estado}
                  onValueChange={itemValue =>
                    this.setState({ Estado: itemValue })
                  }
                >
                  <Picker.Item label="Abierto" value="Abierto" />
                  <Picker.Item label="Cerrado" value="Cerrado" />
                  <Picker.Item label="Pendiente" value="Pendiente" />
                  <Picker.Item label="Solucionado" value="Solucionado" />
                </Picker>
              )}

              {(this.props.data.Type === 'Ing. Soporte' ||
                this.props.data.Type === 'Programador') && (
                <View style={MyStyles.sideIcon}>
                  <TextInput
                    label="Respuesta"
                    mode="outlined"
                    multiline
                    style={MyStyles.input}
                    value={this.state.Respues}
                    onChange={e =>
                      this.setState({ Respues: e.nativeEvent.text })
                    }
                  />
                </View>
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
                  disabled
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
              onPress={this.sendToDB}
            >
              Refresh Reports
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
    {({ data }) => <ShowReportsAndEdit {...props} data={data} />}
  </UserDataContext.Consumer>
)

export default ContextWrapper
