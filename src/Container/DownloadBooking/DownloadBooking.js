import React, { Component } from 'react'
import Heading from '../../Components/Heading/Heading'
import Logo from '../../Assets/Logo.png'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'

export class DownloadBooking extends Component {

    state = {
        tableList: [],
        business_name: '',
        startTime: '',
        endTime: ''
    }

    componentDidMount() {
        const booking_id = this.props.location.search.substring(1)
        console.log(booking_id)

        const data = {
            "booking_id": booking_id
        }

        const url = 'https://master.qditch.com/api/booking/booking_details/'

        const tableList = this.state.tableList
        Axios.post(url, data)
            .then(res => {
                const startTime = this.timeDecode(this.pythonToJsTime(res.data[0].start_time))
                const endTime = this.timeDecode(this.pythonToJsTime(res.data[0].end_time))
                this.setState({
                    business_name: res.data[0].business,
                    startTime: startTime,
                    endTime: endTime
                })
                for (var key in res.data) {
                    tableList.push(
                        <tr>
                            <td> {res.data[key].business_service ? res.data[key].business_service.service : res.data[key].custom_business_service.service} </td>
                            <td> {res.data[key].business_service ? res.data[key].business_service.price : res.data[key].custom_business_service.price} ₹ </td>
                            <td> {res.data[key].business_service 
                            ? res.data[key].business_service.durations 
                            : res.data[key].custom_business_service.durations } Minutes
                            </td>
                        </tr>
                    )
                }
                this.setState({
                    tableList: tableList,
                }, () => {
                    // window.close()
                    window.print()
                    this.props.history.goBack()
                })
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

    timeDecode = (string) => {
        const temp = string.toString().split(' ')
        // console.log(this.formatAMPM(new Date(2020, 12, 12, temp[4].split(':')[0], temp[4].split(':')[1])))
        const time = temp[2] + ' ' + temp[1] + ' ' + temp[3] + ' ' + this.formatAMPM(new Date(2020, 12, 12, temp[4].split(':')[0], temp[4].split(':')[1]))
        return time
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


    pythonToJsTime = (string) => {
        const str = string.split('T')
        const Time = new Date(2020, 6, 2, str[1].slice(0, -1).split(':')[0], str[1].slice(0, -1).split(':')[1])
        return Time
    }


    render() {
        return (
            <div className="container">
                <img src={Logo} width="auto" height="40" alt="Qditch" />
                <Heading text="Booking Data" />

                <h4>{this.state.business_name}</h4>
                <h4>({this.state.startTime + ' - ' + this.state.endTime})</h4>
                <table className="table mt-4">
                    <tr>
                        <th>Service</th>
                        <th>Price</th>
                        <th>Duration</th>
                    </tr>
                    <tbody>
                        {this.state.tableList}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default withRouter(DownloadBooking)
