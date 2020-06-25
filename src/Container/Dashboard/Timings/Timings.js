import React, { Component } from 'react'
import { CircularProgress } from '@material-ui/core'
import Axios from '../../../Axios'


class Timings extends Component {

    state = {
        Loading: true,
        Timings: [],
        timingsList: []
    }

    componentDidMount() {
        console.log(this.props.data['business_timings'])
        const id = this.props.data['business_timings'][0]
        Axios.get('availability/timing/' + id + '/')
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
                // console.log(res.data)
            })
            .catch(e => {
                console.log(e.response)
            })
    }

    setTable = () => {
        // console.log(this.state.Timings)
        const timings = this.state.Timings
        const list = this.state.timingsList
        let num = 1
        for(var key in timings){
            const SE=timings[key].split('/')

            list.push(
                <tr>
                    <th scope="row">{num}</th>
                    <td>{key}</td>
                    <td>{SE[0]}</td>
                    <td>{SE[1]}</td>
                </tr>
            )
            num+=1
        }
        this.setState({timingsList:list,Loading:false})
    }

    render() {
        return (
            <div className="container">
                {this.state.Loading ? <CircularProgress /> :
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Day</th>
                                <th scope="col">Opening</th>
                                <th scope="col">Closing</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.timingsList}
                        </tbody>
                    </table>
                }
            </div>
        )
    }
}

export default Timings
