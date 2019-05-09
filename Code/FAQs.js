import React, { Fragment } from 'react'
import { View, ScrollView } from 'react-native'

import { Avatar, Card, Text, Paragraph } from 'react-native-paper'
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
            title="!Bienvenido a FAQ"
            subtitle="(╯✧▽✧)╯"
            left={props => (
              <Avatar.Icon {...props} icon={require('../assets/icon.png')} />
            )}
          />
          <Card.Content>
            <Paragraph>
              Antes que nada te damos la bienvenida a Derbild, una App para
              Fotografos por favor diviertete, si tienes algun problema,
              perdon... Σ(°△°)
            </Paragraph>
          </Card.Content>
        </Card>

      </ScrollView>
    </Fragment>
  )
}

export default withRouter(FAQs)
