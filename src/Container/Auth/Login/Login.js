import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Axios from '../../../Axios';
import * as actionTypes from '../../../store/Action/Action'
import { withRouter } from 'react-router-dom';
import * as Validator from '../../../Validator'


const styles = {
  paper: {
    marginTop: window.innerHeight / 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {

    margin: '10px',
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '10px',
  },
  submit: {
    marginTop: '20px',
  },
}




export class Login extends Component {

  state = {
    values: {
      email: '',
      password: ''
    },
    errors: false,
    messages: []
  }

  validateData = () => {
    const values = this.state.values
    const messages = []
    // const emailValues = this.state.values.email

    //Email
    !Validator.isPresent(values['email']) ? messages.push("Email Field is Empty") : console.log()
    !Validator.emailFormat(values['email'])? messages.push("Wrong Email Format") : console.log()

    //Password
    !Validator.isPresent(values['password']) ? messages.push("Password Field is Empty") : console.log()




    if (messages.length !== 0) {
      this.setState({ messages: messages, errors: true })
      return false
    }
    this.setState({ errors: false })
    return true

  }


  valueChangeHandler = (e) => {
    const values = this.state.values
    const value = e.target.value
    const id = e.target.id
    values[id] = value
    this.setState({ values: values })
  }


  submitHandler = () => {
    if (this.validateData()) {
      // console.table(this.state.values)
      const data = JSON.stringify({
        "email": this.state.values.email,
        "password": this.state.values.password
      })
      const url = 'https://master.qditch.com/custom/login/'
      Axios.post(url, data)
        .then(res => {
          console.log(res.data)
          this.props.onTokenRecieve(res.data.key)
          this.props.onUserRegister(res.data.user)
          this.props.onUserDetailId(res.data.user_details)
          if (res.data.business != null) {
            this.props.onBusinessRegister(res.data.business)
            this.props.history.push({
              pathname: '/admin/dashboard/',
            })
          } else {
            this.props.history.push({
              pathname: '/',
            })
          }


        })
        .catch(e=>{
          const messages = this.state.messages
          messages.push("Incorrect Email/Password")
          this.setState({messages:messages,errors:true})
          
        })

    }

  }

  render() {
    return (
      <div>

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div style={styles.paper}>
            {this.state.errors
              ? <div class="alert alert-danger alert-dismissible fade show text-left" role="alert">
                {this.state.messages.map(function (item, i) {

                  return <li key={i}>{item}</li>
                })}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              : null
            }
            <form style={styles.form} noValidate>
              <TextField
                onChange={this.valueChangeHandler}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                onChange={this.valueChangeHandler}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                style={styles.submit}
                onClick={this.submitHandler}
              >
                Sign In
          </Button>
              <Grid container className="mt-5">
                <Grid item>
                  <Link href="/Register/User" variant="body2">
                    {"New Customer? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => {

  return {
    onTokenRecieve: (data) => dispatch({
      type: actionTypes.UPDATE_TOKEN,
      token: data
    }),
    onUserRegister: (data) => dispatch({
      type: actionTypes.UPDATE_USER_ID,
      user_id: data
    }),
    onBusinessRegister: (data) => dispatch({
      type: actionTypes.UPDATE_BUSINESS_ID,
      business_id: data
    }),
    onUserDetailId: (data) => dispatch({
      type: actionTypes.USER_DETAIL_ID,
      user_details_id: data
    })
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))

