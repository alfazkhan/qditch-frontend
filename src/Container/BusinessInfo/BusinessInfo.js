import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from '../../Axios'
import { CircularProgress, Button, Paper } from '@material-ui/core'
import BusinessSlideshow from '../../Components/BusinessInfo/BusinessSlideshow/BusinessSlideshow'
import SalonTimingsCard from '../../Components/BusinessInfo/SalonTimingsCard/SalonTimingsCard'
import Heading from '../../Components/Heading/Heading'
import ServiceBook from '../../Components/BusinessInfo/ServiceBook/ServiceBook'
import SalonInfoCard from '../../Components/BusinessInfo/SalonInfocard/SalonInfoCard'


class BusinessInfo extends Component {

    state = {
        business_data: null,
        Loading: true
    }

    componentDidMount() {
        const id = this.props.match.params.id
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

    }



    render() {
        return (
            <div>
                {this.state.Loading
                    ? <div className="row">
                        <CircularProgress className="mx-auto" style={styles.Loader} />
                    </div>
                    :
                    <div className="container my-5">
                        <div className="row mx-auto">
                            <Button onClick={() => this.props.history.goBack()} color="default" variant="contained" className="mr-auto" >{"<< Back"}</Button>
                        </div>
                        <div className="row my-5">
                            <div className="col-6">
                                <BusinessSlideshow images={this.state.business_data['business_images']} />
                            </div>
                            <div className="col-6">
                                <SalonInfoCard data={this.state.business_data} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-8">
                                <ServiceBook data={this.state.business_data} />
                            </div>
                            <div className="col-4">
                                <SalonTimingsCard timings={this.state.business_data['business_timings'][0]} />
                            </div>
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
    }
}


export default withRouter(BusinessInfo)
