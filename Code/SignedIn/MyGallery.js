import React, { Fragment } from 'react'
import { View, ScrollView, Image, RefreshControl } from 'react-native'

import MyHeader from '../Header'
import MyStyles from '../Styles'

import UserDataContext from '../App/UserDataContext'
import { HasToUpdate } from './LoaderStateContext'

const myURL = 'http://pablorosas.pythonanywhere.com/static/'
const defaultPhotos = []

class Gallery extends React.Component {
  state = { Photos: defaultPhotos, refreshing: false }

  getLatestPhotos = () => {
    if (this.props.loaderState.getValue() == false) return

    this.setState({ refreshing: true })
    this.getPhotos(this.props.data.ID)
    this.props.loaderState.setToFalse()
  }

  componentDidMount() {
    this.getLatestPhotos()
  }

  getPhotos = id => {
    this.setState({ refreshing: true })

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
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
          text="My Gallery"
          subtitle={this.props.data.Name}
          link="/"
          hasSetting
        />

        <View style={{ marginBottom: 85 }}>
          <ScrollView
            contentContainerStyle={MyStyles.content}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.getLatestPhotos}
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
