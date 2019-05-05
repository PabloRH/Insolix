import React, { Fragment } from 'react';
import { Button} from 'react-native-paper';
import { View } from 'react-native'
import { Link } from "react-router-native";

import MyHeader from "../../Header"
import MyStyles from "../../styles"


const Profile = () => {
  return (
    <Fragment>
      <MyHeader text="Derbild" subtitle="Welcome" link="/" hasSetting  />
      <View style={MyStyles.appContainer}>
        <Link to="/login">
          <Button mode="outlined" style={MyStyles.btn}>
            Log In
          </Button>
        </Link>
        <Link to="/signup">
          <Button mode="outlined" style={MyStyles.btn}>
            Sign Up
          </Button>
        </Link>
      </View>
    </Fragment>
  );
};

export default Profile;

