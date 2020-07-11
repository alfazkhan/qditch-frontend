import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Heading from '../../../Components/Heading/Heading';
import { TextField, FormControl, InputLabel, Select, Button, MenuItem } from '@material-ui/core';
import Colors from '../../../Constants/Colors';
import Axios from '../../../Axios';


class EditProfile extends Component {


    state = {
        Loading: false,
        values: {
            name: this.props.data['business_name'],
            type: this.props.data['business_type'],
            line1: this.props.data['line1'],
            line2: this.props.data['line2'],
            city: this.props.data['city'],
            area: this.props.data['area'],
            pincode: this.props.data['pincode'],

        },
        menuItems: null,
        currentType: this.props.data['business_type'],
        currentCity: this.props.data['city_name']
    }

    componentDidMount() {
        const values = this.state.values
        console.log(this.props.data)


    }

    valuesChangeHandler = (e) => {
        const values = this.state.values
        if (e.target.name === "type") {
            
            values['type'] = e.target.value
            this.setState({ values: values })
            return true
        }

        if (e.target.id === "name") {
            values['name'] = e.target.value
            this.setState({ values: values })
            return true
        }

        if (e.target.id === "line1") {
            values['line1'] = e.target.value
            this.setState({ values: values })
            return true
        }

        if (e.target.id === "line2") {
            values['line2'] = e.target.value
            this.setState({ values: values })
            return true
        }

        if (e.target.name === "city") {
            // console.log(e.target.value)
            values['city'] = e.target.value
            this.setState({ values: values },()=>console.table(this.state.values))
            return true
        }

        if (e.target.id === "area") {
            
            values['area'] = e.target.value
            this.setState({ values: values })
            return true
        }

        if (e.target.id === "pincode") {
            values['pincode'] = e.target.value
            this.setState({ values: values })
            return true
        }

    }


    submitDataHandler = () => {
        console.log(this.state.values)
        const url = 'api/users/business/' + this.props.data['id'] + '/'
        const data = {
            "business_name": this.state.values.name,
            "business_type": this.state.values.type,
            "line1": this.state.values.line1,
            "line2": this.state.values.line2,
            "area": this.state.values.area,
            "city": this.state.values.city,
            "pincode": this.state.values.pincode,
        }
        this.setState({ Loading: true })
        Axios.patch(url, data)
            .then(res => {
                this.setState({ Loading: false })
                this.props.reload()
                console.log(res.data)
            })
            .catch(e => {
                this.setState({ Loading: false })
                console.log(e.response)
            })
    }

    render() {
        return (
            <div className="container">

                <Heading text="Edit Business Data" />
                {this.state.Loading ? <CircularProgress /> :
                    <div>
                        <table class="table table-borderless">
                            <tbody>
                                <tr className="my-5">
                                    <th scope="row">Business Name</th>
                                    <td>
                                        <TextField
                                            fullWidth
                                            id="name"
                                            defaultValue={this.state.values.name}
                                            onChange={this.valuesChangeHandler}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Business Type</th>
                                    <FormControl variant="" className="col-sm">
                                        <InputLabel className="text-uppercase" >Current Type: {this.state.currentType} </InputLabel>
                                        <Select
                                            name='type'
                                            onChange={this.valuesChangeHandler}
                                            // value={"10"}
                                            id="type"
                                            label={this.state.values.type}
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            <MenuItem disabled value="">
                                                <em> {this.state.values.type} </em>
                                            </MenuItem>
                                            <MenuItem value={'male'}>Male</MenuItem>
                                            <MenuItem value={'female'}>Female</MenuItem>
                                            <MenuItem value={'unisex'}>Unisex</MenuItem>

                                        </Select>
                                    </FormControl>
                                </tr>
                                <tr>
                                    <th scope="row">Address</th>
                                    <td>
                                        <TextField
                                            label="Line 1"
                                            id="line1"
                                            fullWidth
                                            defaultValue={this.state.values.line1}
                                            onChange={this.valuesChangeHandler}
                                            variant="outlined"
                                            className="col-md"
                                        // margin="normal"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"></th>
                                    <td>
                                        <TextField
                                            label="Line 2"
                                            multiline
                                            id="line2"
                                            onChange={this.valuesChangeHandler}
                                            defaultValue={this.state.values.line2}
                                            rows={1}
                                            variant="outlined"
                                            className="col-md"
                                        // margin="normal"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"></th>
                                    <td>

                                        <TextField
                                            label="Area"
                                            multiline
                                            id="area"
                                            defaultValue={this.state.values.area}
                                            onChange={this.valuesChangeHandler}
                                            rows={1}
                                            variant="outlined"
                                            className="col-md"
                                        // margin="normal"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"></th>
                                    <td>

                                        <FormControl variant="outlined" className="col-md mb-3">
                                            <InputLabel>Current City: {this.state.currentCity}</InputLabel>
                                            <Select
                                                name="city"
                                                onChange={this.valuesChangeHandler}
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
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"></th>
                                    <td>

                                        <TextField
                                            label="Pincode"
                                            id="pincode"
                                            defaultValue={this.state.values.pincode}
                                            onChange={this.valuesChangeHandler}
                                            variant="outlined"
                                            className="col-md"
                                        // margin="normal"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                }

                <div>

                    <Button variant="contained" size="large" style={{ backgroundColor: Colors.success, color: 'white' }} className="mt-2" onClick={this.submitDataHandler}>
                        Save
                    </Button>
                </div>
            </div>
        )
    }
}

export default EditProfile
