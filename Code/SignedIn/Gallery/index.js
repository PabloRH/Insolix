import React, { Fragment } from "react";
import { TextInput, Avatar, Card, Button } from "react-native-paper";
import { View, ScrollView, Image } from "react-native";
import MyHeader from "../../Header";
import MyStyles from "../../styles";

import { Icon } from "native-base";
import { Data } from "../../App/Data";
import { HasToUpdate } from "../state";

class Gallery extends React.Component {
  constructor(props) {
    super(props)
    const Photos = Array.from({ length: 4 }).map(
      (_, i) => `https://unsplash.it/300/300/?random&__id=${this.props.route.key}${i}`
    )
    this.state = { Photos }
  }
  
  getPhotos = (id) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    };
    console.log(id)
    fetch("http://pablorosas.pythonanywhere.com/GetPhotos", options)
      .then(res => res.json())
      .then(res => {
        if (res == null) return 
        const myPhotos = res.map(photo => `http://pablorosas.pythonanywhere.com/static/${photo.HashID}`)
        console.log(myPhotos)
        this.setState({Photos: [...myPhotos, ...this.state.Photos], hasGotPhotos: true})
      });
  }

  render() {
    console.log(this.state.Photos)
    return (
      <HasToUpdate.Consumer>
        { uploading => (
        <Data.Consumer>
          {context => {
            console.log(uploading.getState())
            if (uploading.getState()) {
              this.getPhotos(context.state.ID)
              uploading.setToFalse()
            }
            const { state } = context;
            return (
              <Fragment>
                <MyHeader
                  text="Gallery"
                  subtitle={state.Type}
                  link="/"
                  hasSetting
                />
                <View style={{marginBottom: 85}}>
                  <ScrollView contentContainerStyle={MyStyles.content}>
                    {
                      this.state.Photos.map(uri => (
                      <View key={uri} style={MyStyles.item}>
                        <Image source={{ uri }} style={MyStyles.photo} />
                      </View>
                    ))
                    }
                  </ScrollView>
                </View>
              </Fragment>
            );
          }}
        </Data.Consumer>
        )}
      </HasToUpdate.Consumer>
    );
  }
}

export default Gallery;

