import React, { Component } from 'react'
import { CircularProgress } from '@material-ui/core'

class MyBusiness extends Component {

    state = {
        data: { ...this.props.data },
        saloonName: '',
        saloonType: '',
        safetyFeatures: [],
        Loading: false,
        safetyFeatures_id:[]
    }

    componentDidMount() {
        this.setState({
            saloonName: this.state.data['business_name'],
            saloonType: this.state.data['business_type'].toUpperCase()
        })
    
        this.setState({safetyFeatures_id:this.props.data['business_safety_features']},()=>{
            // this.state.safetyFeatures_id
        })
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
                                {this.state.imageList}
                            </tbody>
                        </table>

                    </div>}
            </div>
        )
    }
}

export default MyBusiness
