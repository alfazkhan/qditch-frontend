import React, { Component } from 'react'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
// import './BasicDetails.css'
import { Button } from '@material-ui/core'
import Colors from '../../../../Constants/Colors'




class SetTimings extends Component {

    state = {
        Days: {
            'Monday': true,
            'Tuesday': true,
            'Wednesday': true,
            'Thrusday': true,
            'Friday': true,
            'Saturday': false,
            'Sunday': false
        },
        scheduleList: [],
    }

    componentDidMount() {
        const days = this.state.Days
        const scheduleList = []
        for (var key in this.state.Days) {
            scheduleList.push(
                <tr key={key}>
                    <td className="text-left p-0 m-0" >
                        <FormControlLabel
                            value={key}
                            control={<Checkbox checked={days[key]} color="primary" />}
                            label={key}
                            labelPlacement="end"
                            // onChange={this.setState({Days:!this.state.Days[key]})}
                            className="col-2"
                            style={{ width: '10%' }}
                        />
                    </td>
                    <td>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                // value={selectedDate}
                                // onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                disabled={!days[key]}
                                className="ml-0"
                            />
                        </MuiPickersUtilsProvider>
                    </td>
                    <td>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                // value={selectedDate}
                                // onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                disabled={!days[key]}
                            />
                        </MuiPickersUtilsProvider>
                    </td>

                </tr>
            )
        }
        this.setState({ scheduleList: scheduleList })
    }

    valueChangeHandler = () => {

    }

    submitHandler = () => {
        this.props.toggleLoading(true)

        const mode = this.props.mode
        const progress = mode === 'User' ? 50 : 100 * 3 / 8
        this.props.changeProgress(progress)
        this.props.toggleLoading(false)
        this.props.nextScreen('CategorySelect')
    }


    render() {
        return (
            <div className="container" style={styles.screen}>
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

export default SetTimings



