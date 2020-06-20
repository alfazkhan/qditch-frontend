import React, { Component } from 'react'
import { TextField } from '@material-ui/core'
import './BasicDetails.css'
import { Button } from '@material-ui/core'
import Colors from '../../../../Constants/Colors'
import { withRouter } from 'react-router-dom'



class BasicDetails extends Component {

    state={

    }

    // componentDidMount() {
    //     console.log(this.props)
    // }

    valueChangeHandler = () => {

    }

    submitHandler = () => {
        const mode = this.props.match.params.mode
        this.props.toggleLoading(true)

        setTimeout(() => {
            const mode = this.props.mode
            const progress = mode === 'User' ? 50 : 15
            this.props.changeProgress(progress)
            this.props.toggleLoading(false)
            this.props.nextScreen(mode==='Business'?'BusinessInfo':'UploadImages')
        }, 1000)

    }


    render() {
        return (
            <div className="container" style={styles.screen}>
                <div className="row">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        id="fname"
                        label="First Name"
                        name="fname"
                        autoComplete="firstName"
                        className="col-md"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        rowsMax={2}
                        id="lname"
                        label="Last Name"
                        name="lname"
                        autoComplete="lastName"
                        className="col-md"
                    />
                </div>
                <div className="row">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        className="col-md"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        rowsMax={2}
                        id="phone"
                        label="Phone Number"
                        name="PhoneNumber"
                        autoComplete="phone"
                        className="col-md"
                    />
                </div>

                <div className="row">
                    <TextField
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        className="col-md"
                        margin="normal"
                        required

                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        autoComplete="confirm-password"
                        variant="outlined"
                        className="col-md"
                        margin="normal"
                        required
                    />
                </div>
                <div className="submitButton text-right">
                    <Button variant="contained" size="large" style={{ backgroundColor: Colors.success, color: 'white' }} onClick={this.submitHandler}>
                        Next
                    </Button>
                </div>
            </div>
        )
    }

}


const styles = {
    screen: {
        marginTop: 40
    }
}

export default withRouter(BasicDetails)
