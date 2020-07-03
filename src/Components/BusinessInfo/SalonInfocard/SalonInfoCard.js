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
                console.log(res.data)
                safetyFeatures.push(<li> {res.data.safety_feature} </li>)
            })
            .catch(e => {
                console.log(e.response)
            })]

        console.log(safetyFeatures)
        
        Promise.allSettled(promise)
        .then(res=>{
            console.log(safetyFeatures)
            this.setState({safetyFeatures:safetyFeatures})
        })
    }

    render() {
        return (
            <div>

                <Paper elevation={3}>
                    <Heading text={this.props.data['business_name']} />
                    {this.state.safetyFeatures}

                </Paper>

            </div>
        )
    }
}

export default SalonInfoCard
