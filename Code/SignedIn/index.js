import React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import Profile from "./Profile"
const Gallery = () => "Gallery"
const MyWorks = () => "MyWorks"

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
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this.handleIndexChange}
        renderScene={Screens}
      />
    );
  }
}

export default SignedIn 