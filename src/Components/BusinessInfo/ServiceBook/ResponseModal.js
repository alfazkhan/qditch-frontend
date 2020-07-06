import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const ResponseModal = (props) => {
    return (
        <div>
            <Dialog
                open={true}
                onClose={props.close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{ width: window.innerWidth }}
            >
                <DialogTitle id="alert-dialog-title">{"Booking Status"}</DialogTitle>
                <DialogContent>
                    <div className="row">
                        {props.status ? <CheckCircleIcon className="mx-auto" style={styles.successIcon} /> : <HighlightOffIcon className="mx-auto" style={styles.failedIcon} />}
                    </div>
                    <DialogContentText id="alert-dialog-description" className="mt-5">
                        {props.messages.map(msg => {
                            return <li>{msg}</li>
                        })}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={props.close} color="primary">
                        Disagree
          </Button> */}
                    <Button onClick={props.close} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const styles = {
    failedIcon: {
        height: 100,
        width: 100,
        color: 'red'
    },
    successIcon: {
        height : 100,
        width : 100,
        color : 'green'
    }
}

export default ResponseModal
