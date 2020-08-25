import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'
import Axios from '../../Axios'
import { CircularProgress, Button, Paper, Dialog, DialogContent, DialogTitle, DialogActions } from '@material-ui/core'
import BusinessSlideshow from '../../Components/BusinessInfo/BusinessSlideshow/BusinessSlideshow'
import SalonTimingsCard from '../../Components/BusinessInfo/SalonTimingsCard/SalonTimingsCard'
import Heading from '../../Components/Heading/Heading'
import ServiceBook from '../../Components/BusinessInfo/ServiceBook/ServiceBook'
import SalonInfoCard from '../../Components/BusinessInfo/SalonInfocard/SalonInfoCard'
import FeedbackList from '../../Components/Feedback/FeedbackList/FeedbackList'
import FeedbackCreate from '../../Components/Feedback/FeedbackCreate/FeedbackCreate'
import Colors from '../../Constants/Colors'


class BusinessInfo extends Component {

    state = {
        business_data: null,
        Loading: true,
        timeModal: false,
        safetyfeaturemodal: false,
        safetyFeaturesList: null,
        modalContent: null,

        createReviewModal: false,

        reviewsListModel: false
    }

    componentDidMount() {
        const id = this.props.match.params.id
        console.log(window.innerWidth)
        console.log(id)
        Axios.get('api/users/business/' + id + '/')
            .then(res => {
                // console.log(res.data)
                this.setState({ business_data: res.data, Loading: false }, () => {
                })

            })
            .catch(e => {
                console.log(e.response)
            })
        window.scrollTo(0, 0)

    }

    timeModalhandler = () => {
        const modalContent = (
            <Dialog onClose={() => this.setState({ timeModal: false, modalContent: null })} aria-labelledby="simple-dialog-title" open={true}>
                <DialogContent>
                    <SalonTimingsCard timings={this.state.business_data['business_timings'][0]} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.setState({ timeModal: false, modalContent: null })} color="secondary">
                        Cancel
              </Button>
                </DialogActions>
            </Dialog>

        )

        this.setState({
            timeModal: true,
            modalContent: modalContent
        })
    }

    safetyModalhandler = () => {
        const modalContent = (
            <Dialog onClose={() => this.setState({ safetyfeaturemodal: false, modalContent: null })} aria-labelledby="simple-dialog-title" open={true}>
                <DialogContent>
                    {this.state.safetyFeaturesList}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.setState({ safetyfeaturemodal: false, modalContent: null })} color="secondary">
                        Cancel
              </Button>
                </DialogActions>
            </Dialog>

        )

        this.setState({
            safetyfeaturemodal: true,
            modalContent: modalContent
        })
    }

    setSafetyFeatures=(data)=>{
        const safety = data

        this.setState({
            safetyFeaturesList: safety
        })

    }

    render() {
        return (
            <div style={{marginTop:'4em'}}>
                {this.state.Loading
                    ? <div className="row">
                        <CircularProgress className="mx-auto" style={styles.Loader} />
                    </div>
                    :
                    <div className="mx-auto">
                        <div className="row mt-1">
                            {/* <Button  style={{ backgroundColor: Colors.danger, color: '#fff' }} variant="contained" className="mr-auto" >{"<< Back"}</Button> */}
                            <strong style={{cursor:'pointer'}} onClick={() => this.props.history.goBack()} className="mx-auto text-danger">{"<< Back"}</strong>
                        </div>
                        <div className="row mb-2">
                            <div className={window.innerWidth > 768 ? "col-6 ml-5" : "col-12"}>
                                <BusinessSlideshow images={this.state.business_data['business_images']} />
                            </div>
                            <div className={window.innerWidth > 768 ? "col-5 mx-auto" : "col-12"}>
                                <SalonInfoCard safetyFeatures={this.setSafetyFeatures} data={this.state.business_data} />
                            </div>
                        </div>

                        

                        <div className="row mb-3 mx-auto">
                            <div className="col-3">

                                <strong style={styles.linktext} onClick={() => this.setState({ reviewsListModel: true })}>All Reviews</strong>
                                {this.state.reviewsListModel
                                    ? <FeedbackList onClose={() => this.setState({ reviewsListModel: false })}
                                        feedbacks={this.state.business_data['feedbacks']}
                                    />
                                    : null}
                            </div>

                            {this.props.userLoggedIn
                                ? <div className="col-3">
                                    <strong style={styles.linktext} onClick={() => this.setState({ createReviewModal: true })}>Write a Review</strong>
                                    {this.state.createReviewModal
                                        ?
                                        <FeedbackCreate onClose={() => this.setState({ createReviewModal: false })}
                                            business_id={this.state.business_data['id']}
                                        />
                                        : null}
                                </div>
                                : null}

                            {window.innerWidth < 768
                                ? <div className="col-3">
                                    <strong style={styles.linktext} onClick={this.timeModalhandler}>
                                        View Salon Timings
                                    </strong>
                                    {this.state.timeModal
                                        ? this.state.modalContent
                                        : null
                                    }
                                </div>
                                : null}
                                {true
                                ? <div className="col-3">
                                    <strong className="text-success" style={styles.linktext} onClick={this.safetyModalhandler}>
                                    &#10004; Safety Features
                                    </strong>
                                    {this.state.safetyfeaturemodal
                                        ? this.state.modalContent
                                        : null
                                    }
                                </div>
                                : null}
                        </div>





                        <div className="row mx-auto">
                            <div className={window.innerWidth > 768 ? "col-8" : "col-12"}>
                                <ServiceBook data={this.state.business_data} />
                            </div>
                            {window.innerWidth > 1000
                                ? <div className="col-4">
                                    <SalonTimingsCard timings={this.state.business_data['business_timings'][0]} />
                                </div>
                                : null}

                        </div>
                    </div>
                }
            </div>
        )
    }
}

const styles = {
    container: {
        marginTop: window.innerHeight / 6,
        width: window.innerWidth < 768 ? '100%' : '50%',
    },
    Loader: {
        marginTop: '40px'
    },
    linktext:{
        fontSize:'14px',
        color: '#00A3AD',
        cursor: 'pointer'
    }
}



const mapStateToProps = (state) => ({

    userLoggedIn: state.userLoggedIn

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BusinessInfo))



