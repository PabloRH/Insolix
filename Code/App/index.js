import React from 'react'
import { NativeRouter, Route } from 'react-router-native'

import Home from '../Home'
import Login from '../Login'
import SignUp from '../SignUp'
import SignedIn from '../SignedIn'

import UserDataContext from './UserDataContext'

class App extends React.Component {
  state = { ID: '0' }
  value = {
    state: this.state,
    setter: nextState => {
      this.setState(nextState)
    },
  }

  render() {
    return (
      <UserDataContext.Provider value={this.value}>
        <NativeRouter>
          <Route exact path="/" component={Home} />
          <Route exact path="/logIn" component={Login} />
          <Route exact path="/signUp" component={SignUp} />
          <Route exact path="/SignedIn" component={SignedIn} />
        </NativeRouter>
      </UserDataContext.Provider>
    )
  }
}

export default App
