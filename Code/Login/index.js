import React from "react";
import { Content, Form, Item, Text, Input, Card, CardItem, Button } from "native-base";
import MyHeader from "../Header"; 
class Login extends React.Component {

  state = {user: "", password: ""}

  sendToDB = () => {
    console.log(this.state)
  }
  render () {
    return (
      <Content padder>
        <MyHeader />
        <Form>
          <Item>
            <Input placeholder="User" value={this.state.user} onChange={e => {
              this.setState({user: e.nativeEvent.text})
            }} />
          </Item>
          <Item last>
            <Input placeholder="Password" value={this.state.password} onChange={e => {
              this.setState({password: e.nativeEvent.text})
            }} />
          </Item>
          <Button onPress={this.sendToDB}>
            <Text>Submit</Text>
        </Button>
        </Form>
      </Content>
    );
  }
  
};

export default Login;

