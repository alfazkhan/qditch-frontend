import React, { Component } from 'react'
import {
    withRouter
} from "react-router-dom";
import Axios from '../../Axios';
import Heading from '../../Components/Heading/Heading';
import SalonResultCards from '../../Components/SearchResults/SalonResultCards/SalonResultCards';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress, Card } from '@material-ui/core';
import Colors from '../../Constants/Colors';


class Results extends Component {

    state = {
        businessIDs: [],
        categoryName: '',
        results: null,
        Loading: true,

        genderArray: [],
        genderFilter: false,

        serviceArray: [],
        serviceFilter: false,
        
        cityArray: [],
        cityFilter: false
    }

    componentDidMount() {
        const category = this.props.match.params.category
        const categoryName = this.props.match.params.categoryName
        this.setState({ categoryName: categoryName })
        const data = {
            "id": category,
            "latitude": null,
            "longitude": null
        }
        Axios.post('api/category/super_category/', data)
            .then(res => {
                console.log(res.data)
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

    salonServiceFilterHandler = (e) => {
        console.log(e.target.value)
        this.setState({ Loading: true })
        if (e.target.value === "All") {
            this.setState({ serviceArray: [], serviceFilter: false }, () => {
                this.resultsRender()
            })
            return 1
        }

        const data = {
            "service": e.target.value
        }

        Axios.post('api/service/get_busienss_service_filter/', data)
            .then(res => {
                // console.log(res.data.business)
                this.setState({ Loading: false, serviceArray: res.data.business, serviceFilter: true }, () => {
                    this.resultsRender()
                })
            })

    }

    cityFilterHandler = (e) => {
        // console.log(e.target.value)
        this.setState({ Loading: true })
        if (e.target.value === "All") {
            this.setState({ cityArray: [], cityFilter: false }, () => {
                this.resultsRender()
            })
            return 1
        }

        const data = {
            "city": e.target.value
        }

        Axios.post('api/users/city_filter/', data)
            .then(res => {
                // console.log(res.data.business)
                this.setState({ Loading: false, cityArray: res.data.business, cityFilter: true }, () => {
                    this.resultsRender()
                })
            })

    }


    salonTypeFilterHandler = (e) => {
        this.setState({ Loading: true })

        if (e.target.value === "All") {
            this.setState({ genderArray: [], genderFilter: false }, () => {
                this.resultsRender()
            })
            return 1
        }

        console.log(e.target.value)
        const data = {
            "type": e.target.value
        }
        Axios.post('api/users/business_type_filter/', data)
            .then(res => {
                console.log(res.data.business)
                this.setState({ genderArray: res.data.business, Loading: false, genderFilter: true }, () => {
                    this.resultsRender()
                })

            })
            .catch(e => {
                console.log(e.response)
            })
    }

    resultsRender = () => {
        let finalArray = this.state.businessIDs

        if (this.state.genderArray.length > 0) {
            finalArray = this.getArraysIntersection(finalArray, this.state.genderArray)
        }
        if (this.state.serviceArray.length > 0) {
            finalArray = this.getArraysIntersection(finalArray, this.state.serviceArray)
        }
        if (this.state.cityArray.length > 0) {
            finalArray = this.getArraysIntersection(finalArray, this.state.cityArray)
        }
        if (this.state.genderArray.length === 0 && this.state.genderFilter ) {
            finalArray = []
            console.log("gender")
        }
        if (this.state.serviceArray.length === 0 && this.state.serviceFilter) {
            finalArray = []
            console.log("service")
        }
        if (this.state.cityArray.length === 0 && this.state.cityFilter) {
            finalArray = []
            console.log("city")
        }


        let results

        // console.log(finalArray.sort())

        if (finalArray.length > 0) {
            results = <SalonResultCards business_ids={finalArray} />
        } else {
            results = (
                <div className="mx-auto mt-5">
                    <h1 className="text-muted">No Results...</h1>
                    <h4 className="text-muted"> No Salons available for the Selected Filters </h4>
                </div>
            )
        }

        this.setState({ results: results, Loading: false })
    }

    randomColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }


    render() {
        return (
            <div className="container-fluid" style={{ width: '90%' }}>
                <Card className="my-4 w-75 mx-auto" elevation={5}>
                    <h1>{this.state.categoryName}</h1>
                </Card>
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
                                <MenuItem value={'All'}>All</MenuItem>
                                <MenuItem value={'male'}>Male</MenuItem>
                                <MenuItem value={'female'}>Female</MenuItem>
                                <MenuItem value={'unisex'}>Unisex</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" className="col-md">
                            <InputLabel>City</InputLabel>
                            <Select
                                // value={age}
                                onChange={(e) => this.cityFilterHandler(e)}
                                label="City"
                            >
                                <MenuItem value={'All'}>All</MenuItem>
                                <MenuItem value={'1'}>Noida</MenuItem>
                                <MenuItem value={'2'}>Indore</MenuItem>
                                <MenuItem value={'3'}>Mumbai</MenuItem>
                                <MenuItem value={'4'}>Chennai</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" className="col-md">
                            <InputLabel>Salon Service Filter</InputLabel>
                            <Select
                                // value={age}
                                onChange={(e) => this.salonServiceFilterHandler(e)}
                                label="Saloon Service Filter"
                            >
                                <MenuItem value="All">
                                    All
                                </MenuItem>

                                <MenuItem value={'1'}>Haircut</MenuItem>
                                <MenuItem value={'2'}>Hair wash</MenuItem>
                                <MenuItem value={'3'}>Hair colour</MenuItem>
                                <MenuItem value={'4'}>Highlights</MenuItem>
                                <MenuItem value={'5'}>Shave</MenuItem>
                                <MenuItem value={'6'}>Beard trim/styling</MenuItem>
                                <MenuItem value={'7'}>Blow-dry</MenuItem>
                                <MenuItem value={'8'}>Facial</MenuItem>
                                <MenuItem value={'9'}>De-Tan</MenuItem>
                                <MenuItem value={'10'}>Clean Up</MenuItem>
                                <MenuItem value={'11'}>Face Mask</MenuItem>
                                <MenuItem value={'12'}>Nail Spa</MenuItem>
                                <MenuItem value={'13'}>Hand Spa</MenuItem>
                                <MenuItem value={'14'}>Foot Spa</MenuItem>
                                <MenuItem value={'15'}>Bridal makeup</MenuItem>
                                <MenuItem value={'16'}>Traditional makeup</MenuItem>
                                <MenuItem value={'17'}>Threading</MenuItem>
                                <MenuItem value={'18'}>Full body wax</MenuItem>
                                <MenuItem value={'19'}>Upper lip</MenuItem>
                                <MenuItem value={'20'}>Manicure</MenuItem>
                                <MenuItem value={'21'}>Pedicure</MenuItem>
                                <MenuItem value={'22'}>Head Massage</MenuItem>
                                <MenuItem value={'23'}>Quick Massage</MenuItem>
                                <MenuItem value={'24'}>Body Massage</MenuItem>

                            </Select>
                        </FormControl>

                    </div>
                    

                        {this.state.results}
                    
                </div>
                {/* } */}

            </div>
        )
    }
}

export default withRouter(Results)
