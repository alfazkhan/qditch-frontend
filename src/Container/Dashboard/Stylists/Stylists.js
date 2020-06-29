import React, { Component } from 'react'
import Axios from '../../../Axios'
import CircularProgress from '@material-ui/core/CircularProgress';

export class Stylists extends Component {

    state = {
        stylists: [],
        names: [],
        nameList: [],
        Loading: true
    }

    componentWillMount() {
        const stylist = this.props.data['business_stylist']
        this.setState({ stylists: stylist }, () => {
            const names = this.state.names
            let promise = []
            for (var key in stylist) {
                promise[key] = Axios.get('api/stylist/stylist_details/' + stylist[key] + '/')
                    .then(response => {
                        // console.log(response.data)
                        names.push(response.data)

                    })
                    .catch(e => {
                        console.log(e.response)
                    })
            }
            Promise.allSettled(promise)
                .then(res => {
                    this.setState({ names: names }, () => {
                        this.setTableValues()
                    })

                })


        })


    }

    deleteHandler = (e) => {
        // console.log(e.target.id)
        const id = e.target.id.split(':')[0]
        const index = e.target.id.split(':')[1]
        const list = this.state.nameList
        // eslint-disable-next-line no-restricted-globals
        let allow = confirm("Are you Sure you Want to Delete this Service?")
        const url = 'api/stylist/stylist_details/' + id
        console.log(allow)
        if (allow) {
            list.splice(index, 1)
            this.setState({
                nameList: list
            })
            this.setState({ Loading: true })
            Axios.delete(url)
                .then(res => {
                    this.props.reload()
                    this.setState({ Loading: false })

                })
                .catch(e => {
                    this.setState({ Loading: false })
                })
        }
    }

    setTableValues = () => {
        const names = this.state.names
        const nameList = []
        for (var key = 0; key < this.state.stylists.length; key++) {
            console.log(names[key])
            const id = names[key].id
            nameList.push(
                <tr>
                    <th scope="row">{key + 1}</th>
                    <td>{names[key].name}</td>
                    <td><button type="button" class="btn btn-primary disabled">Edit</button> </td>
                    <td ><button id={id + ':' + key} onClick={this.deleteHandler} type="button" class="btn btn-danger">Delete</button> </td>
                </tr>
            )
        }
        this.setState({ nameList: nameList, Loading: false })
    }


    render() {
        return (
            <div className="container">
                {this.state.Loading ? <CircularProgress /> :
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.nameList}
                        </tbody>
                    </table>
                }
            </div>
        )
    }
}

export default Stylists
