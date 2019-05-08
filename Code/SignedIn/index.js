import React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import Profile from "./Profile"
import Gallery from "./Gallery"
import MyWorks from "./MyWorks"

import { HasToUpdate } from "./state";


const routes = [
  { key: 'Profile', title: 'Profile', icon: 'assignment-ind' },
  { key: 'Gallery', title: 'Gallery', icon: 'collections' },
  { key: 'MyWorks', title: 'My Works', icon: 'camera-enhance' },
]

const Screens = BottomNavigation.SceneMap({ Profile, Gallery, MyWorks });

class SignedIn extends React.Component {
  state = { index: 0, routes};
  handleIndexChange = index => this.setState({ index });

  render() {
    return (
      <HasToUpdate.Provider>
        <BottomNavigation
          navigationState={this.state}
          onIndexChange={this.handleIndexChange}
          renderScene={Screens}
        />
      </HasToUpdate.Provider>
    );
  }
}

export default SignedIn 