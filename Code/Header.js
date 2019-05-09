import React from 'react'
import { withRouter } from 'react-router-native'
import { Appbar } from 'react-native-paper'

const MyHeader = props => {
  const onPressBack = () => props.history.push(props.link)
  return (
    <Appbar.Header statusBarHeight={28}>
      {props.hasAnArrow && <Appbar.BackAction onPress={onPressBack} />}
      <Appbar.Content title={props.text} subtitle={props.subtitle} />
      {props.hasSetting && (
       <Appbar.Action icon="more-vert" onPress={} />
      )}
    </Appbar.Header>
  )
}
export default withRouter(MyHeader)
