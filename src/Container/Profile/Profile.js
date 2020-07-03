import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Axios from '../../Axios';
import { Button, Box, Grid, Card, CardActions, Fade, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Snackbar } from '@material-ui/core';
import Heading from '../../Components/Heading/Heading';
import Colors from '../../Constants/Colors';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import { Loader } from '../../Components/Loader/Loader'
import * as actionTypes from '../../store/Action/Action'
import * as Validator from '../../Validator'
import axios from 'axios'



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
        Loading: false,
        Modal: false,
        modalContent: null,
        passwordValues: {
            newPass: "",
            confirmPass: ""
        },
        messages: [],
        errors: false,
        success: false,
        successMessages: []
    }

    componentDidMount() {
        const DetailID = this.props.user_detail_id
        const business_id = this.props.business_id
        const user_id = this.props.user_id
        // const DetailID = 1
        // const business_id = 4
        // const user_id = 2


        if (!this.props.loggedIn || typeof user_id === 'undefined') {

            this.props.history.push('/')
        }



        // console.log(this.props.user_detail_id)
        // console.log(this.props.user_id)
        // const DetailID = 4

        // console.log(ID)
        const data = {
            "user": user_id
        }
        Axios.post('api/users/user_data/', data)
            .then(res => {
                console.log(res.data)
                this.setState({
                    email: res.data.email,
                    name: res.data.user_details.first_name + " " + res.data.user_details.last_name,
                    number: res.data.user_details.mobile_number,
                    Loading: false
                })
            })
            .catch(e => {
                console.log(e.response)
            })
    }


    valueChangeHandler = (e) => {
        // console.log(e.target.id, e.target.value)
        const values = this.state.passwordValues
        values[e.target.id] = e.target.value
        this.setState({ passwordValues: values })
    }

    passwordSubmitHandler = () => {
        const values = this.state.passwordValues
        const messages = []
        const successMessages = []

        if (!Validator.isPresent(values.newPass) || !Validator.isPresent(values.confirmPass)) {
            messages.push("Can't Leave Empty Fields")
            this.setState({ messages: messages, errors: true })
            return true
        }

        if (!Validator.validAtleastLength(values.newPass, 6)) {
            messages.push("Password Should Have atleast 6 Characters")
            this.setState({ messages: messages, errors: true })
            return true
        }
        if (!Validator.equalValues(values.confirmPass, values.newPass)) {
            messages.push("Password Values don't Match")
            this.setState({ messages: messages, errors: true })
            return true
        }

        const url = 'rest-auth/password/change/'
        const config = {
            headers: {
                "Authorization": "Token " + this.props.token
            }
        }
        const data = {
            "new_password1": values.newPass,
            "new_password2": values.confirmPass
        }

        Axios.post(url, data, config)
            .then(res => {
                console.log(res.data)
                successMessages.push("Password Changed Successfully")
                this.setState({ Modal: false, successMessages: successMessages, success: true })
            })
            .catch(e => {
                console.log(e.response)
                this.setState({ Modal: false })
            })

        // const headers = {
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Token e0c18e0e2861966f83c756a4a2c4e011ea5bf48a'
        //   }

        //   axios.post(url, data, config)
        //     .then((response) => {
        //       console.log(response.data)
        //     })
        //     .catch((error) => {
        //       console.log(error.response)
        //     })

    }


    editProfileHandler = () => {

        const modalContent = (
            <Dialog
                open={true}
                onClose={() => { this.setState({ Modal: false }) }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-title">{"Change Password"}</DialogTitle>
                <DialogContent>
                    {this.state.errors
                        ? <div class="alert alert-danger alert-dismissible fade show text-left" role="alert">
                            {this.state.messages.map(function (item, i) {

                                return <li key={i}>{item}</li>
                            })}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" onClick={() => {
                                    const error = !this.state.errors
                                    this.setState({ errors: error })
                                }}>&times;</span>
                            </button>
                        </div>
                        : null
                    }
                    <DialogContentText id="alert-dialog-description">

                        <div className="row">
                            <TextField
                                id="newPass"
                                label="New Password"
                                type="password"
                                fullWidth
                                autoComplete="current-password"
                                variant="outlined"
                                onChange={this.valueChangeHandler}
                            />
                        </div>
                        <div className="row mt-4">
                            <TextField
                                id="confirmPass"
                                label="Confirm Password"
                                type="password"
                                fullWidth
                                autoComplete="current-password"
                                variant="outlined"
                                onChange={this.valueChangeHandler}
                            />
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { this.setState({ Modal: false }) }} color="primary">
                        Disagree
                </Button>
                    <Button onClick={this.passwordSubmitHandler} color="primary" autoFocus>
                        Agree
                </Button>
                </DialogActions>
            </Dialog>

        )

        this.setState({
            Modal: true,
            modalContent: modalContent
        })

    }

    deleteProfileHandler = () => {
        // eslint-disable-next-line no-restricted-globals
        let allow = confirm("Are you Sure you Want to Continue and Delete Your Profile?")
        console.log(allow)



        if (allow) {
            this.setState({ Loading: true })
            Axios.delete('/api/users/user/' + this.props.user_id + '/')
                .then(res => {

                    console.log(res.data)
                    this.props.history.push('/')
                    this.setState({ Loading: false })


                })
                .catch(e => {
                    console.log(e.response)
                    this.props.history.push('/')
                    this.setState({ Loading: false })
                })

            if (this.props.business_user) {
                Axios.delete('/api/users/business/' + this.props.business_id + '/')
                    .then(res => {
                        this.props.history.push('/')
                        this.setState({ Loading: false })
                    })
                    .catch(e => {
                        console.log(e.response)
                        this.props.history.push('/')
                        this.setState({ Loading: false })

                    })
            }

            this.props.onDelete()

        }


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
                        {this.state.Modal ? this.state.modalContent : null}
                        {this.state.errors
                            ?
                            <div>

                                <Snackbar open={true} autoHideDuration={6000} onClose={() => {
                                    const error = !this.state.errors
                                    this.setState({ errors: error })
                                }}>
                                    <div class="alert alert-danger alert-dismissible fade show text-left" role="alert">
                                        {this.state.messages.map(function (item, i) {

                                            return <li key={i}>{item}</li>
                                        })}
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true" onClick={() => {
                                                const error = !this.state.errors
                                                this.setState({ errors: error })
                                            }}>&times;</span>
                                        </button>
                                    </div>
                                </Snackbar>
                            </div>

                            : null
                        }
                        {this.state.success
                            ? <div class="alert alert-success alert-dismissible fade show text-left" role="alert">
                                {this.state.successMessages.map(function (item, i) {

                                    return <li key={i}>{item}</li>
                                })}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true" onClick={() => {
                                        const success = !this.state.success
                                        this.setState({ success: success })
                                    }}>&times;</span>
                                </button>
                            </div>
                            : null
                        }
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
                                        <Button color="primary" size="large" onClick={() => this.props.history.push('/admin/dashboard')}>Dashboard</Button>
                                    </Box>
                                    : null}
                            </CardActions>
                        </Card>
                        <Box>
                            <Button variant="contained" color="primary" className="my-3 px-auto" style={{ width: '100%' }} onClick={this.editProfileHandler}>
                                Change Password
                            </Button>
                            <Button variant="contained" color="secondary" className="px-auto" style={{ width: '100%' }} onClick={this.deleteProfileHandler}>
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
    user_detail_id: state.user_details_id,
    token: state.token
})



const mapDispatchToProps = dispatch => {
    return {
        onDelete: () => dispatch({
            type: actionTypes.USER_LOGOUT
        })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile))
