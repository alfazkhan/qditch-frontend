import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionTypes from '../../../store/Action/Action'
import { withRouter } from 'react-router-dom'


export class Logout extends Component {


    componentDidMount() {
    }


    

    render() {
        return (
            <div>

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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Logout))
