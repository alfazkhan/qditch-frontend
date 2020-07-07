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
        const results = <SalonResultCards business_ids={this.state.filteredArray.length > 0  ? this.state.filteredArray : this.state.businessIDs} />
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
                                    <MenuItem value={'male'}>Male</MenuItem>
                                    <MenuItem value={'female'}>Female</MenuItem>
                                    <MenuItem value={'unisex'}>Unisex</MenuItem>
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
