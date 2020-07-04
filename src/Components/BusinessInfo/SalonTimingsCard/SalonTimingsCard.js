import React, { Component } from 'react'
import { Paper, CircularProgress } from '@material-ui/core'
import Axios from '../../../Axios'

class SalonTimingsCard extends Component {

    state = {
        Timings: [],
        timingsList: [],
        Loading: true
    }

    componentDidMount() {
        const id = this.props.timings

        Axios.get('api/availability/timing/' + id + '/')
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
                    this.setTable()
                    // console.log(this.state.Timings)
                })
                // console.log(res.data)
            })
            .catch(e => {
                console.log(e.response)
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



    setTable = () => {
        // console.log(this.state.Timings)
        const timings = this.state.Timings
        const list = this.state.timingsList
        let num = 1
        for (var key in timings) {
            const SE = timings[key].split('/')
            let start = new Date(2020, 6, 29, SE[0].split(':')[0], SE[0].split(':')[1])
            start = this.formatAMPM(start)
            if (SE[0] !== "false") {
                let end = new Date(2020, 6, 29, SE[1].split(':')[0], SE[0].split(':')[1])
                end = this.formatAMPM(end)
                list.push(
                    <tr style={{color:''}}>
                        <td>{key}</td>
                        <td>{SE[0] === "false" ? "Closed" : start}</td>
                        <td>{SE[0] === "false" ? "Closed" : end}</td>
                    </tr>
                )
            }
            else {
                list.push(
                    <tr style={{color:''}}>
                        <td>{key}</td>
                        <td>{SE[0] === "false" ? "Closed" : start}</td>
                        <td>{SE[0] === "false" ? "Closed" : null}</td>
                    </tr>
                )
            }
            num += 1
        }
        this.setState({ timingsList: list, Loading: false })
    }

    render() {
        return (
            <div>
                {this.state.Loading ? <CircularProgress /> :
                    <Paper elevation={3} style={{backgroundColor:''}}>
                        <table class="table table-borderless">
                        {this.state.timingsList}
                        </table>
                    </Paper>
                
                }
            </div>
        )
    }
}

export default SalonTimingsCard
