import React, { Component } from 'react'
import Axios from '../../../Axios'
import Heading from '../../../Components/Heading/Heading'
import { CircularProgress } from '@material-ui/core'

export class Appointments extends Component {

    state = {
        appointments: {

        },
        users: {},
        business_services: {},
        custom_business_services: {},
        date: new Date().toString().split(' '),


        appointmentList: [],

        Loading: true
    }


    componentDidMount() {
        const id = this.props.data['id']
        let date = this.state.date
        date = date[2] + '/' + this.getMonthFromString(date[1]) + '/' + date[3]
        const promise = []
        const data = {
            "business": id,
            "start_time": date
        }
        const appointments = this.state.appointments
        const users = this.state.users
        promise.push(
            Axios.get('api/users/user_data')
                .then(res => {
                    for (var key in res.data) {
                        users[res.data[key].users] = { ...users[res.data[key]], name: res.data[key].first_name + ' ' + res.data[key].last_name }
                    }
                })
        )

        const business_services = this.state.business_services

        for (var key in this.props.data['business_services']) {
            var service = this.props.data['business_services'][key]
            business_services[service.id] = { ...business_services[service.id], name: service.service_name, price: service.business_service_price, duration: service.business_service_duration }

        }

        const custom_business_services = this.state.custom_business_services
        for (var key in this.props.data['custom_business_services']) {
            var service = this.props.data['custom_business_services'][key]
            console.log(service)
            custom_business_services[service.id] = { ...custom_business_services[service.id], name: service.service_name, price: service.business_service_price, duration: service.business_service_duration }

        }


        promise.push(Axios.post('api/booking/business_bookings/', data)
            .then(res => {
                for (var key in res.data) {
                    // console.log(res.data[key])
                    appointments[res.data[key].id] = { ...appointments[res.data[key].id], service: res.data[key]['business_service'] }
                    appointments[res.data[key].id] = { ...appointments[res.data[key].id], custom_service: res.data[key]['custom_business_service'] }
                    appointments[res.data[key].id] = { ...appointments[res.data[key].id], user: res.data[key]['user'] }
                    appointments[res.data[key].id] = { ...appointments[res.data[key].id], start_time: res.data[key]['start_time'] }
                    appointments[res.data[key].id] = { ...appointments[res.data[key].id], end_time: res.data[key]['end_time'] }
                    appointments[res.data[key].id] = { ...appointments[res.data[key].id], status: res.data[key]['status'] }
                }
                Promise.allSettled(promise)
                    .then(res => {
                        // console.log(custom_business_services)
                        this.setAppointmentTable()
                    })
            }))
    }

    getMonthFromString = (mon) => {
        return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1
    }


    setAppointmentTable = () => {
        const appointments = this.state.appointments
        const users = this.state.users
        const business_services = this.state.business_services
        const custom_business_services = this.state.custom_business_services


        const appointmentList = this.state.appointmentList

        for (var key in appointments) {
            console.log(business_services[appointments[key].service])
            appointmentList.push(
                <tr>
                    <th scope="row">{appointments[key].service !== null ? business_services[appointments[key].service].name : custom_business_services[appointments[key].custom_service].name}</th>
                    <td> {users[appointments[key].user].name} </td>
                    <td>{appointments[key].start_time}</td>
                    <td>{appointments[key].end_time}</td>
                    <td>{appointments[key].service !== null ? business_services[appointments[key].service].price : custom_business_services[appointments[key].custom_service].price}</td>
                    <td className={appointments[key].status === "confirm"?"text-success":"text-danger"} >{appointments[key].status}</td>
                </tr>
            )
        }

        this.setState({
            appointmentList: appointmentList,
            Loading: false
        })

    }



    render() {
        return (
            <div className="container">
                <Heading text="Appointments" />
                {this.state.Loading ? <CircularProgress />
                    : <table class="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">Service</th>
                                <th scope="col">User</th>
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

                }
            </div>
        )
    }
}

export default Appointments
