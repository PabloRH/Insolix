import React, { Fragment } from "react";
import { TextInput, Avatar, Card, Button } from "react-native-paper";
import { View, ScrollView } from "react-native";

import MyHeader from "../../Header";
import MyStyles from "../../styles";

import { Icon } from "native-base";

import UserDataContext from "../../App/UserDataContext";

class Profile extends React.Component {
  render() {
    return (
      <UserDataContext.Consumer>
        {context => {
          const { state } = context
          console.log("Profile")
          console.log(state)
          return (
            <Fragment>
              <MyHeader
                text="Profile"
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
                  <View style={MyStyles.appContainer}>
                    <View style={MyStyles.sideIcon}>
                      <Icon name="person" />
                      <TextInput
                        label="Name"
                        mode="outlined"
                        style={MyStyles.input}
                        disabled
                        value={state.Name}
                      />
                    </View>

                    <View style={MyStyles.sideIcon}>
                      <Icon name="person" />
                      <TextInput
                        label="User"
                        mode="outlined"
                        style={MyStyles.input}
                        disabled
                        value={state.User}
                      />
                    </View>

                    <View style={MyStyles.sideIcon}>
                      <Icon name="mail" />
                      <TextInput
                        label="E-mail"
                        mode="outlined"
                        style={MyStyles.input}
                        disabled
                        value={state.Email}
                      />
                    </View>

                    <Button
                      icon="refresh"
                      mode="outlined"
                      style={MyStyles.btn}
                    >
                      Refresh Info
                    </Button>
                  </View>
                </ScrollView>
              </View>
            </Fragment>
          );
        }}
      </UserDataContext.Consumer>
    );
  }
}

export default Profile;

