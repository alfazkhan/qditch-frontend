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
    }
  }

  valueChangeHandler = (e) => {
    const values = this.state.values
    const value = e.target.value
    const id = e.target.id
    values[id] = value
    this.setState({ values: values })


  }

  submitHandler = () => {
    console.table(this.state.values)
    const data = JSON.stringify({
      "email": this.state.values.email,
      "password": this.state.values.password
    })
    const url = 'http://13.234.31.245:8000/custom/login/'
    Axios.post(url, data)
      .then(res => {
        console.log(res.data)
        this.props.onTokenRecieve(res.data.key)
        this.props.onUserRegister(res.data.user)
        if(res.data.business != null){
          this.props.onBusinessRegister(res.data.business)
          this.props.history.push({
            pathname : '/admin/dashboard/',
          })
        }else{
          this.props.history.push({
            pathname : '/',
          })
        }
        
        
      })
      
  }

  render() {
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div style={styles.paper}>
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
                    {"Don't have an account? Sign Up"}
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
  })
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))

