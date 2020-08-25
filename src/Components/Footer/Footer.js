import React, { Component } from 'react'
import { Button,Dialog, DialogContent,DialogActions } from '@material-ui/core'
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy'
import Colors from '../../Constants/Colors'

export class Footer extends Component {

    state={
        policyModal: true,
        modalContent: null
    }


    policyModalHandler = () => {
        console.log("object")
        const modalContent = (
            <Dialog onClose={() => this.setState({ policyModal: false, modalContent: null })} aria-labelledby="simple-dialog-title" fullWidth maxWidth='xl' open={true}>
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
                        <h6 className="mt-5" onClick={this.policyModalHandler} style={{cursor:'pointer'}}><strong >Privacy Policy</strong></h6>
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
