import React, { Fragment } from "react";
import { TextInput, Avatar, Card, Button } from "react-native-paper";
import { View, ScrollView, Image } from "react-native";
import MyHeader from "../../Header";
import MyStyles from "../../styles";

import { Icon } from "native-base";
import { Data } from "../../App/Data";

class Gallery extends React.Component {
  constructor(props) {
    super(props)
    const Photos = Array.from({ length: 24 }).map(
      (_, i) => `https://unsplash.it/300/300/?random&__id=${this.props.route.key}${i}`
    )
    this.state = { Photos, hasGotPhotos: false }
  }
  
  getPhotos = (id) => {
    if (this.state.hasGotPhotos) return
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    };

    fetch("http://pablorosas.pythonanywhere.com/GetPhotos", options)
      .then(res => res.json())
      .then(res => {
        if (res.ID == null) return 
        const myPhotos = res.map(photo => `http://pablorosas.pythonanywhere.com/static/${photo.HashID}`)
        this.setState({Photos: [...this.state.Photos, ...myPhotos], hasGotPhotos: true})
      });
  }

  render() {
    console.log(this.state.Photos)
    return (
      <Data.Consumer>
        {context => {
          this.getPhotos(context.state.ID)
          const { state } = context;
          return (
            <Fragment>
              <MyHeader
                text="Gallery"
                subtitle={state.Type}
                link="/"
                hasSetting
              />
              <View>
                <ScrollView contentContainerStyle={MyStyles.content}>
                  {
                    Photos.map(uri => (
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
    );
  }
}

export default Gallery;

