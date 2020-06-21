import React, { Component } from 'react'
import { TextField } from '@material-ui/core'
import './BasicDetails.css'
import { Button } from '@material-ui/core'
import Colors from '../../../../Constants/Colors'
import { withRouter } from 'react-router-dom'
import {Select,MenuItem,FormControl,InputLabel} from '@material-ui/core';



class BasicDetails extends Component {

    state = {
        values:{
            first_name:'',
            last_name:'',
            email:'',
            mobile_number:'',
            role:'',
            gender:'',
            password:'',
        },
        Mode:'',
        confirmPassword: false
    }

    componentDidMount() {
      const mode=this.props.match.params.mode
      const role=mode === 'Business' ? '1':'0' 
      this.setState({Mode:mode})
    }

    valueChangeHandler = (event,param="null") => {
        const field = param==='gender'?event.target.value:event.target.id
        const newValues=this.state.values
        newValues[field]=event.target.value
        newValues.role= this.state.Mode === 'Business' ? '1':'0'
        this.setState({values:newValues})
    }

    confirmPasswordHandler=(e)=>{

    }

    submitHandler = () => {
        console.table(this.state.values)
        // this.props.toggleLoading(true)

        // setTimeout(() => {
        //     const mode = this.props.mode
        //     const progress = mode === 'User' ? 50 : 100 / 8
        //     this.props.changeProgress(progress)
        //     this.props.toggleLoading(false)
        //     this.props.nextScreen(mode === 'Business' ? 'SaloonInfoForm' : 'UploadImages')
        // }, 1000)

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
                        onChange={(e)=>{this.valueChangeHandler(e)}}

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
                        onChange={(e)=>{this.valueChangeHandler(e)}}

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
                        onChange={(e)=>{this.valueChangeHandler(e)}}

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
                        onChange={(e)=>{this.valueChangeHandler(e)}}

                    />

                    <FormControl variant="outlined" className="col-md" margin="normal" required>
                        <InputLabel>Gender</InputLabel>
                        <Select
                            // value={age}
                            id="gender"

                            onChange={(e)=>{this.valueChangeHandler(e,'gender')}}
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
                        onChange={(e)=>{this.valueChangeHandler(e)}}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        autoComplete="confirm-password"
                        variant="outlined"
                        className="col-md"
                        margin="normal"
                        required
                        onChange={(e)=>{this.valueChangeHandler(e)}}
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
