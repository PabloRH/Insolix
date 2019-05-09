import React from 'react'
import { withRouter } from 'react-router-native'
import { Alert } from 'react-native'

import { Appbar } from 'react-native-paper'

const MyHeader = props => {
  return (
    <Appbar.Header statusBarHeight={28}>
      {props.hasAnArrow && <Appbar.BackAction onPress={props.history.goBack} />}
      <Appbar.Content title={props.text} subtitle={props.subtitle} />
      {props.hasSetting && (
        <Appbar.Action
          icon="more-vert"
          onPress={() => {
            Alert.alert(
              'More',
              '',
              [
                { text: 'FAQs', onPress: () => props.history.push('/FAQs') },
                {
                  text: 'Reportes',
                  onPress: () => props.history.push('/Reportes'),
                },
                { text: 'Salir', onPress: () => props.history.push('/') },
              ],
              { cancelable: false },
            )
          }}
        />
      )}
    </Appbar.Header>
  )
}
export default withRouter(MyHeader)
