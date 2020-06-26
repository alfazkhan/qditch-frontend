import React, { Component } from 'react'
import { CircularProgress } from '@material-ui/core'
import Axios from '../../../Axios'

class MyBusiness extends Component {

    state = {
        data: { ...this.props.data },
        saloonName: '',
        saloonType: '',
        safetyFeatures: [],
        Loading: false,
        safetyFeatures_id: [],
        safetyList: [],
        num:1
    }

    componentDidMount() {
        this.setState({
            saloonName: this.state.data['business_name'],
            saloonType: this.state.data['business_type'].toUpperCase()
        })

        this.setState({ safetyFeatures_id: this.props.data['business_safety_features'] }, () => {
            const ids = this.state.safetyFeatures_id
            const safetyList = this.state.safetyList
            for (var i in ids) {
                Axios.get('api/safety_feature/safety_features/' + ids[i] + '/')
                    .then(res => {
                        safetyList.push(
                            <tr>
                                <th scope="row">{this.state.num}</th>
                                <td>{res.data.safety_feature}</td>
                            </tr>
                        )
                        const n = this.state.num + 1
                        this.setState({ safetyList: safetyList, num : n }, () => {
                            this.setTable()
                        })
                    })
                    .catch(e => {
                        console.log(e.response)
                    })

            }

        })
    }
    onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    setTable = () => {
       
        this.setState({  Loading: false })

    }


    render() {
        return (
            <div>
                {this.state.Loading ? <CircularProgress /> :
                    <div>
                        <div>
                            <h1>{this.state.saloonName}</h1>
                            <h4>{this.state.saloonType}</h4>
                        </div>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Safety Feature</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.safetyList}
                            </tbody>
                        </table>

                    </div>}
            </div>
        )
    }
}

export default MyBusiness
