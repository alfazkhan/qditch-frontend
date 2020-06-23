import React, { Component } from 'react'
import { TextField } from '@material-ui/core'
import { connect } from 'react-redux'
import './BasicDetails.css'
import { Button } from '@material-ui/core'
import Colors from '../../../../Constants/Colors'
import { withRouter } from 'react-router-dom'
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import * as actionTypes from '../../../../store/Action/Action'
import Axios from '../../../../Axios'

class BasicDetails extends Component {

    state = {
        values: {
            first_name: '',
            last_name: '',
            email: '',
            mobile_number: '',
            role: '1',
            gender: '',
            password: '',
        },
        Mode: '',
        confirmPassword: false
    }

    componentDidMount() {
        const mode = this.props.mode
        const role = mode === 'Business' ? '1' : '0'
        this.setState({ Mode: mode })
    }

    valueChangeHandler = (event, param = "null") => {
        const field = param === 'gender' ? event.target.value : event.target.id
        const newValues = this.state.values
        if (param === 'gender') {
            newValues.gender = field
        } else {
            newValues[field] = event.target.value
        }
        // newValues.role = newValues.role === '' ? this.state.Mode === 'Business' ? '1' : '0' : console.log()
        this.setState({ values: newValues })
    }

    confirmPasswordHandler = (e) => {

    }

    submitHandler = () => {
        const url = 'users/user/'
        const gender = this.state.values.gender === 'Male' ? 'M' : 'F'
        var data = JSON.stringify({
            "first_name": this.state.values.first_name.toString(),
            "last_name": this.state.values.last_name.toString(),
            "email": this.state.values.email.toString(),
            "mobile_number": this.state.values.mobile_number.toString(),
            "gender": gender,
            "password": this.state.values.password,
            "role": this.state.values.role.toString()
        });

        this.props.toggleLoading(true)

        Axios.post(url, data)
            .then((response)=>{
                console.table(response.data);
                this.props.onResponseRecieve(response.data.id)
                this.props.toggleLoading(false)
                const progress = this.props.Mode === 'User' ? 50 : 100 / 8
                this.props.changeProgress(progress)
                this.props.nextScreen(this.state.Mode === 'Business' ? 'SaloonInfoForm' : 'UploadImages')
            })
            .catch((error)=>{
                this.props.toggleLoading(false)
                console.log(error.response);
            });

    }


    render() {
        return (
            <div className="container" style={styles.screen}>
                <div className="row">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        id="first_name"
                        label="First Name"
                        name="fname"
                        autoComplete="firstName"
                        className="col-md"
                        onChange={(e) => { this.valueChangeHandler(e) }}

                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        rowsMax={2}
                        id="last_name"
                        label="Last Name"
                        name="lname"
                        autoComplete="lastName"
                        className="col-md"
                        onChange={(e) => { this.valueChangeHandler(e) }}

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
                        onChange={(e) => { this.valueChangeHandler(e) }}

                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        rowsMax={2}
                        id="mobile_number"
                        label="Phone(+91)"
                        name="PhoneNumber"
                        autoComplete="phone"
                        className="col-md"
                        onChange={(e) => { this.valueChangeHandler(e) }}

                    />

                    <FormControl variant="outlined" className="col-md" margin="normal" required>
                        <InputLabel>Gender</InputLabel>
                        <Select
                            // value={age}
                            id="gender"

                            onChange={(e) => { this.valueChangeHandler(e, 'gender') }}
                            label="Age"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'Male'}>Male</MenuItem>
                            <MenuItem value={'Female'}>Female</MenuItem>
                            <MenuItem value={'Other'}>Other</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className="row">
                    <TextField
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        variant="outlined"
                        className="col-md"
                        margin="normal"
                        required
                        onChange={(e) => { this.valueChangeHandler(e) }}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        autoComplete="confirm-password"
                        variant="outlined"
                        className="col-md"
                        margin="normal"
                        required
                        onChange={(e) => { this.valueChangeHandler(e) }}
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


const mapStateToProps = state => {
    return {

    }

}

const mapDispatchToProps = dispatch => {
    return {
        onResponseRecieve: (data) => dispatch({
            type: actionTypes.UPDATE_USER_ID,
            user_id: data
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BasicDetails))
