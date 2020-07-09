import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { render } from '@testing-library/react';
import { CircularProgress } from '@material-ui/core';

class ResponseModal extends Component {

    state = {
        MessageList: [],
        service: {},
        custom_service: {},
        Loading: true,
        List: []
    }

    componentDidMount() {

        if (this.props.status) {

            console.log(this.props.Message)
            const List = this.state.MessageList
            const service = this.state.service
            const custom_service = this.state.custom_service

            const business_services = this.props.business_services
            for (var key in business_services) {
                console.log(business_services[key].id.toString())
                service[business_services[key].id] = { name: business_services[key].service_name }
            }

            console.log(service)
            const custom_business_services = this.props.custom_business_services
            for (var key in custom_business_services) {
                custom_service[custom_business_services[key].id] = { name: custom_business_services[key].service_name }
            }

            console.log(custom_service)

            List.push(<h1 className="text-center">{this.props.business_name}</h1>)
            List.push(<h3 className="my-2 text-center">{this.props.Message[0].booking_id}</h3>)

            const start = this.props.Message[0].start_time.split('T')
            const startTime =  new Date(2020,6,2,start[1].slice(0, -1).split(':')[0],start[1].slice(0, -1).split(':')[1])
            const end = this.props.Message[0].end_time.split('T')
            const endTime =  new Date(2020,6,2,end[1].slice(0, -1).split(':')[0],end[1].slice(0, -1).split(':')[1])

            List.push(<h4 className="text-center"> {this.props.Message[0].start_time.split('T')[0]} </h4>)
            List.push(<strong className="my-2 text-center"> {this.formatAMPM(startTime) +" - "+ this.formatAMPM(endTime)} </strong>)




            for (var key in this.props.Message) {
                List.push(
                    <div>
                        <li>{this.props.Message[key].business_service 
                        ? service[this.props.Message[key].business_service].name  
                        : custom_service[this.props.Message[key].custom_business_service].name}  </li>
                    </div>
                )
            }
            this.setState({
                MessageList: List,
                Loading: false
            })
        }

        else {
            let List = this.state.MessageList
            List.push(<h1>{this.props.business_name}</h1>)

            for (var key in this.props.messages) {
                List.push(
                    <li>{this.props.messages[key]}</li>
                )
            }

            this.setState({
                MessageList: List,
                Loading: false
            })
        }
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


    render() {
        return (
            <div>
                {this.state.Loading
                    ? <CircularProgress />
                    : <Dialog
                        open={true}
                        onClose={this.props.close}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        style={{ width: window.innerWidth }}
                    >
                        <DialogTitle id="alert-dialog-title">{"Booking Status"}</DialogTitle>
                        <DialogContent>
                            <div className="row">
                                {this.props.status ? <CheckCircleIcon className="mx-auto" style={styles.successIcon} /> : <HighlightOffIcon className="mx-auto" style={styles.failedIcon} />}
                            </div>

                            <DialogContentText id="alert-dialog-description" className="mt-5">

                                {this.state.MessageList}




                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            {/* <Button onClick={this.props.close} color="primary">
                    Disagree
      </Button> */}
                            <Button onClick={this.props.close} color="primary" autoFocus>
                                Close
                </Button>
                        </DialogActions>
                    </Dialog>
                }

            </div>
        )
    }

}

const styles = {
    failedIcon: {
        height: 100,
        width: 100,
        color: 'red'
    },
    successIcon: {
        height: 100,
        width: 100,
        color: 'green'
    }
}

export default ResponseModal
