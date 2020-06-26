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
import Heading from '../../../../Components/Heading/Heading'

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
        confirmPassword: false,
        Request: 'register'
    }

    componentDidMount() {
        const mode = this.props.mode
        const role = mode === 'Business' ? '1' : '0'
        this.setState({ Mode: mode, role: role })
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

    changeScreen = () => {
        const progress = this.props.Mode === 'User' ? 100 : 100 / 8
        this.props.changeProgress(progress)
        this.state.Mode === 'Business'
        ? this.props.nextScreen('SaloonInfoForm')
        : this.props.history.push('/')
        // this.props.nextScreen(this.state.Mode === 'Business' ? 'SaloonInfoForm' : this.props.history.push('/'))
    }

    submitHandler = () => {
        const url = 'api/users/user/'
        const url2 = 'api/users/user_details/'
        const gender = this.state.values.gender === 'Male' ? 'M' : 'F'
        var data = JSON.stringify({
            
            "email": this.state.values.email.toString(),
            // "mobile_number": this.state.values.mobile_number.toString(),
            // "role": this.state.values.role.toString(),

            "password": this.state.values.password,
        });

       

        this.props.toggleLoading(true)
        if (this.state.Request === 'register') {
            Axios.post(url, data)
                .then((response) => {
                    // console.table(response.data);
                    var data2 = JSON.stringify({
                        "first_name": this.state.values.first_name.toString(),
                        "last_name": this.state.values.last_name.toString(),
                        "mobile_number": this.state.values.mobile_number.toString(),
                        "gender": gender.toString(),
                        "role": this.state.values.role.toString(),
                        "users": response.data.user.toString()
                    })
                    Axios.post(url2,data2)
                    .then(response2=>{
                        console.log(response2.data)
                        this.props.onTokenRecieve(response.data.token)
                        this.props.onUserRegister(response.data.user)
                        this.props.onUserDetailId(response2.data.id)
                        if (this.props.Mode === 'Business') {
                            this.props.onBusinessRegister(response.data.user)
                        }
                        this.props.toggleLoading(false)
                        this.changeScreen()
                    })
                    .catch((error) => {
                        this.props.toggleLoading(false)
                        console.log(error.response);
                    });
                })
                .catch((error) => {
                    this.props.toggleLoading(false)
                    console.log(error.response);
                });
        }

    }


    render() {
        return (
            <div className="container" style={styles.screen}>
                <Heading text="User Details" />
                <div className="row">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        id="first_name"
                        label="First Name"
                        name="fname"
                        value={this.state.values.first_name}
                        autoComplete="fname"
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
                        value={this.state.values.last_name}
                        autoComplete="lname"
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
                        value={this.state.values.email}
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
                        value={this.state.values.mobile_number}
                        autoComplete="phone"
                        className="col-md"
                        onChange={(e) => { this.valueChangeHandler(e) }}

                    />

                    <FormControl variant="outlined" className="col-md" margin="normal" required>
                        <InputLabel>Gender</InputLabel>
                        <Select
                            // value={age}
                            id="gender"
                            value={this.state.values.gender}
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
        onTokenRecieve: (data) => dispatch({
            type: actionTypes.UPDATE_TOKEN,
            token: data
        }),
        onUserRegister: (data) => dispatch({
            type: actionTypes.UPDATE_USER_ID,
            user_id: data
        }),
        onBusinessRegister: (data) => dispatch({
            type: actionTypes.UPDATE_USER_ID,
            business_id: data
        }),
        onUserDetailId : (data) => dispatch({
            type: actionTypes.USER_DETAIL_ID,
            user_details_id : data
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BasicDetails))
