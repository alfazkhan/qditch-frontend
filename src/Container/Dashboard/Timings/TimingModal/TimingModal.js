import React, { Component } from 'react'
import { FormControlLabel, Checkbox } from '@material-ui/core'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns'


class TimingModal extends Component {

    state = {
        Days: {
            'Monday': true,
            'Tuesday': true,
            'Wednesday': true,
            'Thursday': true,
            'Friday': true,
            'Saturday': true,
            'Sunday': true
        },
        scheduleList: [],
        startTimings: {

        },
        endTimings: {

        },
        business_id: '',
        user_id: '',
        messages: [],
        errors: false
    }

    componentDidMount() {
        if (this.props.data !== null) {
            const data = this.props.data
            const days = this.state.Days
            const startTimings = this.state.startTimings
            const endTimings = this.state.endTimings
            // console.log(data)
            for (var key in data) {
                // console.log(data[key] === "false")
                if (data[key] === "false") {
                    days[key] = false
                    startTimings[key] = format(new Date(2010, 12, 11, 10, 0, 0, 0), 'HH:mm')
                    endTimings[key] = format(new Date(2010, 12, 11, 19, 0, 0, 0), 'HH:mm')
                } else {
                    const start = data[key].split('/')[0].split(':')
                    startTimings[key] = format(new Date(2020, 6, 30, start[0], start[1]), 'HH:mm')

                    const end = data[key].split('/')[1].split(':')
                    endTimings[key] = format(new Date(2020, 6, 30, end[0], end[1]), 'HH:mm')
                }
            }

            this.setState({
                Days: days,
                startTimings: startTimings,
                endTimings: endTimings
            }, () => {
                // this.initialTimeValues()
                console.log(this.state.startTimings)
                this.initialValueHandler()
            })
        }
    }

    initialValueHandler = () => {
        const days = this.state.Days
        const scheduleList = []
        let dayNum = 0
        for (var key in this.state.Days) {
            scheduleList.push(
                <tr key={key}>
                    <td className="text-left p-0 m-0" >
                        <FormControlLabel
                            value={key}
                            control={<Checkbox checked={days[key]} color="primary" />}
                            label={key}
                            labelPlacement="end"
                            onChange={this.activeDaysHandler}
                            className="col-2"
                            style={{ width: '10%' }}
                        />
                    </td>
                    <td>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <input type="time"
                                id={key}
                                disabled={!days[key]}
                                name="appt"
                                value={this.state.startTimings[key]}
                                className="form-control"
                                onChange={(e) => { this.valueChangeHandler(e, 'startTimings') }} />
                        </MuiPickersUtilsProvider>
                    </td>
                    <td>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <input type="time"
                                id={key}
                                disabled={!days[key]}
                                name="appt"
                                value={this.state.endTimings[key]}
                                className="form-control"
                                onChange={(e) => { this.valueChangeHandler(e, 'endTimings') }} />
                        </MuiPickersUtilsProvider>
                    </td>

                </tr>
            )
            dayNum += 1
        }
        this.setState({ scheduleList: scheduleList })
    }

    initialTimeValues = () => {
        const Days = Object.keys(this.state.Days)
        const startTimings = this.state.startTimings
        const endTimings = this.state.endTimings
        var startTime = format(new Date(2010, 12, 11, 10, 0, 0, 0), 'HH:mm')
        var endTime = format(new Date(2010, 12, 11, 19, 0, 0, 0), 'HH:mm')
        for (var i in Days) {
            startTimings[Days[i]] = startTime
            endTimings[Days[i]] = endTime
        }
        this.setState({ startTimings: startTimings, endTimings: endTimings })
    }

    valueChangeHandler = (event, mode) => {
        const day = event.target.id
        const timings = this.state[mode]
        timings[day] = event.target.value
        mode === 'startTimings' ?
        this.setState({ startTimings: timings }, ()=>{ this.initialValueHandler(); this.props.change([this.state.startTimings,this.state.endTimings,this.state.Days]) }) :
        this.setState({ endTimings: timings }, ()=>{ this.initialValueHandler(); this.props.change([this.state.startTimings,this.state.endTimings,this.state.Days]) } )
    }


    activeDaysHandler = (event) => {
        const newDays = this.state.Days
        const currentDay = event.target.value
        newDays[currentDay] = !newDays[currentDay]
        this.setState({ Days: newDays }, () => {
            this.initialValueHandler(); this.props.change([this.state.startTimings,this.state.endTimings,this.state.Days])
        })
    }
    render() {
        return (
            <div>
                <table className="table table-borderless table-sm">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Opening Time</th>
                            <th scope="col">Closing Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.scheduleList}
                    </tbody>
                </table>

            </div>
        )
    }
}

export default TimingModal
