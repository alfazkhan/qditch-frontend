import React from 'react'
import Dialog from '@material-ui/core/Dialog';

import DialogTitle from '@material-ui/core/DialogTitle';

export const Modal = (props) => {
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.close}
            >
                <DialogTitle id="alert-dialog-title">{props.mode}</DialogTitle>
                {props.children}
            </Dialog>
        </div>
    )
}
