import { Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BasicDetails from './BasicDetails/BasicDetails';
import CategorySelect from './CategorySelect/CategorySelect';
import SafetyFeatures from './SafetyFeatures/SafetyFeatures';
import SaloonInfoForm from './SaloonInfoForm/SaloonInfoForm';
import ServiceSelect from './ServiceSelect/ServiceSelect';
import SetTimings from './SetTimings/SetTimings';
import './Signup.css';
import StylistSelect from './StylistSelect/StylistSelect';
import UploadImages from './UploadImages/UploadImages';
import Fade from '@material-ui/core/Fade';
import { connect } from 'react-redux'


class Signup extends Component {

    state = {
        Mode: '',
        Progress: 0,
        screen: null,
        Loading: false,
        fade: false
    }

    componentDidMount() {

        if(this.props.userLoggedIn){
            this.props.history.push('/profile')
        }
        console.log(this.props)


        const Mode = this.props.match.params.mode
        this.setState({ Mode: Mode })
        this.screenHandler('BasicDetails')
        setTimeout(() => {
            this.setState({ fade: true })
        })
    }

    toggleLoadingHandler = (value) => {
        this.setState({ Loading: value })
    }

    changeProgressHandler = (value) => {
        this.setState({ Progress: value })
    }

    screenHandler = (screenName) => {

        switch (screenName) {
            case 'BasicDetails':
                this.setState({ screen: <BasicDetails nextScreen={this.screenHandler} changeProgress={this.changeProgressHandler} toggleLoading={this.toggleLoadingHandler} mode={this.props.match.params.mode} /> })
                break;
            case 'SaloonInfoForm':
                this.setState({ screen: <SaloonInfoForm nextScreen={this.screenHandler} changeProgress={this.changeProgressHandler} toggleLoading={this.toggleLoadingHandler} /> })
                break;
            case 'SetTimings':
                this.setState({ screen: <SetTimings nextScreen={this.screenHandler} changeProgress={this.changeProgressHandler} toggleLoading={this.toggleLoadingHandler} mode={this.props.match.params.mode} /> })
                break;
            case 'CategorySelect':
                this.setState({ screen: <CategorySelect nextScreen={this.screenHandler} changeProgress={this.changeProgressHandler} toggleLoading={this.toggleLoadingHandler} Loading={this.state.Loading} /> })
                break;
            case 'ServiceSelect':
                this.setState({ screen: <ServiceSelect nextScreen={this.screenHandler} changeProgress={this.changeProgressHandler} toggleLoading={this.toggleLoadingHandler} /> })
                break;
            case 'StylistSelect':
                this.setState({ screen: <StylistSelect nextScreen={this.screenHandler} changeProgress={this.changeProgressHandler} toggleLoading={this.toggleLoadingHandler} /> })
                break;
            case 'SafetyFeatures':
                this.setState({ screen: <SafetyFeatures nextScreen={this.screenHandler} changeProgress={this.changeProgressHandler} toggleLoading={this.toggleLoadingHandler} /> })
                break;
            case 'UploadImages':
                this.setState({ screen: <UploadImages nextScreen={this.screenHandler} changeProgress={this.changeProgressHandler} toggleLoading={this.toggleLoadingHandler} mode={this.props.match.params.mode} /> })
                break;
            default:
                console.log("Load Failed")

        }
    }


    render() {
        return (
            <div className="container mx-auto" style={styles.container}>
                <Box className="signup-box">
                    <LinearProgress variant="determinate" value={this.state.Progress} style={{ height: 20 }} color="primary" />
                    {this.state.Loading
                        ? <div className="mx-auto text-center">
                            <div className="row">
                                <CircularProgress className="mx-auto" style={styles.Loader} />
                            </div>
                            <div className="row">
                                <strong className="mx-auto">Processing Data Please Wait... </strong>
                            </div>
                        </div>
                        : this.state.screen}
                </Box>
            </div>
        )
    }
}

const styles = {
    container: {
        marginTop: window.innerHeight / 6,
        width: window.innerWidth < 768 ? '100%' : '50%',
    },
    Loader: {
        marginTop: '40px'
    }
}





const mapStateToProps = (state) => ({

    userLoggedIn : state.userLoggedIn
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signup))
