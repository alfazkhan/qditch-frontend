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
        // console.log(this.props.data)
        const promise = [Axios.get('api/safety_feature/safety_features/')
            .then(res => {
                // console.log(res.data)
                const ids = this.props.data['business_safety_features']
                for(var key in ids){
                    safetyFeatures.push(<li className="text-left text-muted ml-3 my-3"> {res.data[ids[key]].safety_feature} </li>)
                }
            })
            .catch(e => {
                console.log(e.response)
            })]

        console.log(safetyFeatures)

        Promise.allSettled(promise)
            .then(res => {
                console.log(safetyFeatures)
                this.setState({ safetyFeatures: safetyFeatures, Loading: false })
            })
    }

    render() {
        return (
            <div>
                {!this.state.Loading
                    ? <Paper elevation={3} className="p-3">
                        <Heading text={this.props.data['business_name']} />
                        <strong className="ml-3 mr-3 mb-3 text-break">{this.props.data['address']}</strong>
                        {this.state.safetyFeatures}

                    </Paper>
                    : null}


            </div>
        )
    }
}

export default SalonInfoCard
