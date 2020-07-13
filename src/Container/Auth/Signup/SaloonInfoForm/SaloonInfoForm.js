import React, { Component } from 'react'
import { TextField } from '@material-ui/core'
// import './BasicDetails.css'
import { Button, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core'
import Colors from '../../../../Constants/Colors'
import { connect } from 'react-redux'
import Axios from '../../../../Axios'
import * as actionTypes from '../../../../store/Action/Action'
import Heading from '../../../../Components/Heading/Heading'
import * as Validator from '../../../../Validator'


class SaloonInfoForm extends Component {

    state = {
        values: {
            business_name: '',
            business_type: '',
            line1: '',
            line2: '',
            area: '',
            city: '',
            pincode: '',
            latitude: '',
            longitude: '',
            mapURL: ''
        },
        user_id: null,
        errors: false,
        messages: []
    }

    componentDidMount() {
        this.setState({ user_id: this.props.user_id }, () => {
            console.log(this.state.user_id)
        })
    }

    valueChangeHandler = (event) => {

        // console.log(event.target.value)
        // console.log(event.target.name)
        // console.log(event.target.id)

        let newValues = this.state.values
        if (event.target.name === "business_type") {
            newValues = { ...newValues, business_type: event.target.value }
            this.setState({ values: newValues })
            return 1
        }

        if (event.target.name === "city") {
            newValues = { ...newValues, city: event.target.value }
            this.setState({ values: newValues })
            return 1
        }

        switch (event.target.id) {
            case "business_name":
                newValues = { ...newValues, business_name: event.target.value }
                break
            case "line1":
                newValues = { ...newValues, line1: event.target.value }
                break
            case "line2":
                newValues = { ...newValues, line2: event.target.value }
                break
            case "area":
                newValues = { ...newValues, area: event.target.value }
                break
            case "pincode":
                if (!Validator.isNumber(event.target.value)) {
                    event.target.value = ""
                    return 1
                }
                newValues = { ...newValues, pincode: event.target.value }
                break
        }

        this.setState({ values: newValues })

    }

    pageChangeHandler = () => {
        this.props.toggleLoading(false)
        const progress = 100 * 2 / 8
        this.props.changeProgress(progress)
        this.props.nextScreen('SetTimings')
    }


    validateData = () => {
        const values = this.state.values
        console.log(values)
        const messages = []


        //Saloon Name
        !Validator.isPresent(values['business_name']) ? messages.push("Business Name is Empty") : console.log()
        //Saloon type
        !Validator.isPresent(values['business_type']) ? messages.push("Business Type is Empty") : console.log()
        //Address
        !Validator.isPresent(values['line1']) ? messages.push("Address is Empty") : console.log()
        //Area
        !Validator.isPresent(values['area']) ? messages.push("Area is Empty") : console.log()
        //City
        !Validator.isPresent(values['city']) ? messages.push("City is Empty") : console.log()
        //Pincode
        !Validator.isPresent(values['pincode']) ? messages.push("Pincode is Empty") : console.log()


        if (messages.length !== 0) {
            this.setState({ messages: messages, errors: true })
            return false
        }
        this.setState({ errors: false })
        return true

    }

    submitHandler = () => {
        console.table(this.state.values)
        if (this.validateData()) {
            const url = 'api/users/business/'
            var data = JSON.stringify({
                "business_name": this.state.values.business_name,
                "business_type": this.state.values.business_type,
                "user": this.state.user_id,
                "stylist_available": 0,
                "line1": this.state.values.line1,
                "line2": this.state.values.line2,
                "area": this.state.values.area,
                "city": this.state.values.city,
                "pincode": this.state.values.pincode,
                "latitude": this.state.values.latitude,
                "longitude": this.state.values.longitude,
                "map_url": this.state.values.mapURL
            });

            this.props.toggleLoading(true)

            Axios.post(url, data)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    this.props.onResponseRecieve(response.data.id)
                    this.pageChangeHandler()
                })
                .catch((error) => {
                    this.props.toggleLoading(false)
                    console.log(error.response);
                });
        }

    }

    mapValueHandler = (e) => {
        let mapurl = e.target.value
        const splitmapurl = mapurl.split('/')[6].split(',')
        const lat = splitmapurl[0].substring(1)
        const long = splitmapurl[1]
        const values = this.state.values
        values.mapURL = mapurl
        values.latitude = lat
        values.longitude = long
        this.setState({
            values: values
        })
    }


    render() {
        return (
            <div className="container" style={styles.screen}>
                <Heading text="Salon Info" />
                {this.state.errors
                    ? <div class="alert alert-danger alert-dismissible fade show text-left" role="alert">
                        {this.state.messages.map(function (item, i) {

                            return <li key={i}>{item}</li>
                        })}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true" onClick={() => {
                                const error = !this.state.errors
                                this.setState({ errors: error })
                            }}>&times;</span>
                        </button>
                    </div>
                    : null
                }

                <div className="row">
                    <TextField
                        variant="outlined"
                        // margin="normal"
                        required
                        id="business_name"
                        onChange={this.valueChangeHandler}
                        label="Salon Name"
                        name="sal-name"
                        autoComplete=""
                        className="col-md mb-3"
                    />
                    <FormControl variant="outlined" className="col-md mb-3" fullWidth >
                        <InputLabel>Salon Type</InputLabel>
                        <Select
                            name="business_type"
                            onChange={(e) => this.valueChangeHandler(e)}
                            label="Saloon Type"
                        >
                            <MenuItem value="" disabled>
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'male'}>Male</MenuItem>
                            <MenuItem value={'female'}>Female</MenuItem>
                            <MenuItem value={'unisex'}>Unisex</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className="row">
                    <TextField
                        label="Line 1"
                        multiline
                        id="line1"
                        onChange={this.valueChangeHandler}
                        rows={1}
                        variant="outlined"
                        className="col-md mb-3"
                    // margin="normal"
                    />
                </div>

                <div className="row">
                    <TextField
                        label="Line 2"
                        multiline
                        id="line2"
                        onChange={this.valueChangeHandler}
                        rows={1}
                        variant="outlined"
                        className="col-md mb-3"
                    // margin="normal"
                    />
                </div>

                <div className="row">
                    <TextField
                        label="Area"
                        multiline
                        id="area"
                        onChange={this.valueChangeHandler}
                        rows={1}
                        variant="outlined"
                        className="col-md mb-3"
                    // margin="normal"
                    />
                </div>


                <div className="row">
                    <FormControl variant="outlined" className="col-md mb-3">
                        <InputLabel>City</InputLabel>
                        <Select
                            name="city"
                            onChange={(e) => this.valueChangeHandler(e)}
                            label="City"
                        >
                            <MenuItem value="" disabled>
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'1'}>Noida</MenuItem>
                            <MenuItem value={'2'}>Indore</MenuItem>
                            <MenuItem value={'3'}>Mumbai</MenuItem>
                            <MenuItem value={'4'}>Chennai</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Pincode"
                        multiline
                        id="pincode"
                        onChange={this.valueChangeHandler}
                        rows={1}
                        variant="outlined"
                        className="col-md"
                    // margin="normal"
                    />
                </div>
                <div className="row">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        id="mapURL"
                        onChange={this.mapValueHandler}
                        label="Map URL (optional)"
                        name="sal-name"
                        autoComplete=""
                        className="col-md"
                        helperText="Copy URL from the Address Bar when you search for your Salon in the Google Maps"
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



const mapStateToProps = (state) => {
    return {
        user_id: state.user_id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onResponseRecieve: (data) => dispatch({
            type: actionTypes.UPDATE_BUSINESS_ID,
            business_id: data
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaloonInfoForm)



