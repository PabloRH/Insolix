import React from 'react'
import { BottomNavigation } from 'react-native-paper'

import Profile from './Profile'
import Gallery from './Gallery'
import MyWorks from './MyWorks'

import { LoaderStateContext, createLoaderState } from './LoaderContext'
const loaderState = createLoaderState(true)

const routes = [
  { key: 'Profile', title: 'Profile', icon: 'assignment-ind' },
  { key: 'Gallery', title: 'Gallery', icon: 'collections' },
  { key: 'MyWorks', title: 'My Works', icon: 'camera-enhance' },
]

const Screens = BottomNavigation.SceneMap({ Profile, Gallery, MyWorks })

class SignedInScreens extends React.Component {
  state = { index: 0, routes }
  handleIndexChange = index => this.setState({ index })

  render() {
    return (
      <LoaderStateContext.Provider value={loaderState}>
        <BottomNavigation
          shifting
          navigationState={this.state}
          onIndexChange={this.handleIndexChange}
          renderScene={Screens}
        />
      </LoaderStateContext.Provider>
    )
  }
}

export default SignedInScreens
