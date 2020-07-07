import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from '../../Axios';
import { CircularProgress, ButtonGroup } from '@material-ui/core';


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

    setAppointment=()=>{
        const user_id = this.props.user_id
        let date = this.state.date.toString().split(' ')
        date = date[2] + '/' + this.getMonthFromString(date[1]) + '/' + date[3]
        console.log(user_id, date)

        const data = {
            "user": user_id,
            "start_date": date
        }



        let appointmentData = ""
        let promise = [Axios.post('api/booking/booking_user/', data)
            .then(res => {
                console.log(res.data)
                appointmentData = res.data

            })
            .catch(e => {
                console.log(e.response)
            })]


        Promise.allSettled(promise)
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

        for (var key in appointments) {
            // console.log(appointments[key])
            // console.log(business_services[appointments[key].service])
            const start = appointments[key].start_time.split('T')
            const startTime = new Date(2020, 6, 2, start[1].slice(0, -1).split(':')[0], start[1].slice(0, -1).split(':')[1])
            const end = appointments[key].end_time.split('T')
            const endTime = new Date(2020, 6, 2, end[1].slice(0, -1).split(':')[0], end[1].slice(0, -1).split(':')[1])

            appointmentList.push(
                <tr>
                    <td> {appointments[key].business} </td>
                    <th scope="row">{appointments[key].service !== null ? appointments[key].service : appointments[key].custom_service}</th>
                    <td>{this.formatAMPM(startTime)}</td>
                    <td>{this.formatAMPM(endTime)}</td>
                    <td className={appointments[key].status === "confirm" ? "text-success" : "text-danger"} >{appointments[key].status}</td>
                </tr>
            )
        }

        this.setState({
            appointmentList: appointmentList,
            Loading: false
        })
    }


    getMonthFromString = (mon) => {
        return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1
    }


    render() {
        return (
            <div>
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

                            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                <Button onClick={this.setYesterdayDate} > {"<< Previous Day"}</Button>
                                <Button>{this.state.date.toDateString()}</Button>
                                <Button onClick={this.setTommorowDate} >{"Next Day >>"}</Button>
                            </ButtonGroup>
                            

                            {this.state.Loading ? <CircularProgress />
                                :
                                <div style={{ height: window.innerHeight / 2, overflow: "scroll", overflowX: "hidden" }}>
                                    <table class="table table-striped mt-4" >
                                        <thead>
                                            <tr>
                                                <th scope="col">Business</th>
                                                <th scope="col">Service</th>
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
