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

class ResponseModal extends Component {

    state = {
        successMessageList: [],
        service: {},
        custom_service: {},
        Loading: true
    }

    componentDidMount() {

        if (this.props.status) {

            console.log(this.props.Message)
            const List = this.state.successMessageList
            const service = this.props.service
            const custom_service = this.props.custom_service


            for (var key in this.props.business_service) {
                service[this.props.business_service.id] = { ...service[this.props.business_service.id], name: this.props.business_service.service_name }
            }

            // for (var key in this.props.custom_business_services) {
            //     custom_service[this.props.custom_business_services.id] = { ...service[this.props.custom_business_services.id], name: this.props.custom_business_services.service_name }
            // }

            for (var key in this.props.Message) {
                List.push(
                    <li> {this.props.Message[key].business_service ? service[this.props.Message[key].business_service] : null}  </li>
                )
            }
{/* custom_service[this.props.Message[key].custom_business_service]} */}
            this.setState({
                successMessageList: List,
                Loading: false
            })
        }
    }
    render() {
        return (
            <div>
                {this.state.Loading
                    ? null
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

                                {this.props.status
                                    ? <div>
                                        <h1>{this.props.business_name}</h1>
                                        {this.state.successMessageList}
                                    </div>

                                    : this.props.messages.map(msg => {
                                        return <li>{msg}</li>
                                    })
                                }




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
