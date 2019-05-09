import React from 'react'
import { NativeRouter, Route } from 'react-router-native'

import Home from '../Home'
import Login from '../LogIn'
import SignUp from '../SignUp'
import SignedIn from '../SignedIn'

import UserDataContext from './UserDataContext'

class App extends React.Component {
  state = { ID: '0' }

  render() {
    return (
      <UserDataContext.Provider
        value={{
          data: this.state,
          setData: nextState => {
            this.setState(nextState)
          },
        }}
      >
        <NativeRouter>
          <Route exact path="/" component={Home} />
          <Route exact path="/logIn" component={Login} />
          <Route exact path="/signUp" component={SignUp} />
          <Route exact path="/signedIn" component={SignedIn} />
        </NativeRouter>
      </UserDataContext.Provider>
    )
  }
}

export default App
