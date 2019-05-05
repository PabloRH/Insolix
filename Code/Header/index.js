import React from "react";
import { withRouter } from "react-router-native";
import { Appbar } from "react-native-paper";


class MyHeader extends React.PureComponent {
  render() {
    return (
      <Appbar.Header statusBarHeight={28}>
          {
            this.props.hasAnArrow && <Appbar.BackAction onPress={() => this.props.history.push(this.props.link)} /> 
          }
          <Appbar.Content title={this.props.text} subtitle={this.props.subtitle} />
          {
            this.props.hasSetting && <Appbar.Action icon="more-vert" onPress={() => this.props.history.push(this.props.link)} /> 
          }
        </Appbar.Header>
    );
  }
}
export default withRouter(MyHeader);
