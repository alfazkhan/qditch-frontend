import Slideshow from '../../Components/SlideShow/Slideshow'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from '../../Axios'
import Categories from '../../Components/Categories/Categories'

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

                {/* <Categories/> */}
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
