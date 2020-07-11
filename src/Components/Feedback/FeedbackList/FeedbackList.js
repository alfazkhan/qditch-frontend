import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReviewCard from './ReviewCard';

export class FeedbackList extends Component {

    state = {
        reviews: {},
        List: [],

        errors: false,
        messages: []
    }

    componentDidMount() {
        const List = []
        for (var key in this.props.feedbacks) {
            console.log(this.props.feedbacks[key])
            List.push(
                <ReviewCard rating={this.props.feedbacks[key].rating}
                review={this.props.feedbacks[key].review}
                username={this.props.feedbacks[key].user_name}
                />
            )
        }
        this.setState({
            List: List
        })
    }




    render() {
        return (
            <div>
                <Dialog
                    open={true}
                    onClose={this.props.onClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="sm"
                >
                    <DialogTitle id="alert-dialog-title">{"User Feedbacks"}</DialogTitle>
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
                        </DialogContentText>
                        {this.state.List}

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onClose} color="secondary">
                            Close
          </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default FeedbackList
