import React, { Component } from 'react'
import './Signup.css'
import BasicDetails from './BasicDetails/BasicDetails'
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box } from '@material-ui/core'
import { withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaloonInfoForm from './SaloonInfoForm/SaloonInfoForm';
import CategorySelect from './CategorySelect/CategorySelect';
import ServiceSelect from './ServiceSelect/ServiceSelect'
import StylistSelect from './StylistSelect/StylistSelect';
import SafetyFeatures from './SafetyFeatures/SafetyFeatures';
import UploadImages from './UploadImages/UploadImages';
import SetTimings from './SetTimings/SetTimings';


class Signup extends Component {

    state = {
        Mode: '',
        Progress: 0,
        screen: null,
        Loading: false
    }

    componentDidMount() {

        const Mode = this.props.match.params.mode
        this.setState({ Mode: Mode })
        this.screenHandler('SetTimings') 
    }

    toggleLoadingHandler = (value) => {
        console.log('toggled')
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
                this.setState({screen: <SetTimings nextScreen={this.screenHandler} changeProgress={this.changeProgressHandler} toggleLoading={this.toggleLoadingHandler} mode={this.props.match.params.mode} />})
                break;
            case 'CategorySelect':
                this.setState({ screen: <CategorySelect nextScreen={this.screenHandler} changeProgress={this.changeProgressHandler} toggleLoading={this.toggleLoadingHandler} Loading={this.state.Loading} /> })
                break;
            case 'ServiceSelect':
                this.setState({screen: <ServiceSelect nextScreen={this.screenHandler} changeProgress={this.changeProgressHandler} toggleLoading={this.toggleLoadingHandler} />})
                break;
            case 'StylistSelect':
                this.setState({screen: <StylistSelect nextScreen={this.screenHandler} changeProgress={this.changeProgressHandler} toggleLoading={this.toggleLoadingHandler} />})
                break;
            case 'SafetyFeatures':
                this.setState({screen: <SafetyFeatures nextScreen={this.screenHandler} changeProgress={this.changeProgressHandler} toggleLoading={this.toggleLoadingHandler} />})
                break;
            case 'UploadImages':
                this.setState({screen: <UploadImages nextScreen={this.screenHandler} changeProgress={this.changeProgressHandler} toggleLoading={this.toggleLoadingHandler} mode={this.props.match.params.mode} />})
                break;
            default:
                console.log("Load Failed")

        }
    }


    render() {
        return (
            <div className="container mx-auto" style={styles.container}>
                <Box className="signup-box">
                    <LinearProgress variant="determinate" value={this.state.Progress} />
                    {this.state.Loading ? <CircularProgress style={styles.Loader} /> : this.state.screen}
                </Box>
            </div>
        )
    }
}

const styles = {
    container: {
        marginTop: window.innerHeight / 6,
        width: window.innerWidth < 768 ? '100%' : '50%'
    },
    Loader:{
        marginTop: '40px'
    }
}

export default withRouter(Signup)

// basic detail
// business detail
// timing
// category
// services
// stylist
// safety features
// images



// http://13.233.161.148:8000/