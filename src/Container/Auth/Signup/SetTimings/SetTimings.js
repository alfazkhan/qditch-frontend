import React, { Component } from 'react'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
// import './BasicDetails.css'
import { connect } from 'react-redux'

import { Button } from '@material-ui/core'
import Colors from '../../../../Constants/Colors'
import { format } from 'date-fns'
import Axios from '../../../../Axios'
import Heading from '../../../../Components/Heading/Heading';
import * as Validator from '../../../../Validator'



class SetTimings extends Component {

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
        this.setState({ business_id: this.props.business_id, user_id: this.state.user_id }, () => { console.log(this.props.business_id) })
        this.initialTimeValues()
        this.initialValueHandler()
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

    // https://developers.google.com/web/tools/chrome-devtools/security
    // https://meet.google.com/linkredirect?authuser=0&dest=https%3A%2F%2Fdocs.aws.amazon.com%2Fcloudhsm%2Flatest%2Fuserguide%2Fssl-offload-enable-traffic-and-verify-certificate.html

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
        // let suff = 'AM'
        const day = event.target.id
        // let timeString = event.target.value.split(':')
        // if(timeString[0] === '00'){
        //     timeString[0]=12
        // }
        // else if(timeString[0] == 12){
        //     suff = 'PM'
        // }
        // else if (timeString[0] > 12) {
        //     timeString[0]=(timeString[0]%12).toString()
        //     timeString[0]= timeString[0].length >= 2?timeString[0]:'0'+timeString[0]
        //     suff = 'PM'
        // }
        // timeString = timeString.toString().replace(',',':')
        const timings = this.state[mode]
        // timings[day]= timeString+suff
        timings[day] = event.target.value
        // console.table(timings)
        mode === 'startTimings' ? this.setState({ startTimings: timings }, this.initialValueHandler) : this.setState({ endTimings: timings }, this.initialValueHandler)
    }

    activeDaysHandler = (event) => {
        const newDays = this.state.Days
        const currentDay = event.target.value
        newDays[currentDay] = !newDays[currentDay]
        this.setState({ Days: newDays }, () => {
            this.initialValueHandler();
        })
    }

    changePageHandler = () => {
        this.props.toggleLoading(false)
        const progress = 100 * 3 / 8
        this.props.changeProgress(progress)
        this.props.nextScreen('CategorySelect')
    }

    countElement=(array,element)=>{
        let count = 0

        for(var key in array){
            if(array[key]===element){
                count+=1
            }
        }

        return count

    }

    validateData = () => {

        const messages = []
        const days = Object.values(this.state.Days)
        
        //Days
        this.countElement(days,true)===0 ? messages.push("Select Atleast One Working Day"): console.log() 
       

        if (messages.length !== 0) {
            this.setState({ messages: messages, errors: true })
            return false
        }
        this.setState({ errors: false })
        return true

    }



    submitHandler = () => {
        const url = 'api/availability/timing/'
        const start = Object.values(this.state.startTimings)
        const end = Object.values(this.state.endTimings)
        const Days = Object.values(this.state.Days)
        const DaysName = Object.keys(this.state.Days)

        var data = JSON.stringify({
            "monday": Days[0] ? (start[0] + '/' + end[0]).toString() : 'false',
            "tuesday": Days[1] ? (start[1] + '/' + end[1]).toString() : 'false',
            "wednesday": Days[2] ? (start[2] + '/' + end[2]).toString() : 'false',
            "thursday": Days[3] ? (start[3] + '/' + end[3]).toString() : 'false',
            "friday": Days[4] ? (start[4] + '/' + end[4]).toString() : 'false',
            "saturday": Days[5] ? (start[5] + '/' + end[5]).toString() : 'false',
            "sunday": Days[6] ? (start[6] + '/' + end[6]).toString() : 'false',
            "business": this.state.business_id
        });

        // console.log(Data)

        if (this.validateData()) {
            this.props.toggleLoading(true)

            Axios.post(url, data)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    // this.props.onResponseRecieve(response.data.id)
                    this.changePageHandler()

                })
                .catch((error) => {
                    this.props.toggleLoading(false)
                    console.log(error.response);
                });
        }

    }


    render() {
        return (
            <div className="container" style={styles.screen}>
                <Heading text="Timings" />
                {this.state.errors
                    ? <div class="alert alert-danger alert-dismissible fade show text-left" role="alert">
                        {this.state.messages.map(function (item, i) {

                            return <li key={i}>{item}</li>
                        })}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true" onClick={() => {
                                const error = !this.state.errors
                                this.setState({ errors: error })
                            }}>&times;</span>
                        </button>
                    </div>
                    : null
                }
                <div className="table-responsive-sm">
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


const mapStateToProps = (state) => ({
    user_id: state.user_id,
    business_id: state.business_id
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SetTimings)

