import React, { Component } from 'react'
import { CircularProgress, Button, DialogTitle, Dialog, DialogActions} from '@material-ui/core'
import Axios from '../../../Axios'
import TimingModal from './TimingModal/TimingModal'


class Timings extends Component {

    state = {
        Loading: true,
        Timings: [],
        timingsList: [],
        initialDataLoaded : false,
        editedTimeValues:{
            
        }
    }

    componentDidMount() {
        console.log(this.props.data['business_timings'])
        const id = this.props.data['business_timings'][0]
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

    changeValuesHandler=(data)=>{
        const Days = data[2]
        const start = data[0]
        const end = data[1]
        const values = this.state.editedTimeValues
        for(var key in Days){
            console.log(start[key])
            values[key.toLowerCase()] = Days[key] ? (start[key] + '/' + end[key]).toString() : 'false'
        }
        values["business"] = this.props.data['id']
        // var data = JSON.stringify({
        //     "monday": Days[Monday] ? (start[Monday] + '/' + end[Monday]).toString() : 'false',
        //     "tuesday": Days[Tuesday] ? (start[Tuesday] + '/' + end[1]).toString() : 'false',
        //     "wednesday": Days[2] ? (start[2] + '/' + end[2]).toString() : 'false',
        //     "thursday": Days[3] ? (start[3] + '/' + end[3]).toString() : 'false',
        //     "friday": Days[4] ? (start[4] + '/' + end[4]).toString() : 'false',
        //     "saturday": Days[5] ? (start[5] + '/' + end[5]).toString() : 'false',
        //     "sunday": Days[6] ? (start[6] + '/' + end[6]).toString() : 'false',
        //     "business": this.state.business_id
        // });
        // console.log(values)

        this.setState({editedTimeValues:values})
    }

    toggleModal=()=>{
        const Modal = !this.state.Modal
        const modal = <Dialog
            open={true}
            onClose={() => this.setState({ Modal: false, initialDataLoaded:false  })}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            maxWidth="md"
        >
            <DialogTitle id="alert-dialog-title">{"Edit Timings"}</DialogTitle>
            <TimingModal data={!this.state.initialDataLoaded?this.state.Timings:null} change={this.changeValuesHandler} />
            <DialogActions>
                <Button onClick={() => this.setState({ Modal: false, initialDataLoaded:false })} color="secondary">
                    Cancel
          </Button>
                <Button onClick={() => this.timeEditSubmit()} color="primary" autoFocus>
                    Done
                </Button>
            </DialogActions>
        </Dialog>
        
        this.setState({
            modalContent: modal,
            initialDataLoaded: true
        }, () => {
            console.log(this.state.initialDataLoaded)
            this.setState({ Modal: Modal })
        })
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
                    <tr>
                        <td>{key}</td>
                        <td>{SE[0] === "false" ? "Closed" : start}</td>
                        <td>{SE[0] === "false" ? "Closed" : end}</td>
                    </tr>
                )
            }
            else {
                list.push(
                    <tr>
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


    timeEditSubmit = () =>{
        const data = this.state.editedTimeValues
        console.log(data)
        const url = 'https://master.qditch.com/api/availability/timing/' + this.props.data['business_timings'][0] + '/'

        this.setState({Loading:true})
        Axios.put(url,data)
        .then(res=>{
            console.log(res.data)
            this.props.reload()
            this.setState({Loading:false})
        })
        .catch(e=>{
            console.log(e.response)
            this.setState({Loading:false})
        })
    }

    render() {
        return (
            <div className="container">
                {this.state.Loading ? <CircularProgress /> :
                <div>
                    {this.state.Modal? this.state.modalContent:null}
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Day</th>
                                <th scope="col">Opening</th>
                                <th scope="col">Closing</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.timingsList}
                        </tbody>
                    </table>
                    <Button variant="contained" size="small" color="primary" className="mt-4 mb-3" onClick={() => this.toggleModal()}>
                 Edit Timings
                </Button>
                </div>
                
                }
            </div>
        )
    }
}

export default Timings
