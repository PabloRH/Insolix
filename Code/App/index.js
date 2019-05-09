import React, { Fragment } from 'react'
import { NativeRouter, Route, withRouter } from 'react-router-native'
import { BackHandler } from 'react-native'

import Home from '../Home'
import Login from '../LogIn'
import SignUp from '../SignUp'
import SignedIn from '../SignedIn'
import FAQs from '../FAQs'
import Reportes from '../Reportes'

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
          <Routers />
        </NativeRouter>
      </UserDataContext.Provider>
    )
  }
}

class WillHaveRouter extends React.Component {
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.history.goBack()
      return true
    })
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  render() {
    return (
      <Fragment>
        <Route exact path="/" component={Home} />
        <Route exact path="/logIn" component={Login} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/signedIn" component={SignedIn} />
        <Route exact path="/FAQs" component={FAQs} />
        <Route exact path="/Reportes" component={Reportes} />
      </Fragment>
    )
  }
}

const Routers = withRouter(WillHaveRouter)

export default App
