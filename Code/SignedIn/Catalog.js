import React, { Fragment } from 'react'
import { View, ScrollView, RefreshControl, Image } from 'react-native'

import { Avatar, Button, Card } from 'react-native-paper'

import MyHeader from '../Header'
import MyStyles from '../Styles'

import UserDataContext from '../App/UserDataContext'
import { HasToUpdate } from './LoaderStateContext'

const myURL = 'http://pablorosas.pythonanywhere.com/static/'
const defaultPhotos = []

class FullWidthImage extends React.Component {
  state = { width: 0, height: 0 }
  _onLayout(event) {
    const containerWidth = event.nativeEvent.layout.width

    Image.getSize(this.props.source.uri, (width, height) => {
      this.setState({
        width: containerWidth,
        height: (containerWidth * height) / width,
      })
    })
  }

  render() {
    return (
      <View onLayout={this._onLayout.bind(this)}>
        <Image
          source={this.props.source}
          style={{
            width: this.state.width,
            height: this.state.height,
          }}
        />
      </View>
    )
  }
}

class Catalog extends React.Component {
  state = { Photos: defaultPhotos, refreshing: false }

  getLatestPhotos = () => {
    if (this.state.refreshing) return

    this.setState({ refreshing: true })
    this.getPhotos(this.props.data.ID)
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

    fetch('http://pablorosas.pythonanywhere.com/OthersPhotos', options)
      .then(response => {
        this.setState({ refreshing: false })

        if (response.ok) return response.json()
        else alert('Algo fue mal con el servidor')
      })
      .then(newPhotos => {
        if (newPhotos == null) return

        const myPhotos = newPhotos.map(photo => {
          return {
            uri: myURL + photo.HashID,
            name: photo.Name,
            height: null,
            width: null,
          }
        })

        const newPhotosUnique = [...myPhotos, ...this.state.Photos].reduce((acc, current) => {
          const x = acc.find(item => item.uri === current.uri);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);

        this.setState({ Photos: newPhotosUnique, refreshing: false })
      })
  }

  render() {
    return (
      <Fragment>
        <MyHeader
          text="Catalog"
          subtitle={this.props.data.Name}
          link="/"
          hasSetting
        />

        <View style={{ marginBottom: 85 }}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.getLatestPhotos}
              />
            }
          >
            {this.state.Photos.map(({ uri, name }) => {
              return (
                <Card key={uri} elevation={2} style={{ margin: 9 }}>
                  <Card.Title
                    title={name}
                    left={props => <Avatar.Icon {...props} icon="face" />}
                  />
                  <Card.Content>
                    <FullWidthImage source={{ uri }} />
                  </Card.Content>
                  <Card.Actions>
                    <Button>Like</Button>
                  </Card.Actions>
                </Card>
              )
            })}
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
        {({ data }) => (
          <Catalog {...props} loaderState={loaderState} data={data} />
        )}
      </UserDataContext.Consumer>
    )}
  </HasToUpdate.Consumer>
)

export default ContextWrapper
