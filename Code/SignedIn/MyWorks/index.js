import React, { Fragment } from "react";
import { Text, Button } from "react-native-paper";
import ImagePicker from 'react-native-image-picker';
import { View } from "react-native";

import MyHeader from "../../Header";
import MyStyles from "../../styles";

import { Icon } from "native-base";
import { Data } from "../../App/Data";

const MyWorks = () => {
  return (
    <Data.Consumer>
        {context => {
          const { state } = context;
          return (
            <Fragment>
              <MyHeader
                text="MyWork"
                hasSetting
              />
              <View style={{marginBottom: 85, marginTop: 85}}>
                <Button onPress={() => {

                  const options = {
                    title: 'Select Avatar',
                    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
                    storageOptions: {
                      skipBackup: true,
                      path: 'images',
                    },
                  };
                  
                  ImagePicker.showImagePicker(options, (response) => {
                    console.log('Response = ', response);
                  
                    if (response.didCancel) {
                      console.log('User cancelled image picker');
                    } else if (response.error) {
                      console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                      console.log('User tapped custom button: ', response.customButton);
                    } else {
                      const source = { uri: response.uri };
                      console.log(source)
                    }
                  });
                }}>
                Hi
                </Button>
              </View>
            </Fragment>
          );
        }}
      </Data.Consumer>
  )
}

export default MyWorks