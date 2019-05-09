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

  uploadImages() {
    if (this.props.loaderState.hasToLoadImages() == false) return

    this.setState({ refreshing: true })
    this.getPhotos(this.props.userData.ID)
    this.props.loaderState.setToFalse()
  }

  componentDidMount() {
    this.uploadImages(this.props.userData.ID)
  }

  getPhotos = userID => {
    this.setState({ refreshing: true })

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userID }),
    }

    fetch('http://pablorosas.pythonanywhere.com/GetPhotos', options)
      .then(response => {
        console.log(response)
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
      <Fragment>
        <MyHeader
          text="Gallery"
          subtitle={this.props.userData.Type}
          link="/"
          hasSetting
        />

        <View style={{ marginBottom: 85 }}>
          <ScrollView
            contentContainerStyle={MyStyles.content}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.uploadImages}
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
  }
}

const ContextWrapper = props => (
  <LoaderStateContext.Consumer>
    {loaderState => (
      <UserDataContext.Consumer>
        {userData => <Gallery {...props} {...{ loaderState, userData }} />}
      </UserDataContext.Consumer>
    )}
  </LoaderStateContext.Consumer>
)

export default ContextWrapper
