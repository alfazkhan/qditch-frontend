import React, { Component } from 'react'
import { Paper, Fade } from '@material-ui/core'
import Heading from '../../Heading/Heading'
import Axios from '../../../Axios'

export class SalonInfoCard extends Component {

    state = {
        safetyFeatures: [],
        Loading: true
    }

    componentDidMount() {

        const safetyFeatures = this.state.safetyFeatures
        console.log(this.props.data)
        const promise = [Axios.get('api/safety_feature/safety_features/')
            .then(res => {
                // console.log(res.data)
                const ids = this.props.data['business_safety_features']
                for(var key in ids){
                    safetyFeatures.push(<li className="text-left text-muted ml-3 my-3"> {res.data[ids[key]].safety_feature} </li>)
                }
            })
            .catch(e => {
                // console.log(e.response)
            })]

        // console.log(safetyFeatures)

        Promise.all(promise)
            .then(res => {
                // console.log(safetyFeatures)
                this.setState({ safetyFeatures: safetyFeatures, Loading: false })
            })
    }

    render() {
        return (
            <div>
                {!this.state.Loading
                    ? <Paper elevation={3} className="p-0">
                        <Heading text={this.props.data['business_name']} />
                        <strong className="ml-3 mr-3 mb-1 text-break">{this.props.data['line1'] +", "+ this.props.data['line2']}</strong><br/>
                        <strong className="ml-3 mr-3 mb-1 text-break">{this.props.data['area'] + ", " + this.props.data['city_name'] + ", " + this.props.data['pincode']}</strong>
                        <div className='mt-1 mb-3' style={{maxHeight: 400,overflow: 'scroll',overflowX: 'hidden'}}>
                        {this.state.safetyFeatures}
                        </div>

                    </Paper>
                    : null}


            </div>
        )
    }
}

export default SalonInfoCard
