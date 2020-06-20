import React, { Component } from 'react'
import './Signup.css'
import BasicDetails from './BasicDetails/BasicDetails'
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box } from '@material-ui/core'


class Signup extends Component {

    state = {
        Mode: '',
        Progress: '0',
        screen: <BasicDetails/>
    }

    render() {
        return (
            <div className="container mx-auto" style={styles.container}>
                <Box className="signup-box">
                    <LinearProgress variant="determinate" value={this.state.Progress} />
                    {this.state.screen}
                </Box>
            </div>
        )
    }
}

const styles = {
    container: {
        marginTop: window.innerHeight / 6,
        width: window.innerWidth < 768 ? '100%' : '50%'
    }
}

export default Signup
