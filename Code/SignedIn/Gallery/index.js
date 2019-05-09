import React, { Fragment } from "react";
import { TextInput, Avatar, Card, Button } from "react-native-paper";
import { View, ScrollView, Image, RefreshControl } from "react-native";
import MyHeader from "../../Header";
import MyStyles from "../../Styles";

import { Icon } from "native-base";
import UserDataContext from "../../App/UserDataContext";
import { HasToUpdate } from "../state";

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    const Photos = Array.from({ length: 4 }).map(
      (_, i) =>
        `https://unsplash.it/300/300/?random&__id=${this.props.route.key}${i}`
    );
    this.state = { Photos, refreshing: false };
  }

<<<<<<< HEAD
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
=======
  getPhotos = id => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    };
    console.log("Gettign photos " + id);
    fetch("http://pablorosas.pythonanywhere.com/GetPhotos", options)
      .then(res => res.json())
>>>>>>> parent of bce692f5... Update new state
      .then(newPhotos => {
        if (newPhotos == null) return;
        const myPhotos = newPhotos.map(
          photo => `http://pablorosas.pythonanywhere.com/static/${photo.HashID}`
        );
        let newPhotosUnique = [...myPhotos, ...this.state.Photos];
        newPhotosUnique = newPhotosUnique.filter(
          (photo, index, self) => self.indexOf(photo) === index
        );
        console.log(newPhotosUnique);
        this.setState({ Photos: newPhotosUnique, refreshing: false });
      });
  };

  render() {
    console.log(this.state.Photos);
    return (
<<<<<<< HEAD
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
=======
      <HasToUpdate.Consumer>
        {uploading => (
          <UserDataContext.Consumer>
            {context => {
              console.log(uploading);
              if (uploading.getState()) {
                this.getPhotos(context.state.ID);
                uploading.setToFalse();
              }
              const { data } = context;
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
                            if (uploading.getState()) {
                              this.setState({ refreshing: true });
                              this.getPhotos(data.ID);
                              uploading.setToFalse();
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
              );
            }}
          </UserDataContext.Consumer>
        )}
      </HasToUpdate.Consumer>
    );
  }
}

export default Gallery;

>>>>>>> parent of bce692f5... Update new state
