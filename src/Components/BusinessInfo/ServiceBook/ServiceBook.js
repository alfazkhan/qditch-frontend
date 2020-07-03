import React, { Component } from 'react'
import { Paper, Checkbox, FormControlLabel, TextField, Chip, Button } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Colors from '../../../Constants/Colors'

export class ServiceBook extends Component {

    state = {
        services: {},
        custom_services: {},
        serviceTableList: [],
        selectedServices: {},
        totalPrice: 0,
        totalDuration: 0,
        defaultTime: null
    }

    componentDidMount() {
        const services = this.props.data['business_services']
        const custom_services = this.props.data['custom_business_services']
        
        // console.log(services,custom_services)
        this.setState({
            services: services,
            custom_services: custom_services,
        }, () => {
            this.setServiceTable()
        })

    }

    timeConvert = (n) => {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        if (rhours === 0) {
            return rminutes + " minute(s)"
        }
        return rhours + " hour(s) and " + rminutes + " minute(s)";
    }

    setServiceTable = () => {

        const services = this.state.services
        const custom_services = this.state.custom_services
        const list = []

        for (var key in services) {
            list.push(
                <tr style={{color:'#fff'}}>
                    <th scope="row">
                        <FormControlLabel
                            value={["services", services[key].id], services[key].business_service_price, services[key].business_service_duration}
                            control={<Checkbox style={{color:'#fff'}} />}
                            // label={Categories[i]}
                            // labelPlacement="end"
                            // index={i}
                            onChange={this.serviceSelectHandler}
                        />
                    </th>

                    <td>{services[key].service_name}</td>
                    <td>{services[key].business_service_price} &#8377;</td>
                    <td>{this.timeConvert(services[key].business_service_duration)}</td>
                </tr>

            )
        }
        for (var key in custom_services) {
            list.push(
                <tr style={{color:'#fff'}}>
                    <th scope="row">
                        <FormControlLabel
                            value={["custom-services", custom_services[key].id]}
                            control={<Checkbox style={{color:'#fff'}} />}
                            // label={Categories[i]}
                            // labelPlacement="end"
                            // index={i}
                            
                            onChange={this.serviceSelectHandler}
                        />
                    </th>
                    <td>{custom_services[key].service_name}</td>
                    <td>{custom_services[key].business_service_price} &#8377;</td>
                    <td>{this.timeConvert(custom_services[key].business_service_duration)}</td>
                </tr>
            )
        }

        this.setState({
            serviceTableList: list
        })

    }

    serviceSelectHandler = (e) => {
        console.log(e.target.value)
    }


    render() {
        return (
            <div>
                <Paper className="" elevation={3} style={{backgroundColor:'#333'}}>
                    <table class="table table-striped">
                        <thead>
                            <tr style={{color:'#fff'}}>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.serviceTableList}
                        </tbody>
                    </table>
                </Paper>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        id="date-picker-inline"
                                        label="Select Date"
                                        // value={selectedDate}
                                        // onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </th>
                            <th scope="col">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardTimePicker
                                        id="time-picker"
                                        label="Select Time"
                                        // value={selectedDate}
                                        // onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </th>
                            <th scope="col">
                                <Chip color="primary" className="" label="100 ₹" />
                            </th>
                            <th scope="col">
                                <Chip color="primary" className="" label="1 Hour" />
                            </th>
                        </tr>
                    </thead>
                </table>
                <Button variant="contained" fullWidth style={{backgroundColor: Colors.success,color:'#fff'}}>
                    Book Now
                </Button>
                
            </div>
        )
    }
}

export default ServiceBook
