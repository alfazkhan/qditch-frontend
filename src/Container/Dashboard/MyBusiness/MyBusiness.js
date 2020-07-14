import React, { Component } from 'react'
import { CircularProgress, Button } from '@material-ui/core'
import Axios from '../../../Axios'
import Heading from '../../../Components/Heading/Heading'

class MyBusiness extends Component {

    state = {
        data: { ...this.props.data },
        saloonName: '',
        saloonType: '',
        Loading: false,

        num: 1,

        feedbacks: []
    }

    componentDidMount() {


        this.setState({
            saloonName: this.state.data['business_name'],
            saloonType: this.state.data['business_type'].toUpperCase()
        })

        // console.log(this.state.data.feedbacks)
        const feedbacks = []

        for (var key in this.state.data.feedbacks) {
            // console.log(this.state.data.feedbacks[key])
            feedbacks.push(
                <tr>
                    <td>{parseInt(key)+1}</td>
                    <td> {this.state.data.feedbacks[key].user_name}</td>
                    <td> {this.state.data.feedbacks[key].rating}  <i class="fa fa-star" aria-hidden="true" ></i></td>
                    <td className="text-left"> {this.state.data.feedbacks[key].review}</td>
                    <td> <button id={this.state.data.feedbacks[key].id} className="btn btn-sm btn-danger" onClick={this.deleteReviewHandler} >Delete</button> </td>
                    
                </tr>
            )
        }

        if (feedbacks.length === 0) {
            feedbacks.push(
                <div className="mx-auto">
                    <h3 className="text-center mt-3 text-grey" style={{ color: 'grey' }}>No Reviews Given!!!</h3>
                </div>
            )
        }


        this.setState({
            feedbacks: feedbacks
        })


    }
    onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    deleteReviewHandler=(e)=>{
        console.log(e.target.id)
        const id = e.target.id
        let url = 'api/feedback/feedback/' + id + '/'


        // eslint-disable-next-line no-restricted-globals
        let allow = confirm("Are you Sure you Want to Delete this Review?")

        if (allow) {
            this.setState({
                Loading: true
            })
            Axios.delete(url)
                .then(res => {
                    console.log(res.data)
                    this.props.reload()
                    this.setState({
                        Loading: false
                    })
                })
                .catch(e => {
                    console.log(e.response)
                })
        }
    }

    setTable = () => {

        this.setState({ Loading: false })

    }


    render() {
        return (
            <div className="container">
                {this.state.Loading ? <CircularProgress /> :
                    <div>
                        <div>
                            <h1>{this.state.saloonName}</h1>
                            <h4>{this.state.saloonType}</h4>
                        </div>
                        <div>

                        </div>
                        <h4 className="mt-5">User Reviews</h4> 
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">User</th>
                                    <th scope="col">Rating</th>
                                    <th scope="col">Review</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.feedbacks}
                            </tbody>
                        </table>

                    </div>}
            </div>
        )
    }
}

export default MyBusiness
