import React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import Profile from "./Profile"
const Gallery = () => <Text>Gallery</Text>;
const MyWork = () => <Text>MyWork</Text>;

const routes = [
  { key: 'Profile', title: 'Profile', icon: 'queue-music' },
  { key: 'Gallery', title: 'Gallery', icon: 'album' },
  { key: 'MyWork', title: 'My Work', icon: 'history' },
]

Screens = BottomNavigation.SceneMap({ Profile, Gallery, MyWork });

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