import React, { Component } from 'react'
import { Paper, Checkbox, FormControlLabel, TextField, Chip, Button, Snackbar } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Colors from '../../../Constants/Colors'
import { connect } from 'react-redux'
import Axios from '../../../Axios'
import MuiAlert from '@material-ui/lab/Alert';
import ResponseModal from './ResponseModal';
import ScheduleModal from '../ScheduleModal/ScheduleModal';


export class ServiceBook extends Component {

    state = {
        services: {},
        custom_services: {},
        serviceTableList: [],
        business: this.props.data['id'],
        date: new Date(),
        time: new Date(),

        scheduleModal: false,
        scheduleModalContent: null,


        totalPrice: 0,
        totalDuration: 0,
        startTime: null,
        startDate: null,
        serviceSelected: [],
        customServiceSelected: [],
        allowSubmit: false,


        responseModal: false,
        responseMessage: [],
        bookingSuccess: false

    }

    componentDidMount() {
        const services = this.props.data['business_services']
        console.log(this.props.data)
        const custom_services = this.props.data['custom_business_services']

        let date = new Date().toString().split(' ')
        const startDate = date[2] + '/' + this.getMonthFromString(date[1]) + '/' + date[3]

        // console.log(services,custom_services)
        this.setState({
            services: services,
            custom_services: custom_services,
            startDate: startDate,
            startTime: date[4]
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
                <tr style={{ color: '#fff' }}>
                    <th scope="row">
                        <FormControlLabel
                            value={["services", services[key].id, services[key].business_service_price, services[key].business_service_duration]}
                            control={<Checkbox style={{ color: '#fff' }} />}
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
                <tr style={{ color: '#fff' }}>
                    <th scope="row">
                        <FormControlLabel
                            value={["custom-services", custom_services[key].id, custom_services[key].business_service_price, custom_services[key].business_service_duration]}
                            control={<Checkbox style={{ color: '#fff' }} />}
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
        const info = e.target.value.split(',')
        const type = info[0]
        const id = info[1]
        const serviceSelected = this.state.serviceSelected
        const customServiceSelected = this.state.customServiceSelected
        console.log(id)
        if (this.state.serviceSelected.includes(id)) {
            var Index = serviceSelected.indexOf(id)
            serviceSelected.splice(Index, 1)
            const price = this.state.totalPrice - parseInt(info[2])
            const duration = this.state.totalDuration - parseInt(info[3])
            this.setState({
                totalPrice: price,
                totalDuration : duration
            })
            return true
        }

        if (this.state.customServiceSelected.includes(id)) {
            var Index = customServiceSelected.indexOf(id)
            customServiceSelected.splice(Index, 1)
            const price = this.state.totalPrice - parseInt(info[2])
            const duration = this.state.totalDuration - parseInt(info[3])
            this.setState({
                totalPrice: price,
                totalDuration : duration
            })
            return true

        }

        const price = this.state.totalPrice + parseInt(info[2])
        const duration = this.state.totalDuration + parseInt(info[3])
        
        if (type === "services") {
            serviceSelected.push(id)
        }
        else {
            customServiceSelected.push(id)
        }

        this.setState({
            totalPrice: price,
            totalDuration: duration,
            selectedServices: serviceSelected,
            customServiceSelected: customServiceSelected,
            allowSubmit: true
        })


    }

    getMonthFromString = (mon) => {
        return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1
    }

    handleDateChange = (e) => {
        let date = e.toString().split(' ')

        date = date[2] + '/' + this.getMonthFromString(date[1]) + '/' + date[3]
        this.setState({
            startDate: date,
            date: e
        })
    }
    handleTimeChange = (e) => {
        let time = e.toString().split(' ')
        time = time[4]
        //validation
        this.setState({
            startTime: time,
            time: e
        })
    }


    scheduleModalHandler = () => {

        const scheduleModalContent = (
            <ScheduleModal close={() => this.setState({ scheduleModal: false })} business={this.state.business} startDate={this.state.startDate} />
        )

        this.setState({
            scheduleModalContent: scheduleModalContent,
            scheduleModal: true
        })

    }

    submitHandler = () => {
        // console.table(this.state
        const data = {
            "user": this.props.user_id,
            "business": this.state.business,
            "business_services": this.state.serviceSelected,
            "custom_business_services": this.state.customServiceSelected,
            "start_time": this.state.startDate + ' ' + this.state.startTime,
            "total_time": this.state.totalDuration,
            "total_cost": this.state.totalPrice

        }
        const messages = []
        console.log(data)
        const url = 'api/booking/bookings/'
        Axios.post(url, data)
            .then(res => {
                console.log(res.data)
                this.setState({
                    responseModal: true,
                    bookingSuccess: true
                })
                return true
            })
            .catch(e => {
                console.log(e.response)
                messages.push(e.response.data.Detail)
                this.setState({
                    responseModal: true,
                    responseMessage: messages,
                    bookingSuccess: false
                })
            })
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <Paper className="col" elevation={3} style={{ backgroundColor: '#333' }}>
                        <table class="table table-striped">
                            <thead>
                                <tr style={{ color: '#fff' }}>
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
                                            disablePast
                                            value={this.state.date}
                                            // invalidDateMessage=""
                                            format="dd/MM/yyyy"
                                            maxDateMessage=""
                                            minDateMessage=""
                                            onChange={this.handleDateChange}
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
                                            value={this.state.time}
                                            onChange={this.handleTimeChange}
                                            // invalidDateMessage=""
                                            KeyboardButtonProps={{
                                                'aria-label': 'change time',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>

                {this.state.serviceSelected.length > 0 || this.state.customServiceSelected.length > 0
                    ? <div className="row">
                        <th scope="col">
                            <Chip color="primary" className="col ml-5 mr-5" label={this.state.totalPrice + " ₹"} />
                        </th>
                        <th scope="col">
                            <Chip color="secondary" className="col ml-5 mr-5" label={this.timeConvert(this.state.totalDuration)} />
                        </th>
                    </div>
                    : null}

                <Button variant="contained"
                    className="mt-4"
                    fullWidth
                    color="secondary"
                    onClick={this.scheduleModalHandler}
                >
                    View This Date Schedule
                </Button>

                {this.state.scheduleModal ? this.state.scheduleModalContent : null}
                {this.props.user_id
                    ? <Button variant="contained"
                        className="mt-4"
                        fullWidth
                        style={{ backgroundColor: this.state.allowSubmit ? Colors.success : 'grey', color: '#fff' }}
                        onClick={this.submitHandler}
                    >
                        Book Now
                </Button>
                    :
                    <strong className="text-danger">*You need Sign In to Book an Appointment</strong>
                }

                {this.state.responseModal
                    ? <ResponseModal close={() => this.setState({ responseModal: false })}
                        messages={this.state.responseMessage}
                        status={this.state.bookingSuccess}
                    />
                    : null}




            </div>
        )
    }
}






const mapStateToProps = (state) => ({

    user_id: state.user_id

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceBook)
