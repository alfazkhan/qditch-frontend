


import React, { useState, useEffect } from 'react'
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

const styles = {
    navlink: {
        color: Colors.LinksColor
    },
    status: false
}


const Navigator = (props) => {

    const [userLoggedIn, setuserLoggedIn] = useState(false)
    const [businessUser, setBusinessUser] = useState(false)

    const [status, setStatus] = useState(true)


    const dispatch = useDispatch()
    const logout = async () => {
        this.props.history.push('/logout')
      };
    

    const st = useSelector(state => state.userLoggedIn)
    useEffect(() => {

        if (st) {

            setuserLoggedIn(!userLoggedIn)
            setBusinessUser(!businessUser)
        }
    }, [status, useSelector(state => state.userLoggedIn)])



    return (
        <div>
            <div className={"navigation-bar"}>
                <div>
                    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: Colors.primary }}>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                            {/* <span className="navbar-toggler-icon" style={{color:'white'}}></span>*/}
                            <MenuRoundedIcon style={styles.navlink} />
                        </button>
                        <Link to='/' className={"navbar-brand "} >
                            <img src="https://getbootstrap.com/docs/4.5/assets/brand/bootstrap-solid.svg" width="30" height="30" alt="Qditch" loading="lazy" />
                        </Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                            {userLoggedIn
                                ?
                                <ul className="navbar-nav ml-auto mt-lg-0">
                                    {businessUser
                                        ?
                                        <li className="nav-item">
                                            <Button variant="contained" size="small" color="primary">
                                                <Link to='/admin/dashboard' className={"navbar-link "} style={styles.navlink}>Admin Dashboard</Link>
                                            </Button>
                                        </li>
                                        : null
                                    }
                                    <li className="nav-item">
                                        <Button variant="contained" size="small" color="secondary" >
                                            <Link to='/' className={"navbar-link "} onClick={props.logout} style={styles.navlink}>Logout</Link>
                                        </Button>
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
                                </ul>
                            }


                        </div>
                    </nav>
                    <Switch>
                        <Route path="/" exact children={<Landing />} />
                        <Route path="/results/:type/:query" children={<Results />} />
                        <Route path="/businessinfo" exact children={<BusinessInfo />} />
                        <Route path="/Login" exact children={<Login />} />
                        <Route path="/Register/:mode" exact children={<Signup />} />
                        <Route path="/admin/dashboard/" exact children={<Dashboard />} />
                        <Route path='/logout' exact children={<Logout/>} />
                    </Switch>
                </div>
            </div>
        </div>
    )

}
export default withRouter(Navigator)
