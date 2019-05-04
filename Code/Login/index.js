import React, {Fragment} from "react";
import { Content, Form, Item, Text, Input, Card, CardItem, Button } from "native-base";
import MyHeader from "../Header"; 
class Login extends React.Component {

  state = {name: "", password: ""}

  sendToDB = () => {
    const data = {name: this.state.name, password: this.state.password};
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    fetch('http://pablorosas.pythonanywhere.com/logIn', options)
      .then(res => res.json())
      .then(res => alert(res.ID))
  }
  render () {
    return (
      <Fragment>
      <MyHeader></MyHeader>
      <Content padder>
        <Form>
          <Item>
            <Input placeholder="Name" value={this.state.name} onChange={e => {
              this.setState({name: e.nativeEvent.text})
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
      </Fragment>
    );
  }
  
};

export default Login;

