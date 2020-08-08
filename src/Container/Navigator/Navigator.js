// import React, { useState, useEffect } from 'react'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Link, Route, Switch,
    withRouter
} from "react-router-dom";
import Colors from '../../Constants/Colors';
import Login from '../Auth/Login/Login';
import Signup from '../Auth/Signup/Signup';
import BusinessInfo from '../BusinessInfo/BusinessInfo';
import Dashboard from '../Dashboard/Dashboard';
import Landing from '../Landing/Landing';
import Results from '../Results/Results';
import './Navigator.css';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux'
import * as actionTypes from '../../store/Action/Action'
import { Logout } from '../Auth/Login/Logout';
import Logo from '../../Assets/Logo.png'
import Profile from '../Profile/Profile';
import FaceIcon from '@material-ui/icons/Face';
import DownloadBooking from '../DownloadBooking/DownloadBooking';
const styles = {
    navlink: {
        color: Colors.LinksColor
    },
    status: false
}


export class Navigator extends Component {

    state = {
        userLoggedIn: this.props.userLoggedIn,
        user_id: this.props.user_id
    }

    componentDidMount() {

        console.log(window.innerWidth)

        
        navigator.geolocation.getCurrentPosition(this.updateCoordinates)
        const data = JSON.parse(localStorage.getItem('state'))
        if (data) {
            // console.log(data)
            this.setState({
                userLoggedIn: data.userLoggedIn,
                user_id: data.user_id
            })
        }
        window.scrollTo(0, 0)
    }

    updateCoordinates = (data) => {
        const lat = data.coords.latitude
        const long = data.coords.longitude

        const coordinates = {
            latitude: lat,
            longitude: long
        }

        this.props.onCoordinates(coordinates)
    }



    render() {
        return (
            <div>
                <div className={"navigation-bar pb-3"}>
                    <div>
                        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: Colors.primary }}>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                                {/* <span className="navbar-toggler-icon" style={{color:'white'}}></span>*/}
                                <MenuRoundedIcon style={styles.navlink} />
                            </button>
                            <Link to='/' className={"navbar-brand "} >
                                <img src={Logo} width="auto" height="40" alt="Qditch" />
                            </Link>
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">

                                {this.props.userLoggedIn
                                    ?
                                    <ul className="navbar-nav ml-auto mt-lg-0">
                                        {/* {useSelector(state => state.businessUser)
                                        ?
                                        <li className="nav-item">
                                            <Button variant="contained" size="small" color="primary">
                                                <Link to='/admin/dashboard' className={"navbar-link "} style={styles.navlink}>Admin Dashboard</Link>
                                            </Button>
                                        </li>
                                        : null
                                    } */}
                                        <li className="nav-item">
                                            <Link to={'/profile'} className={"navbar-link text-bold"} style={styles.navlink}>My Profile </Link>
                                        </li>
                                    </ul>
                                    :
                                    <ul className="navbar-nav ml-auto mt-lg-0">
                                        <li className="nav-item">
                                            <Link to='/Login' className={"navbar-link "} style={styles.navlink} >Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            {/* <Button variant="contained" size="small" color="primary"> */}
                                            <Link to='/Register/Business' className={" "} style={styles.navlink} >Business Signup</Link>
                                            {/* </Button> */}
                                        </li>
                                        {/* {window.innerWidth <= 1000
                                        ? <div>
                                            <div class="dropdown-divider"></div>
                                            <Link to='/Register/Business' className={" "} style={styles.navlink} >Business Signup</Link>
                                        </div>
                                        : null
                                    } */}
                                    </ul>
                                }


                            </div>
                        </nav>
                        <Switch>
                            <Route path="/" exact children={<Landing />} />
                            <Route path="/results/:category/:categoryName" children={<Results />} />
                            <Route path="/saloninfo/:id" exact children={<BusinessInfo />} />
                            <Route path="/Login" exact children={<Login />} />
                            <Route path="/Register/:mode" exact children={<Signup />} />
                            <Route path="/admin/dashboard/" exact children={<Dashboard />} />
                            <Route path='/logout' exact children={<Logout />} />
                            <Route path='/profile' exact children={<Profile logout={this.props.logout} />} />
                            <Route path='/download-booking-data/' exact children={<DownloadBooking />} />

                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}





const mapStateToProps = (state) => ({

    userLoggedIn : state.userLoggedIn,
    user_id: state.user_id



})

const mapDispatchToProps = dispatch => {

    return {
      onCoordinates: (data) => dispatch({
        type: actionTypes.UPDATE_USER_COORDINATES,
        user_coordinates: data
      })
    }
  
  }

export default connect(mapStateToProps, mapDispatchToProps)(Navigator)


