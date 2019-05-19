import React, { Fragment } from 'react'

import { List } from 'react-native-paper'
import { View, ScrollView } from 'react-native'

import MyHeader from './Header'
import MyStyles from './Styles'

import UserDataContext from './App/UserDataContext'

class ShowReportsAndEdit extends React.Component {
  state = { questions: [] }

  componentDidMount() {
    this.setState({ loading: true })

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    }
    fetch('http://pablorosas.pythonanywhere.com/GetPreg', options)
      .then(response => {
        this.setState({ loading: false })

        if (response.ok) return response.json()
        else alert('Algo fue mal con el servidor')
      })
      .then(questions => this.setState({ questions }))
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
          <ScrollView contentContainerStyle={MyStyles.content}>
            <List.Section title="Accordions">
              {this.state.questions.map(question => (
                <List.Accordion
                  title={question.Pregunta}
                  left={props => <List.Icon {...props} icon="question" />}
                >
                  <List.Item title={question.Respuesta} />
                  <List.Item title="Second item" />
                </List.Accordion>
              ))}
            </List.Section>
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
