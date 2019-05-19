import React, { Fragment } from 'react'
import { Button } from 'react-native-paper'

import { Colors, ActivityIndicator, DataTable } from 'react-native-paper'
import { TextInput } from 'react-native-paper'
import { View, Text } from 'react-native'

import MyHeader from './Header'
import MyStyles from './Styles'

import UserDataContext from './App/UserDataContext'

class AddQuestion extends React.Component {
  state = { reports: [] }

  componentDidMount() {
    this.setState({ loading: true })

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    }

    fetch('http://pablorosas.pythonanywhere.com/GetReportsCerrados', options)
      .then(response => {
        this.setState({ loading: false })

        if (response.ok) return response.json()
        else alert('Algo fue mal con el servidor')
      })
      .then(reports => {
        this.setState({ reports })
      })
  }

  sendToDB = () => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        NoPregu: this.state.NoPregu,
        Pregunta: this.state.Nombre,
        Respuesta: this.state.Respues,
      }),
    }

    console.log(options)
    fetch('http://pablorosas.pythonanywhere.com/AddQuestion', options)
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
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Nombre Reporte</DataTable.Title>
            <DataTable.Title>Reporte</DataTable.Title>
            <DataTable.Title>Estado</DataTable.Title>
          </DataTable.Header>

          {this.state.reports.map(report => (
            <DataTable.Row
              key={report.NoReporte}
              onPress={() => {
                this.setState({ ...report })
              }}
            >
              <DataTable.Cell>{report.Nombre}</DataTable.Cell>
              <DataTable.Cell>{report.Reporte}</DataTable.Cell>
              <DataTable.Cell>{report.Estado}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>

        <View>
          <View style={MyStyles.sideIcon}>
            <TextInput
              label="No Pregunta"
              mode="outlined"
              style={MyStyles.input}
              value={this.state.NoPregu}
              onChange={e => this.setState({ NoPregu: e.nativeEvent.text })}
            />
          </View>

          <View style={MyStyles.sideIcon}>
            <TextInput
              label="Pregunta"
              mode="outlined"
              style={MyStyles.input}
              value={this.state.Nombre}
              onChange={e => this.setState({ Nombre: e.nativeEvent.text })}
            />
          </View>

          <View style={MyStyles.sideIcon}>
            <TextInput
              label="Respuesta"
              mode="outlined"
              multiline
              style={MyStyles.input}
              value={this.state.Respues}
              onChange={e => this.setState({ Respues: e.nativeEvent.text })}
            />
          </View>

          <View style={MyStyles.sideIcon}>
            <Text>Reporte: </Text>
            <Text>{this.state.Reporte}</Text>
          </View>
        </View>

        {this.state.loading && (
          <ActivityIndicator
            animating={true}
            size={'large'}
            color={Colors.red800}
          />
        )}

        <Button
          icon="refresh"
          mode="outlined"
          style={MyStyles.btn}
          onPress={this.sendToDB}
        >
          Agregar pregunta
        </Button>
      </Fragment>
    )
  }
}

const ContextWrapper = props => (
  <UserDataContext.Consumer>
    {({ data }) => <AddQuestion {...props} data={data} />}
  </UserDataContext.Consumer>
)

export default ContextWrapper
