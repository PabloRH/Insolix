import React, { Fragment } from "react";
import { TextInput, Avatar, Card, Button } from "react-native-paper";
import { View, ScrollView } from "react-native";

import MyHeader from "../../Header";
import MyStyles from "../../styles";

import { Icon } from "native-base";

import { Data } from "../../App/Data";

class Profile extends React.Component {
  render() {
    return (
      <Data.Consumer>
        {context => {
          const { state } = context
          return (
            <Fragment>
              <MyHeader
                text="Usuario"
                subtitle="tipo de usuario"
                link="/"
                hasSetting
              />
              <View style={MyStyles.appContainer}>
                <ScrollView>
                  <Card style={MyStyles.margen}>
                    <Card.Title
                      title="Nombre"
                      subtitle="Apellido"
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
                      icon="send"
                      mode="outlined"
                      onPress={() => this.setState({ blob: this.blob + 1 })}
                      style={MyStyles.btn}
                    >
                      Sign Up {this.state.blob}
                    </Button>
                  </View>
                </ScrollView>
              </View>
            </Fragment>
          );
        }}
      </Data.Consumer>
    );
  }
}

export default Profile;

