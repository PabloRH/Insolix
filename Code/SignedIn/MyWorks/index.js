import React, { Fragment } from 'react'
import { Text, Button, ActivityIndicator, Colors } from 'react-native-paper'
import { ImagePicker } from 'expo'
import { View, Alert } from 'react-native'

import MyHeader from '../../Header'
import UserDataContext from '../../App/UserDataContext'
import { HasToUpdate } from '../LoaderStateContext'

class MyWorks extends React.Component {
  state = { loading: false }
  render() {
    return (
      <HasToUpdate.Consumer>
        {uploading => (
          <UserDataContext.Consumer>
            {userData => {
              const { data } = userData
              return (
                <Fragment>
                  <MyHeader text="MyWork" hasSetting />
                  <View style={{ marginBottom: 85, marginTop: 85 }}>
                    {this.state.loading && (
                      <ActivityIndicator
                        animating={true}
                        size={'large'}
                        color={Colors.red800}
                      />
                    )}
                    <Button
                      mode="contained"
                      style={{margin: 16}}
                      onPress={async () => {
                        if (this.state.loading) return
                        this.setState({loading: true})
                        const result = await ImagePicker.launchImageLibraryAsync()

                        if (result.cancelled) return

                        let localUri = result.uri
                        let filename = localUri.split('/').pop()

                        let match = /\.(\w+)$/.exec(filename)
                        let type = match ? `image/${match[1]}` : `image`

                        let formData = new FormData()
                        formData.append('photo', {
                          uri: localUri,
                          name: data.ID + ' ' + filename,
                          type,
                        })

                        const serverResponse = await fetch(
                          'http://pablorosas.pythonanywhere.com/upload_file',
                          {
                            method: 'POST',
                            body: formData,
                            header: {
                              'content-type': 'multipart/form-data',
                            },
                          },
                        )

                        if (serverResponse.ok) {
                          this.setState({loading: false})
                          Alert.alert('Imagen subida con exito')
                          uploading.setToTrue()
                        }
                        else {
                          this.setState({loading: false})
                        }
                      }}
                    >
                      {this.state.loading? "Subiendo" : "Subir"} imagen
                    </Button>
                  </View>
                </Fragment>
              )
            }}
          </UserDataContext.Consumer>
        )}
      </HasToUpdate.Consumer>
    )
  }
}

export default MyWorks
