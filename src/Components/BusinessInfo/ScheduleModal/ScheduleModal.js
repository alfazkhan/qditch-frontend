import React, { Component } from 'react'
import SalonTimingsCard from '../SalonTimingsCard/SalonTimingsCard'
import Axios from '../../../Axios'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { getDay } from 'date-fns'

export class ScheduleModal extends Component {

    state = {
        Timings: null,
        busyTimes: null,
        tableRows: [],
        Loading: true
    }

    componentDidMount() {

        const business = this.props.business
        const startDate = this.props.startDate

        let promise = []
        const data = {
            "business": business,
            "start_time": startDate
        }

        promise[0] = Axios.post('api/booking/user_bookings/', data)
            .then(res => {
                // console.log(res.data)
                this.setState({ busyTimes: res.data }, () => {
                })
            })
            .catch(e => {
                console.log(e.response.data)
            })


        const id = this.props.timingID
        promise[1] = Axios.get('api/availability/timing/' + id + '/')
            .then(res => {

                const Timings = {
                    "Monday": res.data.monday,
                    "Tuesday": res.data.tuesday,
                    "Wednesday": res.data.wednesday,
                    "Thursday": res.data.thursday,
                    "Friday": res.data.friday,
                    "Saturday": res.data.saturday,
                    "Sunday": res.data.sunday,
                }
                this.setState({ Timings: Timings }, () => {
                })
                // console.log(res.data)
            })
            .catch(e => {
                console.log(e.response)
            })

        Promise.allSettled(promise)
            .then(res => {
                this.setTable()

            })



    }

    stringToTime = (string) => {
        const str = string.split(':')

        const date = new Date(2020, 6, 7, str[0], str[1])
        return date
    }

    pythonToJsTime = (string) => {
        const str = string.split('T')
        const Time = new Date(2020, 6, 2, str[1].slice(0, -1).split(':')[0], str[1].slice(0, -1).split(':')[1])
        return Time
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


    setTable = () => {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const tempDate = this.props.startDate.split('/')
        const startDate = new Date(tempDate[2], parseInt(tempDate[1]) - 1, tempDate[0])
        const openingTime = this.stringToTime(this.state.Timings[days[getDay(startDate)]].split('/')[0])
        const closingTime = this.stringToTime(this.state.Timings[days[getDay(startDate)]].split('/')[1])

        // Start Filling Data

        const tableRows = this.state.tableRows
        const startTimes = this.state.busyTimes.start_time
        const endTimes = this.state.busyTimes.end_time

        for (var i = 0; i < startTimes.length; i++) {
            startTimes[i] = this.pythonToJsTime(startTimes[i])
            endTimes[i] = this.pythonToJsTime(endTimes[i])
        }

        const times = startTimes.concat(endTimes).sort()
        if (times.length >= 2) {

            if (this.formatAMPM(openingTime) !== this.formatAMPM(times[0])) {
                tableRows.push(
                    <tr className="text-success">
                        <td> {this.formatAMPM(openingTime)} </td>
                        <td> {this.formatAMPM(times[0])} </td>
                        <td> Available </td>
                    </tr>
                )
            }

            for (var i = 0; i < times.length; i += 2) {

                if (this.formatAMPM(times[i]) !== this.formatAMPM(times[i + 1])) {
                    tableRows.push(
                        <tr className="text-danger">
                            <td> {this.formatAMPM(times[i])} </td>
                            <td> {this.formatAMPM(times[i + 1])} </td>
                            <td>Not Available </td>
                        </tr>
                    )
                }

                if (times.length !== i + 2) {
                    if (this.formatAMPM(times[i + 1]) !== this.formatAMPM(times[i + 2])) {
                        tableRows.push(
                            <tr className="text-success">
                                <td> {this.formatAMPM(times[i + 1])} </td>
                                <td> {this.formatAMPM(times[i + 2])} </td>
                                <td>Available </td>
                            </tr>
                        )
                    }
                }
            }


            tableRows.push(
                <tr className="text-success">
                    <td> {this.formatAMPM(times[times.length - 1])} </td>
                    <td> {this.formatAMPM(closingTime)} </td>
                    <td> Available </td>
                </tr>
            )

        } else {
            tableRows.push(
                <tr className="text-success">
                    <td> {this.formatAMPM(openingTime)} </td>
                    <td> {this.formatAMPM(closingTime)} </td>
                    <td> Available </td>
                </tr>
            )
        }

        this.setState({
            tableRows: tableRows,
            Loading: false
        })


    }


    render() {
        return (
            <div>
                <Dialog
                    open={!this.state.Loading}
                    onClose={this.props.close}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    style={{ width: window.innerWidth }}
                >
                    <DialogTitle id="alert-dialog-title">{"This Date Schedule"}</DialogTitle>
                    <DialogContent>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Start Time</th>
                                    <th scope="col">End Time</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.tableRows}
                            </tbody>
                        </table>
                        <DialogContentText id="alert-dialog-description" className="mt-5">

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions></DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default ScheduleModal
