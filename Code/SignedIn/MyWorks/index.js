import React, { Fragment } from 'react'
import { View, Alert } from 'react-native'
import { ImagePicker } from 'expo'

import { Button, ActivityIndicator } from 'react-native-paper'

import MyHeader from '../../Header'

import UserDataContext from '../../App/UserDataContext'
import { LoaderStateContext } from '../LoaderContext'

class MyWorks extends React.Component {
  state = { loading: false }
  render() {
    return (
      <LoaderStateContext.Consumer>
        {stateLoader => (
          <UserDataContext.Consumer>
            {userData => {
              const { data } = userData
              return (
                <Fragment>
                  <MyHeader text="MyWork" hasSetting />

                  <View style={{ marginBottom: 85, marginTop: 85 }}>
                    <Button
                      onPress={async () => {
                        this.setState({ loading: true })
                        const result = await ImagePicker.launchImageLibraryAsync()
                        if (result.cancelled) return

                        let localUri = result.uri
                        let filename = localUri.split('/').pop()

                        let match = /\.(\w+)$/.exec(filename)
                        let type = match ? `image/${match[1]}` : `image`

                        let formData = new FormData()
                        const name = data.ID + ' ' + filename
                        formData.append('photo', { uri: localUri, name, type })

                        fetch(
                          'http://pablorosas.pythonanywhere.com/upload_file',
                          {
                            method: 'POST',
                            body: formData,
                            header: { 'content-type': 'multipart/form-data' },
                          },
                        ).then(serverResponse => {
                          this.setState({ loading: false })

                          if (serverResponse.ok) {
                            Alert.alert('Imagen subida con exito')
                            stateLoader.setToTrue()
                          }
                        })
                      }}
                    >
                      Subir imagen
                    </Button>

                    {this.state.loading && (
                      <ActivityIndicator
                        animating={true}
                        size={'large'}
                        color={Colors.purple800}
                      />
                    )}
                  </View>
                </Fragment>
              )
            }}
          </UserDataContext.Consumer>
        )}
      </LoaderStateContext.Consumer>
    )
  }
}

export default MyWorks
