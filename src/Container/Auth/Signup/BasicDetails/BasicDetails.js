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
import * as Validator from '../../../../Validator'



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
            confirm_password: ''
        },
        Mode: '',
        emails: [],
        Request: 'register',
        errors: false,
        messages: []
    }

    componentDidMount() {
        const mode = this.props.mode
        const role = mode === 'Business' ? '1' : '0'
        this.setState({ Mode: mode, role: role })
        Axios.get('/api/users/user/')
            .then(res => {
                const data = res.data
                const emails = []
                for (var key in data) {
                    emails.push(data[key].email.toLowerCase())
                }
                this.setState({ emails: emails })
            })
    }


    valueChangeHandler = (event, param = "null") => {
        const field = param === 'gender' ? event.target.value : event.target.id
        const newValues = this.state.values
        // console.log(event.target.value[event.target.value.length-1])
        if (param === 'gender') {
            newValues.gender = field
        } else if (event.target.id === "mobile_number") {
            
            if (this.state.values.mobile_number.length >= 0) {
                Validator.isNumber(event.target.value)
                    ? newValues.mobile_number = event.target.value
                    : newValues.mobile_number=  event.target.value.slice(0, -1)
            }
        }else if(event.target.value[event.target.value.length-1] === " "){
            // console.log("Yes")
        }
        else {
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

    toCamelCase = (str) => {
        return str
            .replace(/\s(.)/g, function ($1) { return $1.toUpperCase(); })
            .replace(/\s/g, ' ')
            .replace(/^(.)/, function ($1) { return $1.toLowerCase(); });
    }


    validateData = () => {
        const values = this.state.values
        const messages = []
        const emails = this.state.emails
        // const emailValues = this.state.values.email

        //First Name
        !Validator.isPresent(values['first_name']) ? messages.push("First Name is Empty") : console.log()
        //Last Name
        !Validator.isPresent(values['last_name']) ? messages.push("Last Name is Empty") : console.log()
        //Email
        !Validator.isPresent(values['email']) ? messages.push("Email Field is Empty")
            : !Validator.validEmailFormat(values['email']) ? messages.push("Wrong Email Format") : console.log()
        for (var key in emails) {
            values['email'] = values['email'].toLowerCase()
            Validator.equalValues(values['email'], emails[key]) ? messages.push("Email Already Associated with a User") : console.log()
        }
        //Gender
        !Validator.isPresent(values['gender']) ? messages.push("Gender Can't be Empty"):console.log()

        //Phone
        !Validator.isPresent(values['mobile_number']) ? messages.push("Mobile Number Field is Empty")
            : !Validator.validLength(values['mobile_number'], 10) ? messages.push("Mobile Number should be of 10 Digits") : console.log()

        //Password
        !Validator.isPresent(values['password']) ? messages.push("Password Field is Empty")
            : !Validator.validAtleastLength(values['password'], 6) ? messages.push("Password should be atleast 6 Characters")
                : !Validator.equalValues(values['confirm_password'], values['password']) ? messages.push("Password and Confirm Password Should be Same") : console.log()

        //ConfirmPassword




        if (messages.length !== 0) {
            this.setState({ messages: messages, errors: true })
            return false
        }
        this.setState({ errors: false })
        return true

    }

    errorHandler = () => {

    }

    submitHandler = () => {
        console.table(this.state.values)
        if (this.validateData()) {

            const url = 'api/users/user/'
            const url2 = 'api/users/user_details/'
            const gender = this.state.values.gender === 'Male' ? 'M' : 'F'
            var data = JSON.stringify({
                "email": this.state.values.email.toString(),
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
                        Axios.post(url2, data2)
                            .then(response2 => {
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
                                console.log(error.response.data);
                                // const error = error.response.data

                            });
                    })
                    .catch((error) => {
                        this.props.toggleLoading(false)
                        // console.log(error.response.data);
                        const messages = []
                        // messages.push(error.response.data)
                        // this.setState({messages:messages,errors:true})
                    });
            }

        }

    }


    render() {
        return (
            <div className="container" style={styles.screen}>

                {this.state.errors
                    ? <div class="alert alert-danger alert-dismissible fade show text-left" role="alert">
                        {this.state.messages.map(function (item, i) {

                            return <li key={i}>{item}</li>
                        })}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true" onClick={()=>{
                                const error = !this.state.errors
                                this.setState({errors:error})
                            }}>&times;</span>
                        </button>
                    </div>
                    : null
                }

                <Heading text={this.state.Mode === 'User'?"User Details":"Business Owner Info"} />
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
                            label="Gender"
                        >
                            <MenuItem value="None" disabled>
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'Male'}>Male</MenuItem>
                            <MenuItem value={'Female'}>Female</MenuItem>
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
                        id="confirm_password"
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
        onUserDetailId: (data) => dispatch({
            type: actionTypes.USER_DETAIL_ID,
            user_details_id: data
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BasicDetails))
