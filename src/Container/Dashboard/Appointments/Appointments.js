import React, { Component } from 'react'
import Axios from '../../../Axios'
import Heading from '../../../Components/Heading/Heading'
import { CircularProgress, Button, ButtonGroup } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';


export class Appointments extends Component {

    state = {
        appointments: {

        },
        business_services: {},
        custom_business_services: {},
        date: new Date(),


        appointmentList: [],

        Loading: true
    }


    componentDidMount() {
        this.setAppointment()
    }

    setYesterdayDate = () => {
        const date = this.state.date
        date.setDate(date.getDate() - 1);

        // console.log(date)

        this.setState({ date: date, Loading: true }, () => {
            this.setAppointment()
        })

    }

    handleDateChange = (e) => {
        const date = this.state.date
        console.log(e.getDate())
        date.setDate(e.getDate())
        this.setState({ date: date, Loading: true }, () => {
            this.setAppointment()
        })
    }


    setTommorowDate = () => {

        const date = this.state.date
        date.setDate(date.getDate() + 1);

        // console.log(date)

        this.setState({ date: date, Loading: true }, () => {
            this.setAppointment()
        })

    }

    setAppointment = () => {
        const id = this.props.data['id']
        let date = this.state.date.toString().split(' ')
        date = date[2] + '/' + this.getMonthFromString(date[1]) + '/' + date[3]
        // console.log(date)
        const promise = []
        const data = {
            "business": id,
            "start_time": date
        }

        // const users = this.state.users
        // promise.push(
        //     Axios.get('api/users/user_data')
        //         .then(res => {
        //             // console.log(res.data)
        //             for (var key in res.data) {
        //                 users[res.data[key].users] = { ...users[res.data[key]], name: res.data[key].first_name + ' ' + res.data[key].last_name }
        //             }
        //         })
        //         .catch(e => {
        //             console.log(e.response)
        //         })
        // )

        const business_services = this.state.business_services

        for (var key in this.props.data['business_services']) {
            var service = this.props.data['business_services'][key]
            business_services[service.id] = { ...business_services[service.id], name: service.service_name, price: service.business_service_price, duration: service.business_service_duration }

        }

        const custom_business_services = this.state.custom_business_services
        for (var key in this.props.data['custom_business_services']) {
            var service = this.props.data['custom_business_services'][key]
            // console.log(service)
            custom_business_services[service.id] = { ...custom_business_services[service.id], name: service.service_name, price: service.business_service_price, duration: service.business_service_duration }

        }

        let appointmentData = ""

        promise[0] = Axios.post('api/booking/business_bookings/', data)
            .then(res => {
                appointmentData = res.data
                // console.log(res.data)

            })
            .catch(e => {
                console.log(e)
            })


        Promise.all(promise)
            .then(res => {
                const appointments = {}
                for (var key in appointmentData) {
                    // console.log(appointmentData[key])
                    appointments[appointmentData[key].id] = { ...appointments[appointmentData[key].id], service: appointmentData[key]['service'] }
                    appointments[appointmentData[key].id] = { ...appointments[appointmentData[key].id], custom_service: appointmentData[key]['custom_service'] }
                    appointments[appointmentData[key].id] = { ...appointments[appointmentData[key].id], user: appointmentData[key]['user_name'] }
                    appointments[appointmentData[key].id] = { ...appointments[appointmentData[key].id], start_time: appointmentData[key]['start_time'] }
                    appointments[appointmentData[key].id] = { ...appointments[appointmentData[key].id], end_time: appointmentData[key]['end_time'] }
                    appointments[appointmentData[key].id] = { ...appointments[appointmentData[key].id], status: appointmentData[key]['status'] }
                    appointments[appointmentData[key].id] = { ...appointments[appointmentData[key].id], booking_id: appointmentData[key]['booking_id'] }
                    appointments[appointmentData[key].id] = { ...appointments[appointmentData[key].id], stylist: appointmentData[key]['stylist'] }
                }
                this.setState({ appointments: appointments }, () => {
                    this.setAppointmentTable()
                })
            })




    }

    getMonthFromString = (mon) => {
        return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1
    }


    formatAMPM = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    setAppointmentTable = () => {
        const appointments = this.state.appointments
        const business_services = this.state.business_services
        const custom_business_services = this.state.custom_business_services


        const appointmentList = []

        let booking_id = 123

        for (var key in appointments) {
            // console.log(appointments[key])
            // console.log(business_services[appointments[key].service])
            const start = appointments[key].start_time.split('T')
            const startTime = new Date(2020, 6, 2, start[1].slice(0, -1).split(':')[0], start[1].slice(0, -1).split(':')[1])
            const end = appointments[key].end_time.split('T')
            const endTime = new Date(2020, 6, 2, end[1].slice(0, -1).split(':')[0], end[1].slice(0, -1).split(':')[1])
            const current_booking_id = appointments[key].booking_id
            if (current_booking_id !== booking_id) {
                booking_id = current_booking_id
                appointmentList.push(

                    <tr className="table-warning">
                        <th>{current_booking_id}</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        {appointments[key].status === "confirm"
                            ?
                            <th><div type="button" onClick={this.cancelBookingHandler} id={current_booking_id} class="btn btn-danger btn-sm">Cancel Appointment</div></th>
                            : <th></th>}
                    </tr>

                )
            }
            appointmentList.push(
                <tr>
                    <th scope="row">{appointments[key].service !== null ? business_services[appointments[key].service].name : custom_business_services[appointments[key].custom_service].name}</th>
                    <td> {appointments[key].user} </td>
                    <td> {appointments[key].stylist} </td>
                    <td>{this.formatAMPM(startTime)}</td>
                    <td>{this.formatAMPM(endTime)}</td>
                    <td>{appointments[key].service !== null ? business_services[appointments[key].service].price + '₹' : custom_business_services[appointments[key].custom_service].price + '₹'}</td>
                    <td className={appointments[key].status === "confirm" ? "text-success text-uppercase" : "text-danger text-uppercase"} >{appointments[key].status}</td>
                </tr>
            )

        }

        this.setState({
            appointmentList: appointmentList,
            Loading: false
        })

    }

    cancelBookingHandler = (e) => {
        console.log(e.target.id)

        // eslint-disable-next-line no-restricted-globals
        let allow = confirm("Are you Sure you Want cancel this Appointment?")

        if (allow) {

        this.setState({Loading: true})
        const url = 'api/booking/booking_cancelled_by_business/'
        const data = {
            "booking_id": e.target.id
        }

        Axios.post(url, data)
            .then(res => {
                console.log(res.data)
                this.setState({Loading: false})
                this.props.reload()
            })
            .catch(e => {
                console.log(e.response)
                this.setState({Loading: false})
            })
        }


    }



    render() {
        return (
            <div className="container">
                <Heading text="Appointments" />
                <div className="row">
                    <Button variant="contained" color="primary" className="col-2 h-75 my-auto" onClick={this.setYesterdayDate} > {window.innerWidth > 768 ? "<< Previous Day" : "<<"}</Button>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            className={window.innerWidth > 768 ? "col-6 mx-auto" : "col mr-2 ml-2"}
                            variant="inline"
                            format="dd/MM/yyyy"
                            id="date-picker-inline"
                            label="Select Date"
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

                    <Button variant="contained" color="primary" className="col-2 h-75 my-auto" onClick={this.setTommorowDate} >{window.innerWidth > 768 ? "Next Day >>" : ">>"}</Button>
                </div>

                {this.state.Loading ? <CircularProgress />
                    :
                    <div style={{ height: window.innerHeight, overflow: "scroll" }}>
                        <table class="table mt-4" >
                            <thead>
                                <tr>
                                    <th scope="col">Service</th>
                                    <th scope="col">User</th>
                                    <th scope="col">Stylist</th>
                                    <th scope="col">Start</th>
                                    <th scope="col">End</th>
                                    <th scope="col">Cost</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.appointmentList}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        )
    }
}

export default Appointments
