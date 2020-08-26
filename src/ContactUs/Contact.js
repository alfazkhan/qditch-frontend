import React, { Component } from 'react'
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';

export class Contact extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <MailIcon/> &nbsp;  <a href="mailto:support@qditch.com">support@qditch.com</a>
                </div>
            </div>
        )
    }
}

export default Contact
