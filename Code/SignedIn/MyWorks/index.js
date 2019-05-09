import React, { Fragment } from "react";
import { Text, Button} from "react-native-paper";
import { ImagePicker } from 'expo';
import { View, Alert } from "react-native";

import MyHeader from "../../Header";
import UserDataContext from "../../App/UserDataContext";
import { HasToUpdate } from "../state";

const MyWorks = () => {
  return (
    <HasToUpdate.Consumer>
      { uploading => (
      <UserDataContext.Consumer>
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

                    if (result.cancelled) return

                    let localUri = result.uri
                    let filename = localUri.split('/').pop()

                    let match = /\.(\w+)$/.exec(filename)
                    let type = match ? `image/${match[1]}` : `image`

                    let formData = new FormData()
                    formData.append('photo', { uri: localUri, name: state.ID + " " + filename, type })

                    const serverResponse = await fetch('http://pablorosas.pythonanywhere.com/upload_file', {
                      method: 'POST',
                      body: formData,
                      header: {
                        'content-type': 'multipart/form-data',
                      },
                    })
                    
                    if (serverResponse.ok) {
                      Alert.alert("Imagen subida con exito")
                      uploading.setToTrue()
                    }
                  
                  }}>
                  Hi
                  </Button>
                </View>
              </Fragment>
            );
          }}
      </UserDataContext.Consumer>
      )}
    </HasToUpdate.Consumer>
  )
}

export default MyWorks