import React, { Component } from 'react'
import {
    Switch,
    Route,
    Link,
    withRouter,
} from "react-router-dom";
import Landing from '../Landing/Landing';
import Results from '../Results/Results'
import BusinessInfo from '../BusinessInfo/BusinessInfo'
import Colors from '../../Constants/Colors'
import './Navigator.css'
import Login from '../Auth/Login/Login';
import Signup from '../Auth/Signup/Signup';

class Navigator extends Component {

    componentDidMount() {
    }
    routeChangeHandler = (param) => {
        console.log(window.location.href)
        this.props.history.push({
            pathname: param,
        })
        if (window.innerWidth < 768 || param === '/Register/User' || param === '/Register/Business') {
            this.props.history.go(0)
            console.log('true')
        }
    }

    reloadHandler = () => {
        

    }

    render() {
        return (
            <div className="navigation-bar pd-5">
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: Colors.primary }}>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <Link to='/' className="navbar-brand mx-auto" onClick={() => this.routeChangeHandler('/')}>
                            <img src="https://getbootstrap.com/docs/4.5/assets/brand/bootstrap-solid.svg" width="30" height="30" alt="Qditch" loading="lazy" />
                        </Link>

                        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                            <ul className="navbar-nav mx-auto mt-2 mt-lg-0">
                                <li className="nav-item">
                                    <Link to='/Login' className="nav-link mx-auto" onClick={() => this.routeChangeHandler('/Login')}>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/Register/User' className="nav-link mx-auto" onClick={() => this.routeChangeHandler('/Register/User')}>User Signup</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/Register/Business' className="nav-link mx-auto" onClick={() => this.routeChangeHandler('/Register/Business')}>Business Signup</Link>
                                </li>

                            </ul>
                        </div>
                    </nav>
                </div>
                <div>
                    <Switch>
                        <Route path="/" exact children={<Landing />} />
                        <Route path="/results/:type/:query" children={<Results />} />
                        <Route path="/businessinfo" exact children={<BusinessInfo />} />
                        <Route path="/Login" exact children={<Login />} />
                        <Route path="/Register/:mode" exact children={<Signup />} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default withRouter(Navigator)
