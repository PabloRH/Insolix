import React from "react";
import { Font, AppLoading } from "expo";

import App from "./Code/App"

class AppContainer extends React.Component {
  state = { loading: true };

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });

    this.setState({ loading: false });
  }

  render() {
    return this.state.loading?  <AppLoading /> : <App />
  }
}

export default AppContainer;

