import React, { Component } from 'react'
import { TextField } from '@material-ui/core'
// import './BasicDetails.css'
import { Button, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core'
import Colors from '../../../../Constants/Colors'
import {connect} from 'react-redux'
import Axios from '../../../../Axios'
import * as actionTypes from '../../../../store/Action/Action'
import Heading from '../../../../Components/Heading/Heading'
import * as Validator from '../../../../Validator'


class SaloonInfoForm extends Component {

    state = {
        values:{
            business_name:'',
            business_type:'',
            map_url:'',
            address: ''
        },
        user_id: null,
        errors: false,
        messages: []
    }

    componentDidMount() {
        this.setState({user_id:this.props.user_id},()=>{
            console.log(this.state.user_id)
        })
    }

    valueChangeHandler = (event,param="null") => {
        const field = param==='business_type'?event.target.value:event.target.id
        const newValues=this.state.values
        if(param==='business_type'){
            newValues.business_type=field
        }
        else{
            newValues[field]=event.target.value
        }

        // newValues.role= this.state.Mode === 'Business' ? '1':'0'
        this.setState({values:newValues})
        // console.log(newValues)

    }

    pageChangeHandler=()=>{
        this.props.toggleLoading(false)
        const progress = 100*2 / 8
        this.props.changeProgress(progress)
        this.props.nextScreen('SetTimings')
    }


    validateData = () => {
        const values = this.state.values
        const messages = []
        

        //Saloon Name
        !Validator.isPresent(values['business_name']) ? messages.push("Business Name is Empty") : console.log()
        //Saloon type
        !Validator.isPresent(values['business_type']) ? messages.push("Business Type is Empty") : console.log()
        //Address
        !Validator.isPresent(values['address']) ? messages.push("Address is Empty") : console.log()


        if (messages.length !== 0) {
            this.setState({ messages: messages, errors: true })
            return false
        }
        this.setState({ errors: false })
        return true 

    }

    submitHandler = () => {
        console.table(this.state.values)
        if(this.validateData()){
            const url = 'api/users/business/'
            var data = JSON.stringify({
                "business_name": this.state.values.business_name,
                "business_type": this.state.values.business_type,
                "user": this.state.user_id,
                "stylist_available": 0,
                "address" : this.state.values.address
            });
    
            this.props.toggleLoading(true)
    
            Axios.post(url, data)
                .then((response)=>{
                    console.log(JSON.stringify(response.data));
                    this.props.onResponseRecieve(response.data.id)
                    this.pageChangeHandler()
                })
                .catch((error)=>{
                    this.props.toggleLoading(false)
                    console.log(error.response);
                });
        }
        
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
                            <span aria-hidden="true" onClick={()=>{
                                const error = !this.state.errors
                                this.setState({errors:error})
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
                        className="col-md"
                    />
                    <FormControl variant="outlined" className="col-md">
                        <InputLabel>Salon Type</InputLabel>
                        <Select
                            // value={age}
                            onChange={(e)=>this.valueChangeHandler(e,'business_type')}
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
                        label="Address"
                        multiline
                        id="address"
                        onChange={this.valueChangeHandler}
                        rows={4}
                        variant="outlined"
                        className="col-md"
                        margin="normal"
                    />
                </div>
                {/* <div className="row">
                    <TextField
                        label="Google Map URL"
                        multiline
                        id="map_url"
                        onChange={this.valueChangeHandler}
                        rows={4}
                        variant="outlined"
                        className="col-md"
                        margin="normal"
                    />
                </div> */}
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



const mapStateToProps = (state) =>{ 
    return{
        user_id:state.user_id
    }    
}

const mapDispatchToProps = dispatch=>{
    return {
        onResponseRecieve: (data) => dispatch({
            type: actionTypes.UPDATE_BUSINESS_ID,
            business_id: data
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaloonInfoForm)



