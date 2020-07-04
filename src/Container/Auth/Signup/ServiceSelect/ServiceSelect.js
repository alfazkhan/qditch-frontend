import React, { Component } from 'react'
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Checkbox, FormControlLabel } from '@material-ui/core'
// import './CategorySelect.css'
import Colors from '../../../../Constants/Colors'
import Axios from '../../../../Axios'
import { connect } from 'react-redux'
import Heading from '../../../../Components/Heading/Heading'
import * as Validator from '../../../../Validator'


class ServiceSelect extends Component {

    state = {
        ServiceList: [

        ],
        List: [],
        selectedServices: {},
        // prices: [],
        // durations: [],
        elementNumber: 0,
        Services: [],
        // Service_Category: [],
        business_id: '',
        category_names: {},
        selectedCategories: [],
        messages: [],
        errors: false,
        customServices: [],
        custom: false,
        customServicesList: [],
        customServiceElementNumber: 0
    }

    componentDidMount() {
        //getServices from server
        this.setState({ business_id: this.props.business_id })
        Axios.get('api/service/services/')
            .then(res => {
                const data = res.data
                // console.log(res.data)
                const newServiceList = this.state.ServiceList
                const services = this.state.Services
                // const ServiceCat = this.state.Service_Category
                for (var key in data) {
                    console.log()
                    // ServiceCat[res.data[key].name] = res.data[key].categories

                    services.push(data[key].name)
                    newServiceList.push(
                        <MenuItem key={key} name={this.state.elementNumber + ':choice'} value={key}>{data[key].name}</MenuItem>
                    )

                }
                this.setState({ ServiceList: newServiceList, Services: services }, () => {
                    this.addServiceField()
                })
                this.props.toggleLoading(false)

            })
            .catch((e) => {
                console.log(e)
            })
        const catNames = this.state.category_names

        Axios.get('api/category/categories/')
            .then(response => {
                // console.log(response.data)
                for (var key in response.data) {
                    catNames[response.data[key].id] = response.data[key].name
                }
                this.setState({
                    category_names: catNames
                })
            })

    }

    addServiceField = () => {
        const catNames = this.state.category_names
        const elementNumber = this.state.elementNumber + 1
        this.setState({ elementNumber: elementNumber }, () => {
            const List = this.state.List
            const serviceItem = (
                <Box>
                    <div className="row mt-3" key={new Date()}>
                        {/* <div className="col-md pr-5"></div> */}
                        <FormControl variant="outlined" className="col-md-4">
                            <InputLabel>Select Service</InputLabel>
                            <Select
                                name='selectedServices'
                                onChange={this.valueChangeHandler}
                                label="Select Service"
                                className="col"
                            >

                                {this.state.Services.map((value, index) => {
                                    return <MenuItem key={index} name={this.state.elementNumber + ':choice'} value={[index, this.state.elementNumber]}>{value}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <TextField
                            variant="outlined"
                            // margin="normal"
                            required
                            id={this.state.elementNumber + ':prices'}
                            onChange={this.valueChangeHandler}
                            label="Price (&#x20b9;)"
                            name="sal-name"
                            autoComplete=""
                            className="col-md-4"
                        />
                        <TextField
                            variant="outlined"
                            // margin="normal"
                            required
                            id={this.state.elementNumber + ':durations'}
                            onChange={this.valueChangeHandler}
                            label={"Duration(Min)"}
                            name="sal-name"
                            autoComplete=""
                            className="col-md-4"
                        />
                    </div>
                </Box>
            )
            List.push(serviceItem)
            this.setState({ List: List })

        })
    }



    ordinal = (number) => {
        const english_ordinal_rules = new Intl.PluralRules("en", {
            type: "ordinal"
        });
        const suffixes = {
            one: "st",
            two: "nd",
            few: "rd",
            other: "th"
        }
        const suffix = suffixes[english_ordinal_rules.select(number)];
        return (number + suffix);
    }

    validateData = () => {

        const messages = []
        // const prices = this.state.prices
        // const durations = this.state.durations
        //Services
        !Validator.isPresent(this.state.selectedServices) ? messages.push("Select Atleast One Service") : console.log()
        //Prices
        // !Validator.isPresent(this.state.prices) ? messages.push("Invalid Price") : console.log()
        // for (var key in prices) {
        //     !parseInt(prices[key]) ? messages.push("Invalid Price Value of " + this.ordinal(parseInt(key) + 1) + " Service Selected") : console.log()
        // }
        // //Duration
        // !Validator.isPresent(this.state.durations) ? messages.push("Invalid Duration") : console.log()
        // for (var key in durations) {
        //     !parseInt(durations[key]) ? messages.push("Invalid Time Value of " + this.ordinal(parseInt(key) + 1) + " Service Selected") : console.log()
        // }

        if (messages.length !== 0) {
            this.setState({ messages: messages, errors: true })
            return false
        }
        this.setState({ errors: false })
        return true

    }

    isLetter = (str) => {
        return str.length === 1 && str.match(/[a-z]/i);
    }

    valueChangeHandler = (e) => {
        let value, index, name, selectedCat
        const services = this.state.Services
        const selectedServices = this.state.selectedServices
        if (e.target.value === " ") {   //no empty values
            // eslint-disable-next-line no-restricted-globals
            event.target.value = ""
            return null
        }
        if (e.target.name === 'selectedServices') {
            name = e.target.name
            const id = e.target.value[0]
            index = e.target.value[1]
            value = services[id]
            selectedServices[index] = { ...selectedServices[index], "service": value }
            this.setState({ selectedServices: selectedServices })
            console.log(name, index, value)
            return true

        }
        // eslint-disable-next-line no-restricted-globals
        if (this.isLetter(event.target.value[event.target.value.length - 1])) {
            // console.log("Yes")
            // eslint-disable-next-line no-restricted-globals
            event.target.value = ""
            return null
        }
        value = e.target.value
        const info = e.target.id.split(':')
        index = info[0]
        name = info[1]

        console.log(name, index, value)

        switch (name) {
            case 'prices':
                selectedServices[index] = { ...selectedServices[index], "price": value }
                this.setState({ selectedServices: selectedServices }); break;
            case 'durations':
                selectedServices[index] = { ...selectedServices[index], "duration": value }
                this.setState({ selectedServices: selectedServices }); break;
        }
    }

    findIndex = (element, array) => {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === element) {
                return i
            }
        }
    }

    pageChangeHandler = () => {
        const progress = 100 * 5 / 8
        this.props.changeProgress(progress)
        this.props.toggleLoading(false)
        this.props.nextScreen('StylistSelect')
    }

    submitHandler = () => {
        
        if (this.validateData()) {
            this.props.toggleLoading(true)
            let url = 'api/service/business_services/'
            const selectedService = this.state.selectedServices
            const ServiceList = this.state.Services
            const customServices = this.state.customServices
            console.log(customServices.length)
            let promises = []
            for (var key in selectedService) {
                console.log(selectedService[key])
                const data = JSON.stringify({
                    "business": this.state.business_id,
                    "service": this.findIndex(selectedService[key].service, ServiceList) + 1,
                    "business_service_price": selectedService[key].price,
                    "business_service_duration": selectedService[key].price,
                    "disable": "False",
                    "buffer_time": "null"

                })
                promises[key] = Axios.post(url, data)
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(e => {
                        console.log(e.response)
                    })
            }
            for (var key in customServices) {
                console.log(customServices[key])
                url = 'api/service/custom_business_services/'
                const data = {
                    "business": this.state.business_id,
                    "service_name": customServices[key].name,
                    "business_service_price": parseInt(customServices[key].prices),
                    "business_service_duration": customServices[key].durations,
                    "category": customServices[key].category
                }
                promises.push(
                    Axios.post(url, data)
                        .then(res => {
                            console.log(res.data)
                        })
                        .catch(e => {
                            console.log(e.response)
                        })
                )
            }

            Promise.allSettled(promises)
                .then(res => {
                    this.props.toggleLoading(false)
                    console.log("All Data Sent")
                    this.pageChangeHandler()

                })

        }


    }

    addCustomServiceField = () => {
        const customServicesList = this.state.customServicesList
        const catNames = this.state.category_names
        const cats = []
        for (var key in catNames) {
            cats.push(<MenuItem key={key} name={"categories"} value={[key, this.state.customServiceElementNumber]}>{catNames[key]}</MenuItem>)
        }
        const serviceItem = (
            <Box>
                <div className="row mt-3" key={new Date()}>
                    <TextField
                        variant="outlined"
                        // margin="normal"
                        required
                        id={this.state.customServiceElementNumber + ':name'}
                        onChange={this.customServicesValueHandler}
                        label="Service Name"
                        name="sal-name"
                        autoComplete=""
                        className="col-md"
                    />
                    <FormControl variant="outlined" className="col-sm">
                        <InputLabel>Select Category</InputLabel>
                        <Select
                            name='category'
                            onChange={this.customServicesValueHandler}
                            label="Select Category"
                            className="col-md"
                        >
                            {cats}

                        </Select>
                    </FormControl>
                    <TextField
                        variant="outlined"
                        // margin="normal"
                        required
                        id={this.state.customServiceElementNumber + ':prices'}
                        onChange={this.customServicesValueHandler}
                        label="Price (&#x20b9;)"
                        name="sal-name"
                        autoComplete=""
                        className="col-md"
                    />
                    <TextField
                        variant="outlined"
                        // margin="normal"
                        required
                        id={this.state.customServiceElementNumber + ':durations'}
                        onChange={this.customServicesValueHandler}
                        label={"Duration(Min)"}
                        name="sal-name"
                        autoComplete=""
                        className="col-md"
                    />
                </div>
            </Box>
        )
        customServicesList.push(serviceItem)
        const num = this.state.customServiceElementNumber + 1
        this.setState({
            customServicesList: customServicesList,
            customServiceElementNumber: num
        })
    }

    addCustomToggle = () => {
        const toggle = !this.state.custom
        this.setState({
            custom: toggle
        })

        if (toggle) {
            this.addCustomServiceField()
        }
        else {
            this.setState({ customServicesList: [] })
        }
    }

    customServicesValueHandler = (e) => {

        const customService = this.state.customServices

        if (e.target.name === "category") {
            console.log(e.target.value)
            customService[e.target.value[1]] = { ...customService[e.target.value[1]], "category": e.target.value[0] }
            this.setState({ customServices: customService })
            return true
        }
        const index = e.target.id.split(':')[0]
        const name = e.target.id.split(':')[1]
        const value = e.target.value
        if (value !== "") {
            if (this.isLetter(value[value.length - 1]) && name !== "name") {
                console.log("Yes")
                // eslint-disable-next-line no-restricted-globals
                event.target.value = ""
                return null
            }
        }
        if (value === " ") {
            // eslint-disable-next-line no-restricted-globals
            event.target.value = ""
            return null
        }

        switch (name) {
            case "name":
                customService[index] = { ...customService[index], "name": value }
            case "prices":
                customService[index] = { ...customService[index], "prices": value }
            case "durations":
                customService[index] = { ...customService[index], "durations": value }

        }
        // console.log(customService)
        this.setState({ customServices: customService })
    }


    render() {
        return (
            <div>
                <div className="container" style={styles.screen}>
                    <Heading text="Select Services" />
                    {this.state.errors
                        ? <div class="alert alert-danger alert-dismissible fade show text-left" role="alert">
                            {this.state.messages.map(function (item, i) {

                                return <li key={i}>{item}</li>
                            })}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" onClick={() => {
                                    const error = !this.state.errors
                                    this.setState({ errors: error })
                                }}>&times;</span>
                            </button>
                        </div>
                        : null
                    }
                    <div className="row">
                        {/* <div className="col-2">
                            <table class="table table-borderless mt-4" >
                                <tbody className="pt-2" style={{ overflowY: "scroll" }}>
                                    {this.state.selectedCategories.map(index => {
                                        return <tr className="h-100 mt-5 pt-5" style={{ marginTop: 30 }}>
                                            <th scope="row" className="py-4"  > {index} </th>
                                        </tr>
                                    })}

                                </tbody>
                            </table>
                        </div> */}
                        <div className=" col-12" style={{ width: '100%', height: 400, overflowY: "scroll" }}>
                            {this.state.List}
                        </div>
                    </div>
                    <FormControlLabel
                        control={<Checkbox checked={this.state.custom} onChange={this.addCustomToggle} name="checkedA" />}
                        label="I want to Add my Custom Services"
                    />
                    <div>
                        <Button variant="contained" size="small" color="primary" className="mt-2 mb-3" onClick={this.addServiceField}>
                            &#x2b; Add New Service
                    </Button>
                    </div>

                </div >
                <div style={{ position: "relative" }}>


                    {this.state.custom
                        ? <div><div className="col-12" style={{ width: '100%', height: 500, overflowY: "scroll" }}>
                            {this.state.customServicesList}
                        </div>
                            <Button variant="contained" size="small" color="secondary" className="mt-4 mb-3" onClick={this.addCustomServiceField}>
                                &#x2b; Add New Custom Service
                </Button></div>
                        : null}
                    <div>

                    </div>
                    <div className="submitButton text-right">
                        <Button variant="contained" size="large" style={{ backgroundColor: Colors.success, color: 'white' }} onClick={this.submitHandler}>
                            Next
                    </Button>
                    </div>

                </div>
            </div>
        )
    }

}


const styles = {
    screen: {
        marginTop: 40
    },
}

const mapStateToProps = (state) => ({
    // user_id : state.user_id,
    business_id: state.business_id
})


export default connect(mapStateToProps, null)(ServiceSelect)





