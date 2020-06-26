import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Axios from '../../Axios';
import { Button, Box, Grid } from '@material-ui/core';
import Heading from '../../Components/Heading/Heading';
import Colors from '../../Constants/Colors';

const styles = {
    navlink: {
        color: Colors.LinksColor
    },
    status: false,
    container: {
        marginTop: window.innerHeight / 6,
        width: window.innerWidth < 768 ? '100%' : '50%',
    },
}



class Profile extends Component {

    state = {
        name: "",
    }

    componentDidMount() {
        const DetailID = this.props.user_detail_id
        const business_id = this.props.business_id

        if(!this.props.loggedIn){

            this.props.history.push('/')
        }
        

        console.log(this.props.user_detail_id)
        console.log(this.props.user_id)
        // const DetailID = 4

        // console.log(ID)
        Axios.get('/api/users/user_details/' + DetailID + '/')
            .then(res => {
                this.setState({
                    name: res.data.first_name + ' ' + res.data.last_name,

                })
            })
    }


    render() {
        return (


            <div className="container mx-auto" style={styles.container}>
                <Grid alignContent="center" alignItems='center' >
                    <Box>
                        <div className="row" >
                            <Avatar style={{ height: window.innerHeight / 4, width: window.innerHeight / 4 }} sizes="100 100" >{this.state.name[0]}</Avatar>
                        </div>
                        <div className="row" >
                            <Heading text={this.state.name} />
                        </div>
                        <div className="row mt-5">
                            <Button variant="contained" size="small" color="secondary" onClick={this.props.logout} >
                                Logout
                             </Button>
                        </div>
                        {this.props.business_user
                            ? <div className='row mt-5' >
                                <Button variant="contained" size="small" color="primary">
                                    <Link to='/admin/dashboard' className={"navbar-link "} style={styles.navlink}>Admin Dashboard</Link>
                                </Button>
                            </div>
                            : null}

                    </Box>
                </Grid>
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
