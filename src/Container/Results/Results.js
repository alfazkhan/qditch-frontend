import React, { Component } from 'react'
import {
    withRouter
  } from "react-router-dom";

class Results extends Component {

    state={
        query:''
    }

    componentDidMount() {
        // const query = this.props.match.params.query
        // this.setState({query:query})
    }
    

    render() {
        return (
            <div>
                <h1>{this.state.query}</h1>
            </div>
        )
    }
}

export default withRouter(Results)
