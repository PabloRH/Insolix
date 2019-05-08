import React, { Fragment } from "react";
import { Text, Button} from "react-native-paper";
import { ImagePicker } from 'expo';
import { View, Alert } from "react-native";

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
                <Button onPress={async () => {

                  const result = await ImagePicker.launchImageLibraryAsync()
                  console.log(result)

                  if (result.cancelled) return

                  let localUri = result.uri
                  let filename = localUri.split('/').pop()

                  let match = /\.(\w+)$/.exec(filename)
                  let type = match ? `image/${match[1]}` : `image`

                  let formData = new FormData()
                  formData.append('photo', { uri: localUri, name: filename + " " + state.ID, type })

                  const serverResponse = await fetch('http://pablorosas.pythonanywhere.com/upload_file', {
                    method: 'POST',
                    body: formData,
                    header: {
                      'content-type': 'multipart/form-data',
                    },
                  })
                  
                  if (serverResponse.ok) Alert.alert("Imagen subida con exito")
                  console.log(serverResponse)
                 
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