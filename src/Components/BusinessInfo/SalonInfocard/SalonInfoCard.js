import React, { Component } from 'react'
import { Paper, Fade } from '@material-ui/core'
import Heading from '../../Heading/Heading'
import Axios from '../../../Axios'
import Color from '../../../Constants/Colors'

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
                this.props.safetyFeatures(safetyFeatures)
                this.setState({ safetyFeatures: safetyFeatures, Loading: false })

            })
    }

    render() {
        return (
            <div className="mx-3">
                {!this.state.Loading
                    ? <div>
                        <h4 className="text-left mt-2" style={{fontWeight:"bolder",fontSize:"20px"}}>{this.props.data['business_name']}</h4>
                        <p className="text-left text-muted" style={{fontSize:"12px"}}>{this.props.data['line1'] +", "+ this.props.data['line2']+' '+
                        this.props.data['area'] + ", " + this.props.data['city_name'] + ", " + this.props.data['pincode']}</p>
                        {
                            this.props.data['map_url'] === ""
                            ? this.props.data['latitude'] 
                            ? <a href={"http://maps.google.com/maps?q="+this.props.data['latitude']+","+this.props.data['longitude']} target="blank"><button className="btn btn-sm btn-block " style={{backgroundColor: Color.buttonColor,color:'#fff'}}>Get Directions</button></a> 
                            :null
                            :
                        <a href={this.props.data['map_url']} target="blank"><button className="btn btn-sm btn-block" style={{backgroundColor: Color.buttonColor,color:'#fff'}}>Get Directions</button></a>
                        }
                        {/* <div className='mt-1 mb-1' style={{maxHeight: 400,overflow: 'scroll',overflowX: 'hidden', color: '#fff'}}>
                        {this.state.safetyFeatures}
                        </div> */}
                    </div>
                    : null}


            </div>
        )
    }
}

export default SalonInfoCard
