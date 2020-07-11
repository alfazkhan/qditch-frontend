import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from '../../Axios';
import { CircularProgress, ButtonGroup } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';


export class ScheduleModal extends Component {


    state = {
        Loading: true,
        appointmentList: [],
        appointments: {},
        date: new Date()
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


    setTommorowDate = () => {

        const date = this.state.date
        date.setDate(date.getDate() + 1);

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


    setAppointment = () => {
        const user_id = this.props.user_id
        let date = this.state.date.toString().split(' ')
        date = date[2] + '/' + this.getMonthFromString(date[1]) + '/' + date[3]

        const data = {
            "user": user_id,
            "start_date": date
        }



        let appointmentData = ""
        let promise = [Axios.post('api/booking/booking_user/', data)
            .then(res => {
                appointmentData = res.data

            })
            .catch(e => {
                console.log(e.response)
            })]


        Promise.all(promise)
            .then(res => {
                const appointments = {}
                for (var key in appointmentData) {
                    // console.log(appointmentData[key].id)
                    appointments[appointmentData[key].id] = { ...appointments[appointmentData[key].id], business: appointmentData[key]['business'] }
                    appointments[appointmentData[key].id] = { ...appointments[appointmentData[key].id], custom_service: appointmentData[key]['custom_service'] }
                    appointments[appointmentData[key].id] = { ...appointments[appointmentData[key].id], service: appointmentData[key]['service'] }
                    appointments[appointmentData[key].id] = { ...appointments[appointmentData[key].id], start_time: appointmentData[key]['start_time'] }
                    appointments[appointmentData[key].id] = { ...appointments[appointmentData[key].id], end_time: appointmentData[key]['end_time'] }
                    appointments[appointmentData[key].id] = { ...appointments[appointmentData[key].id], status: appointmentData[key]['status'] }
                    appointments[appointmentData[key].id] = { ...appointments[appointmentData[key].id], booking_id: appointmentData[key]['booking_id'] }

                }
                this.setState({ appointments: appointments }, () => {
                    this.setAppointmentTable()
                })
            })
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
        // const business_services = this.state.business_services
        // const custom_business_services = this.state.custom_business_services

        // console.log(appointments)
        const appointmentList = []

        let booking_id = 123


        for (var key in appointments) {
            // console.log(business_services[appointments[key].service])
            const start = appointments[key].start_time.split('T')
            const startTime = new Date(2020, 6, 2, start[1].slice(0, -1).split(':')[0], start[1].slice(0, -1).split(':')[1])
            const end = appointments[key].end_time.split('T')
            const endTime = new Date(2020, 6, 2, end[1].slice(0, -1).split(':')[0], end[1].slice(0, -1).split(':')[1])
            const current_booking_id = appointments[key].booking_id
            // console.log(current_booking_id)
            if (current_booking_id !== booking_id) {
                booking_id = current_booking_id
                appointmentList.push(

                    <tr className='table-warning'>
                        <th>{current_booking_id}</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th><div type="button" id={current_booking_id} onClick={this.cancelBookingHandler} class="btn btn-danger btn-sm">Cancel Appointment</div></th>
                    </tr>

                )
            }
            appointmentList.push(
                <tr>
                    <td> {appointments[key].business} </td>
                    <th scope="row">{appointments[key].service !== null ? appointments[key].service : appointments[key].custom_service}</th>
                    <td> {appointments[key].start_time.split('T')[0]} </td>
                    <td>{this.formatAMPM(startTime)}</td>
                    <td>{this.formatAMPM(endTime)}</td>
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

            this.setState({ Loading: true })
            const url = 'api/booking/booking_cancelled_by_user/'
            const data = {
                "booking_id": e.target.id
            }

            Axios.post(url, data)
                .then(res => {
                    console.log(res.data)
                    this.setState({ Loading: false })
                    this.props.handleClose()
                })
                .catch(e => {
                    console.log(e.response)
                    this.setState({ Loading: false })
                    this.props.handleClose()
                })
        }


    }


    getMonthFromString = (mon) => {
        return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1
    }


    render() {
        return (
            <div id="booking-data">
                <Dialog
                    open={true}
                    onClose={this.props.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="lg"
                >
                    <DialogTitle id="alert-dialog-title">{"All Appointments"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">

                            {/* <Button variant="contained" color="primary" className="mr-5" onClick={this.setYesterdayDate} > {"<< Previous Day"}</Button>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
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

                            <Button variant="contained" color="primary" className="ml-5" onClick={this.setTommorowDate} >{"Next Day >>"}</Button> */}


                            {this.state.Loading ? <CircularProgress />
                                :
                                <div style={{ height: window.innerHeight / 2, overflow: "scroll", overflowX: "hidden" }}>
                                    <table class="table table-striped mt-4" >
                                        <thead>
                                            <tr>
                                                <th scope="col">Business</th>
                                                <th scope="col">Service</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Start</th>
                                                <th scope="col">End</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.appointmentList}
                                        </tbody>
                                    </table>
                                </div>
                            }




                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="secondary">
                            Close
                        </Button>

                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default ScheduleModal
