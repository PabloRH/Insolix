import React, { Fragment } from 'react'
import { ScrollView } from 'react-native'

import { Avatar, Card, Paragraph } from 'react-native-paper'
import { withRouter } from 'react-router-native'

import MyHeader from './Header'
import MyStyles from './Styles'

const FAQs = props => {
  return (
    <Fragment>
      <MyHeader text="Derbild" subtitle="Welcome" hasAnArrow />
      <ScrollView>
        <Card style={MyStyles.margen}>
          <Card.Title
            title="!Bienvenido a FAQ's"
            subtitle=""
            left={props => (
              <Avatar.Icon {...props} icon={require('../assets/icon.png')} />
            )}
          />
          <Card.Content>
            <Paragraph>
              Bienvenido a FAQ's en caso que tengas alguna duda, es posible que otros usuarios 
              tambien los tenga.
              Tengo mas dudas.
            </Paragraph>
          </Card.Content>
        </Card>

      </ScrollView>
    </Fragment>
  )
}

export default withRouter(FAQs)
