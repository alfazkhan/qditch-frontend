import React, { Component } from 'react'
import {
    withRouter
} from "react-router-dom";
import Axios from '../../Axios';
import Heading from '../../Components/Heading/Heading';
import SalonResultCards from '../../Components/SearchResults/SalonResultCards/SalonResultCards';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@material-ui/core';


class Results extends Component {

    state = {
        businessIDs: [],
        categoryName: '',
        results: null,
        Loading: true,
        filteredArray: []
    }

    componentDidMount() {
        const category = this.props.match.params.category
        const categoryName = this.props.match.params.categoryName
        this.setState({ categoryName: categoryName })
        const data = {
            "id": category
        }
        Axios.post('api/category/super_category/', data)
            .then(res => {
                // console.log(res.data)
                this.setState({ businessIDs: res.data.business }, () => {
                    this.resultsRender()
                })
            })
            .catch(e => {
                console.log(e.response)
            })


    }

    getArraysIntersection = (a1, a2) => {
        return a1.filter(function (n) { return a2.indexOf(n) !== -1; });
    }

    salonTypeFilterHandler = (e) => {
        this.setState({ Loading: true })
        console.log(e.target.value)
        const data = {
            "type": e.target.value
        }
        Axios.post('api/users/business_type_filter/', data)
            .then(res => {
                console.log(res.data.business)
                const businessIDs = this.state.businessIDs
                console.log(businessIDs)
                let intersection = this.getArraysIntersection(businessIDs, res.data.business)
                console.log(intersection)
                this.setState({ filteredArray: intersection, Loading: false }, () => {
                    this.resultsRender()
                })

            })
            .catch(e => {
                console.log(e.response)
            })


    }

    resultsRender = () => {
        const results = <SalonResultCards business_ids={this.state.filteredArray.length > 0 ? this.state.filteredArray : this.state.businessIDs} />
        this.setState({ results: results, Loading: false })
    }


    render() {
        return (
            <div className="container">
                <Heading text={this.state.categoryName} />
                {/* {this.state.Loading
                    ? <CircularProgress /> */}
                <div>
                    <div className="row">
                        <FormControl variant="outlined" className="col-md">
                            <InputLabel>Salon Type Filter</InputLabel>
                            <Select
                                // value={age}
                                onChange={(e) => this.salonTypeFilterHandler(e)}
                                label="Saloon Type Filter"
                            >
                                <MenuItem value="" disabled>
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'male'}>Male</MenuItem>
                                <MenuItem value={'female'}>Female</MenuItem>
                                <MenuItem value={'unisex'}>Unisex</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" className="col-md">
                            <InputLabel>Salon Service Filter</InputLabel>
                            <Select
                                // value={age}
                                onChange={(e) => this.salonTypeFilterHandler(e)}
                                label="Saloon Service Filter"
                            >
                                <MenuItem value="" disabled>
                                    <em>None</em>
                                </MenuItem>

                                <MenuItem value={'Haircut'}>Haircut</MenuItem>
                                <MenuItem value={'Hair wash'}>Hair wash</MenuItem>
                                <MenuItem value={'Hair colour'}>Hair colour</MenuItem>
                                <MenuItem value={'Highlights'}>Highlights</MenuItem>
                                <MenuItem value={'Shave'}>Shave</MenuItem>
                                <MenuItem value={'Beard trim/styling'}>Beard trim/styling</MenuItem>
                                <MenuItem value={'Blow-dry'}>Blow-dry</MenuItem>
                                <MenuItem value={'Facial'}>Facial</MenuItem>
                                <MenuItem value={'De-Tan'}>De-Tan</MenuItem>
                                <MenuItem value={'Clean Up'}>Clean Up</MenuItem>
                                <MenuItem value={'Face Mask'}>Face Mask</MenuItem>
                                <MenuItem value={'Nail Spa'}>Nail Spa</MenuItem>
                                <MenuItem value={'Hand Spa'}>Hand Spa</MenuItem>
                                <MenuItem value={'Foot Spa'}>Foot Spa</MenuItem>
                                <MenuItem value={'Bridal makeup'}>Bridal makeup</MenuItem>
                                <MenuItem value={'Traditional makeup'}>Traditional makeup</MenuItem>
                                <MenuItem value={'Threading'}>Threading</MenuItem>
                                <MenuItem value={'Full body wax'}>Full body wax</MenuItem>
                                <MenuItem value={'Upper lip'}>Upper lip</MenuItem>
                                <MenuItem value={'Manicure'}>Manicure</MenuItem>
                                <MenuItem value={'Pedicure'}>Pedicure</MenuItem>
                                <MenuItem value={'Head Massage'}>Head Massage</MenuItem>
                                <MenuItem value={'Quick Massage'}>Quick Massage</MenuItem>
                                <MenuItem value={'Body Massage'}>Body Massage</MenuItem>

                            </Select>
                        </FormControl>

                    </div>
                    <div className="row">
                        {this.state.results}
                    </div>
                </div>
                {/* } */}

            </div>
        )
    }
}

export default withRouter(Results)
