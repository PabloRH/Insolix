import React, { Fragment } from 'react'
import { View, ScrollView, Image, RefreshControl } from 'react-native'

import MyHeader from '../../Header'
import MyStyles from '../../Styles'

import UserDataContext from '../../App/UserDataContext'
import { HasToUpdate } from '../LoaderStateContext'

const myURL = 'http://pablorosas.pythonanywhere.com/static/'
const defaultURL = 'https://unsplash.it/300/300/?random&__id'
const defaultPhotos = Array.from({ length: 4 }).map((_, i) => defaultURL + i)

class Gallery extends React.Component {
  state = { Photos: defaultPhotos, refreshing: false }

  uploadImages = () => {
    if (this.props.loaderState.getValue() == false) return

    this.setState({ refreshing: true })
    this.getPhotos(this.props.data.ID)
    this.props.loaderState.setToFalse()
  }

  componentDidMount() {
    this.uploadImages()
  }

  getPhotos = id => {
    this.setState({ refreshing: true })

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    }

    console.log({options})

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
        newPhotosUnique = [...myPhotos, ...this.state.Photos].filter(
          (photo, index, self) => self.indexOf(photo) === index,
        )
        console.log(newPhotosUnique)
        this.setState({ Photos: newPhotosUnique, refreshing: false })
      })
  }

  render() {
    return (
      <Fragment>
        <MyHeader
          text="Gallery"
          subtitle={this.props.data.Type}
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
  <HasToUpdate.Consumer>
    {loaderState => (
      <UserDataContext.Consumer>
        { ({data}) => <Gallery {...props} loaderState={loaderState} data={data} />}
      </UserDataContext.Consumer>
    )}
  </HasToUpdate.Consumer>
)

export default ContextWrapper
