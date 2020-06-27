import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Axios from '../../Axios';
import { Button, Box, Grid, Card, CardActions } from '@material-ui/core';
import Heading from '../../Components/Heading/Heading';
import Colors from '../../Constants/Colors';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import { Loader } from '../../Components/Loader/Loader'

const styles = {
    navlink: {
        color: Colors.LinksColor
    },
    status: false,
    container: {
        marginTop: window.innerHeight / 8,
        width: window.innerWidth < 768 ? '100%' : '50%',
    },
}



class Profile extends Component {

    state = {
        name: "",
        number: "",
        email: "",
        Loading: false
    }

    componentDidMount() {
        const DetailID = this.props.user_detail_id
        const business_id = this.props.business_id
        const user_id = this.props.user_id
        // const DetailID = 1
        // const business_id = 4
        // const user_id = 2
        if(!this.props.loggedIn){

            this.props.history.push('/') 
        }


        // console.log(this.props.user_detail_id)
        // console.log(this.props.user_id)
        // const DetailID = 4

        // console.log(ID)
        Axios.get('/api/users/user_details/' + business_id + '/')
            .then(res => {
                console.log(res.data)
                this.setState({
                    name: res.data.first_name + ' ' + res.data.last_name,
                    number: res.data.mobile_number
                })
            })

        Axios.get('/api/users/user/' + user_id + '/')
            .then(res => {
                console.log(res.data)
                this.setState({
                    email: res.data.email
                })
            })
    }

    deleteProfileHandler = () => {
        // eslint-disable-next-line no-restricted-globals
        let allow = confirm("Are you Sure You Want to Continue and Delete Your Profile?")
        console.log(allow)
        this.setState({ Loading: true })
        

        Axios.delete('/api/users/user/' + this.props.user_id + '/')
            .then(res => {
                // if (this.props.business_user) {
                //     Axios.delete('/api/users/business/' + this.props.business_id + '/')
                //     .then(res=>{
                        console.log(res.data)
                        this.props.history.push('/') 
                        this.setState({ Loading: false })

                //     })
                //     .catch(e=>{
                //         console.log(e.response)
                //         this.setState({ Loading: false })

                //     })
                // }
            })
            .catch(e=>{
                console.log(e.response)
            })

    }

    randomColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    render() {
        return (


            <div className="container mx-auto" style={styles.container}>
                {this.state.Loading
                    ? <Loader />
                    : <Box>
                        <Heading text="User Profile" />
                        <Card>

                            <Box>
                                <Avatar style={{ backgroundColor: this.randomColor(), width: 200, height: 200 }} className="mx-auto my-5">
                                    <h1>{this.state.name[0]}</h1>
                                </Avatar>
                            </Box>
                            <Box className="my-5">
                                <h1>{this.state.name}</h1>
                            </Box>
                            <Box className="my-5">
                                <h4 className="font-weight-light"><MailOutlineIcon />&nbsp;{this.state.email}</h4>
                            </Box>
                            <Box className="my-5">
                                <h4 className="font-weight-light"><PhoneIcon />&nbsp;{this.state.number}</h4>
                            </Box>
                            <CardActions>
                                <Box>
                                    <Button color="secondary" size="large" onClick={this.props.logout} >Logout</Button>
                                </Box>
                                {this.props.business_user
                                    ? <Box className="ml-auto">
                                        <Button color="primary" size="large">Dashboard</Button>
                                    </Box>
                                    : null}
                            </CardActions>
                        </Card>
                        <Box>
                            <Button variant="contained" color="secondary" className="my-3 px-auto" style={{ width: '100%' }} onClick={this.deleteProfileHandler}>
                                Delete My Profile
                </Button>
                        </Box>
                    </Box>

                }

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user_id: state.user_id,
    business_id: state.business_id,
    business_user: state.businessUser,
    loggedIn: state.userLoggedIn,
    user_detail_id: state.user_details_id
})



export default connect(mapStateToProps, null)(withRouter(Profile))
