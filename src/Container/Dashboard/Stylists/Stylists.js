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

    componentDidMount() {
        const stylist = this.props.data['business_stylist']
        this.setState({ stylists: stylist }, () => {
            const names = this.state.names
            for (var key in stylist) {
                Axios.get('api/stylist/stylist_details/' + stylist[key] + '/')
                    .then(response => {
                        console.log(response.data)
                        names.push(response.data.name)
                        this.setState({ names: names }, () => {
                            this.setTableValues()
                        })
                    })
                    .catch(e => {
                        console.log(e.response)
                    })
            }


        })


    }

    setTableValues = () => {
        const names = this.state.names
        const nameList = []
        for (var key = 0; key < this.state.stylists.length; key++) {
            nameList.push(
                <tr>
                    <th scope="row">{key + 1}</th>
                    <td>{names[key]}</td>
                </tr>
            )
        }
        this.setState({ nameList: nameList, Loading: false })
    }


    render() {
        return (
            <div>
                {this.state.Loading ? <CircularProgress /> :
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
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
