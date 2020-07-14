import React, { Component } from 'react'
import { Button, TextField } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from '../../../Axios';

export class FeedbackCreate extends Component {

    state = {
        review: '',
        rating: 1,
        stars: [],

        errors: false,
        messages: []

    }

    componentDidMount() {
        const stars = [true, false, false, false, false]
        this.setState({ stars })
    }

    starValueChange = (e) => {
        const stars = [false, false, false, false, false]
        for (var i = 0; i <= e.target.id; i++) {
            stars[i] = true
        }

        this.setState({ stars: stars, rating: parseInt(e.target.id) + 1 })
    }

    changeValueHandler = (e) => {
        this.setState({
            review: e.target.value
        })
    }

    onSubmit = () => {

        const userData = JSON.parse(localStorage.getItem('state'))
        const messages = []
        const url='api/feedback/feedback/'
        

        if (this.state.review === "") {
            messages.push("Can't Leave Comment Blank")
            this.setState({
                errors: true,
                messages: messages
            })
            return 1
        }

        const data = {
            "rating": this.state.rating,
            "review": this.state.review,
            "user": userData.user_id,
            "business": this.props.business_id
        }

        Axios.post(url,data)
        .then(res=>{
            console.log(res.data)
            this.props.onClose()

            window.location.reload()
        })
        .catch(e=>{
            console.log(e.response)
        })

    }




    render() {
        return (
            <div >


                <Dialog
                    open={true}
                    onClose={this.props.onClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="lg"
                >
                    <DialogTitle id="alert-dialog-title">{"Rate This Salon"}</DialogTitle>
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
                            <i class="fa fa-star mx-1" id="0" onClick={this.starValueChange} aria-hidden="true" style={{ fontSize: 30, color: this.state.stars[0] ? 'gold' : 'grey' }}></i>
                            <i class="fa fa-star mx-1" id="1" onClick={this.starValueChange} aria-hidden="true" style={{ fontSize: 30, color: this.state.stars[1] ? 'gold' : 'grey' }}></i>
                            <i class="fa fa-star mx-1" id="2" onClick={this.starValueChange} aria-hidden="true" style={{ fontSize: 30, color: this.state.stars[2] ? 'gold' : 'grey' }}></i>
                            <i class="fa fa-star mx-1" id="3" onClick={this.starValueChange} aria-hidden="true" style={{ fontSize: 30, color: this.state.stars[3] ? 'gold' : 'grey' }}></i>
                            <i class="fa fa-star mx-1" id="4" onClick={this.starValueChange} aria-hidden="true" style={{ fontSize: 30, color: this.state.stars[4] ? 'gold' : 'grey' }}></i>
                        </DialogContentText>

                        <TextField
                            id="outlined-multiline-static"
                            label="Comments"
                            multiline
                            rows={4}
                            variant="outlined"
                            className="mt-3"
                            fullWidth
                            onChange={this.changeValueHandler}
                            style={{width: window.innerWidth/2}}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onClose} color="secondary">
                            Cancel
          </Button>
                        <Button onClick={this.onSubmit} color="primary" autoFocus>
                            Submit
          </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default FeedbackCreate
