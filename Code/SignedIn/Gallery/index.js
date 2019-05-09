import React, { Fragment } from 'react'
import { View, ScrollView, Image, RefreshControl } from 'react-native'

import UserDataContext from '../../App/UserDataContext'
import { LoaderStateContext } from '../LoaderContext'

import MyHeader from '../../Header'
import MyStyles from '../../Styles'

const myURL = 'http://pablorosas.pythonanywhere.com/static/'
const defaultURL = 'https://unsplash.it/300/300/?random&__id='
const defaultImages = Array.from({ length: 4 }).map((_, i) => defaultURL + i)

class Gallery extends React.Component {
  state = { Photos: defaultImages, refreshing: false }

  getPhotos = userID => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userID }),
    }

    fetch('http://pablorosas.pythonanywhere.com/GetPhotos', options)
      .then(response => {
        this.setState({ refreshing: false })

        if (response.ok) return response.json()
        else alert('Algo fue mal con el servidor')
      })
      .then(newPhotos => {
        if (newPhotos == null) return

        const myPhotos = newPhotos.map(photo => myURL + photo.HashID)
        let newPhotosUnique = [...myPhotos, ...this.state.Photos].filter(
          (photo, index, self) => self.indexOf(photo) === index,
        )

        console.log(newPhotosUnique)
        this.setState({ Photos: newPhotosUnique })
      })
  }

  render() {
    return (
      <LoaderStateContext.Consumer>
        {loaderState => (
          <UserDataContext.Consumer>
            {userData => {
              const { data } = userData

              if (loaderState.hasToUpdate()) {
                this.setState({ refreshing: true })
                this.getPhotos(data.ID)
                loaderState.setToFalse()
              }

              return (
                <Fragment>
                  <MyHeader
                    text="Gallery"
                    subtitle={data.Type}
                    link="/"
                    hasSetting
                  />

                  <View style={{ marginBottom: 85 }}>
                    <ScrollView
                      contentContainerStyle={MyStyles.content}
                      refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={() => {
                            if (loaderState.hasToUpdate()) {
                              this.setState({ refreshing: true })
                              this.componentWillReceiveProps
                              this.getPhotos(data.ID)
                              loaderState.setToFalse()
                            }

                          }}
                        />
                      }
                    >
                      {this.state.Photos.map(uri => (
                        <View key={uri} style={MyStyles.item}>
                          <Image source={{ uri }} style={MyStyles.photo} />
                        </View>
                      ))}
                    </ScrollView>
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

export default Gallery
