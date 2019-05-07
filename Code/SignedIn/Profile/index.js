import React, { Fragment } from "react";
import { Text, TextInput, Avatar, Card, Button } from "react-native-paper";
import { View, Icon, ScrollView } from "react-native";

import MyHeader from "../../Header";
import MyStyles from "../../styles";

class Profile extends React.Component {
  
  render() {
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
                    size={12}
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
                  value={"pepe"}
                />
              </View>

              <Button
                icon="send"
                mode="outlined"
                onPress={this.sendToDB}
                style={MyStyles.btn}
              >
                Sign Up
              </Button>
            </View>
          </ScrollView>
        </View>
      </Fragment>
    );
  }
}

export default Profile
