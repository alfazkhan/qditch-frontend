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
            address: this.props.data['address'],

        },
        menuItems: null
    }

    componentDidMount() {



    }

    valuesChangeHandler = (e) => {
        const values = this.state.values
        if(e.target.name === "type"){
            values['type'] = e.target.value
            this.setState({values:values})
            return true
        }

        if(e.target.id === "name"){
            values['name'] = e.target.value
            this.setState({values:values})
            return true
        }

        if(e.target.id === "address"){
            values['address'] = e.target.value
            this.setState({values:values})
            return true
        }

    }


    submitDataHandler=()=>{
        console.log(this.state.values)
        const url = 'api/users/business/'+ this.props.data['id'] + '/'
        const data = {
            "business_name": this.state.values.name,
            "business_type": this.state.values.type,
            "address": this.state.values.address
        }
        this.setState({Loading:true})
        Axios.patch(url,data)
        .then(res=>{
            this.setState({Loading:false})
            this.props.reload()
            console.log(res.data)
        })
        .catch(e=>{
            this.setState({Loading:false})
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
                                        <InputLabel>{(this.state.values.type).toUpperCase()}</InputLabel>
                                        <Select
                                            name='category'
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
                                    <th scope="row">Business Address</th>
                                    <td>
                                        <TextField
                                            multiline
                                            fullWidth
                                            rows={4}
                                            defaultValue={this.state.values.address}
                                            onChange={this.valuesChangeHandler}
                                            id="address"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                }

                <div>

                    <Button variant="contained" size="large" style={{ backgroundColor: Colors.success, color: 'white' }} className="mt-2 mb-3" onClick={this.submitDataHandler}>
                        Save
                    </Button>
                </div>
            </div>
        )
    }
}

export default EditProfile
