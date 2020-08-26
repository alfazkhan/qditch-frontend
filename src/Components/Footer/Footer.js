import React, { Component } from 'react'
import { Button,Dialog, DialogContent,DialogActions, DialogTitle } from '@material-ui/core'
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy'
import Colors from '../../Constants/Colors'
import Aboutus from '../AboutUs/Aboutus'

export class Footer extends Component {

    state={
        policyModal: true,
        modalContent: null,
        aboutUsModal:true
    }


    aboutUsHandler = () => {
        console.log("object")
        const modalContent = (
            <Dialog onClose={() => this.setState({ aboutUsModal: false, modalContent: null })} aria-labelledby="simple-dialog-title" fullWidth maxWidth='lg' open={true}>
                <DialogTitle>About Us</DialogTitle>
                <DialogContent>
                    <Aboutus/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.setState({ aboutUsModal: false, modalContent: null })} color="secondary">
                        Close
              </Button>
                </DialogActions>
            </Dialog>

        )

        this.setState({
            aboutUsModal: true,
            modalContent: modalContent
        })
    }
    policyModalHandler = () => {
        console.log("object")
        const modalContent = (
            <Dialog onClose={() => this.setState({ policyModal: false, modalContent: null })} aria-labelledby="simple-dialog-title" fullWidth maxWidth='lg' open={true}>
                <DialogTitle>Privacy Policy</DialogTitle>
                <DialogContent>
                    <PrivacyPolicy/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.setState({ policyModal: false, modalContent: null })} color="secondary">
                        Close
              </Button>
                </DialogActions>
            </Dialog>

        )

        this.setState({
            policyModal: true,
            modalContent: modalContent
        })
    }

    render() {
        return (
            <div>
                <div class="container-fluid mt-5" style={styles.footer}>
                    <div className="row mx-auto">
                        <h6 className="mt-5 col" onClick={this.policyModalHandler} style={{cursor:'pointer'}}><strong >Privacy Policy</strong></h6>
                        <h6 className="mt-5 col" onClick={this.aboutUsHandler} style={{cursor:'pointer'}}><strong >About Us</strong></h6>
                    </div>
                    <div>

                        {this.state.policyModal?this.state.modalContent:null}
                    </div>
                </div>
            </div>
        )
    }
}

const styles={
    footer:{
        backgroundColor: Colors.primary,
        color:'#fff',
        height: '200px'
    }
}

export default Footer
