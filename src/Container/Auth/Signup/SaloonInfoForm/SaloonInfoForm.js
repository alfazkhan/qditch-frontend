import React, { Component } from 'react'
import { TextField } from '@material-ui/core'
// import './BasicDetails.css'
import { Button, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core'
import Colors from '../../../../Constants/Colors'
import {connect} from 'react-redux'
import Axios from '../../../../Axios'
import * as actionTypes from '../../../../store/Action/Action'


class SaloonInfoForm extends Component {

    state = {
        values:{
            business_name:'',
            business_type:'',
            map_url:''
        },
        user_id: null
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

    submitHandler = () => {
        const url = 'users/business/'
        var data = JSON.stringify({
            "business_name": this.state.values.business_name,
            "business_type": this.state.values.business_type,
            "user": this.state.user_id,
            "stylist_available": 0
        });

        this.props.toggleLoading(true)

        Axios.post(url, data)
            .then((response)=>{
                console.log(JSON.stringify(response.data));
                this.props.onResponseRecieve(response.data.id)
                this.props.toggleLoading(false)
                const progress = 100*2 / 8
                this.props.changeProgress(progress)
                this.props.nextScreen('SetTimings')
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
                        // margin="normal"
                        required
                        id="business_name"
                        onChange={this.valueChangeHandler}
                        label="Saloon Name"
                        name="sal-name"
                        autoComplete=""
                        className="col-md"
                    />
                    <FormControl variant="outlined" className="col-md">
                        <InputLabel>Saloon Type</InputLabel>
                        <Select
                            // value={age}
                            onChange={(e)=>this.valueChangeHandler(e,'business_type')}
                            label="Age"
                        >
                            <MenuItem value="">
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
                        label="Google Map URL"
                        multiline
                        id="map_url"
                        onChange={this.valueChangeHandler}
                        rows={4}
                        variant="outlined"
                        className="col-md"
                        margin="normal"
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



