import React, { Fragment } from "react";
import { TextInput, Avatar, Card, Button } from "react-native-paper";
import { View, ScrollView } from "react-native";

import MyHeader from "../../Header";
import MyStyles from "../../styles";

import { Icon } from "native-base";

class Gallery extends React.Component {
  render() {
    return (
      <Data.Consumer>
        {context => {
          const { state } = context;
          return (
            <Fragment>
              <MyHeader
                text="Gallery"
                subtitle={state.Type}
                link="/"
                hasSetting
              />
              <View style={MyStyles.appContainer}>
                <ScrollView>
                  <Card style={MyStyles.margen}>
                    <Card.Title
                      title={state.Name}
                      subtitle={state.User}
                      left={props => (
                        <Avatar.Image
                          size={50}
                          source={require("../../../assets/avatar.png")}
                        />
                      )}
                    />
                    <Card.Content />
                  </Card>
                </ScrollView>
              </View>
            </Fragment>
          );
        }}
      </Data.Consumer>
    );
  }
}

export default Gallery;

