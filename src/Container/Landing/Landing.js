import Slideshow from '../../Components/SlideShow/Slideshow'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from '../../Axios'
import Categories from '../../Components/Categories/Categories'
import Heading from '../../Components/Heading/Heading'
import BodyTemp from '../../Assets/SafetyFeatures/BodyTemp.jpg'
import DigitalPayments from '../../Assets/SafetyFeatures/DigitalPayments.jpg'
import OnlineBooking from '../../Assets/SafetyFeatures/OnlineBooking.jpg'
import PPEKits from '../../Assets/SafetyFeatures/PPEKits.jpg'
import SanitizeSalon from '../../Assets/SafetyFeatures/SanitizeSalon.png'
import SocialDistancing from '../../Assets/SafetyFeatures/SocialDistancing.jpg'
import FeatureCard from '../../Components/LandingPage/FeatureCard'

export class Landing extends Component {
    state = {
        username: '',
        show: false
    }

    componentDidMount() {
        if (this.props.loggedIn) {
            Axios.get('api/users/user/' + 20 + '/')
                .then(res => {
                    this.setState({ username: res.data.first_name, show: true })
                })
        }
    }


    render() {


        return (
            <div>
                {/* {this.state.show
                    ? <div class="alert alert-success alert-dismissible fade show" role="alert">
                        Welcome! <strong>{this.state.username}</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    : null
                } */}

                {window.innerWidth > 1000
                    ? <div class="" style={{ top: 0 }}>
                        <Categories />
                    </div>
                    : null}
                <Slideshow />

                <h3 className="my-5 text-center">Things to keep in mind while choosing a salon</h3>
                <FeatureCard image={BodyTemp} 
                text={"Temperature of all the customers and salon staff should be monitored regularly"}
                heading={"Body Temperature"}
                right={true}
                />

                <FeatureCard image={DigitalPayments} 
                text={"Salon should accept payments through mobile and card. Avoid cash payments wherever possible"}
                heading={"Digital Payments"}
                left={true}
                />
                
                <FeatureCard image={OnlineBooking} 
                text={"Visit only after booking an appointment online. Check for all these safety practices before choosing a salon"}
                heading={"Online Appointment Booking"}
                right={true}
                />
                
                <FeatureCard image={PPEKits} 
                text={"Stylists should use a mask and a face shield. Use of complete protective kit is recommended"}
                heading={"Use of PPE Kits"}
                left={true}
                />
                
                <FeatureCard image={SanitizeSalon} 
                text={"Deep cleaning of salon should be done daily and seats should be sanitized after every service"}
                heading={"Sanitization of Salon"}
                right={true}
                />
                
                <FeatureCard image={SocialDistancing} 
                text={"2 metres of distance should be maintained between the seats"}
                heading={"Social Distancing"}
                left={true}
                />
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user_id: state.user_id,
    business_id: state.business_id,
    loggedIn: state.loggedIn
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
