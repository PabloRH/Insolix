import React, { Fragment } from 'react';
import { Text } from 'react-native-paper';
import { View } from 'react-native'

import MyHeader from "../../Header"
import MyStyles from "../../styles"

import { Data } from "../../App/Data" 

const Profile = () => {
  return (
    <Fragment>
      <MyHeader text="Derbild" subtitle="Welcome" link="/" hasSetting  />
      <View style={MyStyles.appContainer}>
        <Data.Consumer>
          {
            context => {
              console.log(context)
              const [data, setData] = context
              return (
                <Text theme={{colors: {text: '#000000',}}}> { data.ID } </Text>
              )
            }
          }
        </Data.Consumer>
      </View>
    </Fragment>
  );
};

export default Profile;

