import React,{ Fragment }from 'react'
import { withRouter } from 'react-router-native'
import { Appbar, Menu } from 'react-native-paper'

const MyHeader = props => {
  const onPressBack = () => props.history.push(props.link)
  return (
    <Appbar.Header statusBarHeight={28}>
      {props.hasAnArrow && <Appbar.BackAction onPress={onPressBack} />}
      <Appbar.Content title={props.text} subtitle={props.subtitle} />
      {props.hasSetting && (
        <Fragment>
        <Menu><Appbar.Action icon="more-vert" onPress={this._openMenu} /></Menu>
        <Menu.Item onPress={() => {}} title="Item 1" />
        <Menu.Item onPress={() => {}} title="Item 2" />
        </Fragment>
      )}
    </Appbar.Header>
  )
}
export default withRouter(MyHeader)
