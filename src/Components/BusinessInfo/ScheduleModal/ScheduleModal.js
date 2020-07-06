import React, { Component } from 'react'
import SalonTimingsCard from '../SalonTimingsCard/SalonTimingsCard'
import Axios from '../../../Axios'

export class ScheduleModal extends Component {

    state={
        Timings : null
    }

    componentDidMount() {
        console.log(this.props)

        const id = this.props.timingID

        

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
                })
            })
            .catch(e => {
                console.log(e.response)
            })
    }

    setTable=()=>{

        const date = this.props.startDate
        // const day 
        console.log(date)

    }
    


    render() {
        return (
            <div>
            </div>
        )
    }
}

export default ScheduleModal
