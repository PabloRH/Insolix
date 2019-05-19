import React, { Fragment } from 'react'

import { List, ActivityIndicator, Colors } from 'react-native-paper'
import { Button, View, ScrollView } from 'react-native'

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
            {this.state.loading && (
              <ActivityIndicator
                animating={true}
                size={'large'}
                color={Colors.red800}
              />
            )}

            <List.Section title="Preguntas y Respuestas">
              {this.state.questions.map(question => (
                <List.Accordion
                  key={question.IDPregu}
                  title={question.Pregunta}
                  left={props => <List.Icon {...props} icon="question" />}
                >
                  <List.Item
                    title={`Respuesta:
                    ${question.Respuesta}`}
                  />
                  <List.Item title={`Likes: ${question.Like}`} />
                  <List.Item title={`Dislikes: ${question.Dislikes}`} />
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
