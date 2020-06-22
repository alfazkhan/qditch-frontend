import React, { Component } from 'react'
import { TextField } from '@material-ui/core'
// import './BasicDetails.css'
import { Button, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core'
import Colors from '../../../../Constants/Colors'




class SaloonInfoForm extends Component {

    state = {
        values:{
            business_name:'',
            business_type:'',
            user_id:'1',
            map_url:''
        }
    }

    componentDidMount() {
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
        console.table(this.state.values)
        this.props.toggleLoading(true)

        setTimeout(() => {
            const mode = this.props.mode
            const progress = mode === 'User' ? 50 : 100*2/8
            this.props.changeProgress(progress)
            this.props.toggleLoading(false)
            this.props.nextScreen('SetTimings')
        }, 1000)
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
                            <MenuItem value={'Male'}>Male</MenuItem>
                            <MenuItem value={'Female'}>Female</MenuItem>
                            <MenuItem value={'Unisex'}>Unisex</MenuItem>
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

export default SaloonInfoForm



