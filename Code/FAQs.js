import React, { Fragment } from 'react'

import { IconButton, List, ActivityIndicator, Colors } from 'react-native-paper'
import { Alert, View, Text, ScrollView } from 'react-native'

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
          <ScrollView>
            <List.Section title="Preguntas y Respuestas">
              {this.state.questions.map(question => {
                const onceUp = () => {
                  if (onceUp.done) return
                  const options = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ IDPregu: question.IDPregu }),
                  }
                  fetch('http://pablorosas.pythonanywhere.com/Like', options)
                  onceUp.done = true
                }

                const onceDown = () => {
                  if (onceDown.done) return
                  const options = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ IDPregu: question.IDPregu }),
                  }
                  fetch('http://pablorosas.pythonanywhere.com/Dislike', options)
                  onceDown.done = true
                }

                return (
                  <List.Accordion
                    key={question.IDPregu}
                    title={question.Pregunta}
                    left={props => (
                      <IconButton {...props} icon="question-answer" />
                    )}
                  >
                    <List.Item
                      title="+"
                      onPress={() => Alert.alert('Pregunta', question.Pregunta)}
                      left={props => <IconButton {...props} icon="more" />}
                    />
                    <List.Item
                      left={props => (
                        <IconButton
                          {...props}
                          icon="question-answer"
                          onPress={() =>
                            Alert.alert('Respuesta', question.Pregunta)
                          }
                        />
                      )}
                      title={`${question.Respuesta}`}
                      right={props => (
                        <Fragment>
                          <IconButton
                            {...props}
                            onPress={onceUp}
                            icon="thumb-up"
                          />
                          <Text>{` `}</Text>
                          <IconButton
                            {...props}
                            onPress={onceDown}
                            icon="thumb-down"
                          />
                        </Fragment>
                      )}
                    />
                  </List.Accordion>
                )
              })}
            </List.Section>

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
