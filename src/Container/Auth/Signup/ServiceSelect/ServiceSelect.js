import React, { Component } from 'react'
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
// import './CategorySelect.css'
import Colors from '../../../../Constants/Colors'




class ServiceSelect extends Component {

    state = {
        ServiceList: [
            'Hair', 'Skin', 'Spa', 'Makeup', 'Eyebrows', 'Hair Removal', 'Nails', 'Massage'
        ],
        List: [],
    }

    componentDidMount() {
        //getServices from server
        this.addServiceField()
    }

    addServiceField=()=>{
        const List = this.state.List
        const serviceItem = (<div className="row mt-3" key={new Date()}>
            <FormControl variant="outlined" className="col-sm">
                <InputLabel>Main Category</InputLabel>
                <Select
                    // value={age}
                    // onChange={handleChange}
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
            <TextField
                variant="outlined"
                // margin="normal"
                required
                id="sal-name"
                label="Price (&#x20b9;)"
                name="sal-name"
                autoComplete=""
                className="col-sm"
            />
            <TextField
                variant="outlined"
                // margin="normal"
                required
                id="sal-name"
                label={"Duration(Min)"}
                name="sal-name"
                autoComplete=""
                className="col-sm"
            />
            
        </div>)
        List.push(serviceItem)
        this.setState({List: List})

    }

    valueChangeHandler = () => {

    }

    submitHandler = () => {
        this.props.toggleLoading(true)

        setTimeout(() => {
            const mode = this.props.mode
            const progress = mode === 'User' ? 50 : 100*5/8
            this.props.changeProgress(progress)
            this.props.toggleLoading(false)
            this.props.nextScreen('StylistSelect')
        }, 1000)
    }


    render() {
        return (
            <div className="container" style={styles.screen}>
                <div className="list" style={{ width: '100%', height: window.innerHeight / 3 , overflowX:'hidden'}}>
                    {this.state.List}
                </div>
                <div>
                    <Button variant="contained" size="small" color="primary" className="mt-4" onClick={this.addServiceField}>
                    &#x2b; Add New Service
                    </Button>

                </div>
                <div className="submitButton text-right">
                    <Button variant="contained" size="large" style={{ backgroundColor: Colors.success, color: 'white' }} onClick={this.submitHandler}>
                        Next
                    </Button>
                </div>
            </div >
        )
    }

}


const styles = {
    screen: {
        marginTop: 40
    }
}

export default ServiceSelect



