import React, { Component } from 'react'
import { Button,Dialog, DialogContent,DialogActions, DialogTitle } from '@material-ui/core'
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy'
import Colors from '../../Constants/Colors'
import Aboutus from '../AboutUs/Aboutus'
import Contact from '../../ContactUs/Contact'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import { withRouter } from 'react-router-dom'
import './Footer.css'

export class Footer extends Component {

    state={
        policyModal: true,
        modalContent: null,
        aboutUsModal:true
    }


    contactModalHandler = () => {
        console.log("object")
        const modalContent = (
            <Dialog onClose={() => this.setState({ aboutUsModal: false, modalContent: null })} aria-labelledby="simple-dialog-title" fullWidth maxWidth='lg' open={true}>
                <DialogTitle>Contact Us</DialogTitle>
                <DialogContent>
                    <Contact/>
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
                <div class="container-fluid mt-3 text-center" style={styles.footer}>
                    <div className="row mx-auto footer-row">
                        <h6 className="mt-3 col " onClick={this.policyModalHandler} style={{cursor:'pointer'}}>Privacy Policy</h6>
                        <h6 className="mt-3 col " onClick={this.contactModalHandler} style={{cursor:'pointer'}}>Contact Us</h6>
                    </div>
                    <div className="row mx-auto footer-row">
                        <h6 className="mt-3 col " onClick={this.aboutUsHandler} style={{cursor:'pointer'}}>About Us</h6>
                        <div className="col"></div>
                    </div>
                    <div className="row mx-auto mt-2 footer-row" >
                        <div className="col-8 mx-auto "></div>
                        <div className={"mx-auto  "+ window.innerWidth<768?"col-2":"col"}><a href='https://www.facebook.com/qditch'><FacebookIcon style={styles.icons}/></a> </div>
                        <div className={"mx-auto "+ window.innerWidth<768?"col-2":"col"}><a href='https://instagram.com/q.ditch'><InstagramIcon style={styles.icons}/></a> </div>
                    </div>
                    <div className="row mx-auto mt-2" >
                        <p className="text-small mx-auto">&copy; 2020 Qditch.com</p>
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
        height: '210px',
        padding:10
    },
    icons:{
        height: 50,
        width: 50,
        color:'white'
    }
}

export default withRouter(Footer)
