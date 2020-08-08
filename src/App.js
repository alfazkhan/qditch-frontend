


import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navigator from './Container/Navigator/Navigator'
import * as actionTypes from './store/Action/Action'
import { withRouter } from 'react-router-dom'
import './App.css'
import { Loader } from './Components/Loader/Loader'
export class App extends Component {

  state={
    Loading: true
  }

  logoutHandler = () =>{
    this.props.onLogout()
    this.props.history.go('/')
}

  componentWillMount() {
    const data = JSON.parse(localStorage.getItem('state'))
    this.props.onstart(data)
    this.setState({Loading:false})
  }
  

  render() {
    return (
      <div className="App">
        {this.state.Loading
        ?<Loader/>
      :<Navigator logout={this.logoutHandler} />}
      
      
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
      }),
      onstart: (data) => dispatch({
        type: actionTypes.LOCAL_STORAGE_FETCH,
        fetchedState : data
      })
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))
