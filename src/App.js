


import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navigator from './Container/Navigator/Navigator'
import * as actionTypes from './store/Action/Action'
import { withRouter } from 'react-router-dom'
import './App.css'
export class App extends Component {

  logoutHandler = () =>{
    this.props.onLogout()
    this.props.history.go('/')
}

  render() {
    return (
      <div className="App">
      <Navigator logout={this.logoutHandler} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = dispatch => {

  return {
      onLogout: () => dispatch({
          type: actionTypes.USER_LOGOUT
      })
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))
