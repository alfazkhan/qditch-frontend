
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from '../../../Axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import Heading from '../../../Components/Heading/Heading';
import { withRouter } from 'react-router-dom';
import { Button, Box, TextField, InputLabel, FormControl, Select, MenuItem } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import ServiceModal from './Modal/ServiceModal'
import DialogTitle from '@material-ui/core/DialogTitle';

export class Services extends Component {

    state = {
        services: [],
        allServices: {},
        // prices: [],
        // durations: [],
        lists: [],
        ids: [],
        data: { ...this.props.data },
        Loading: true,
        categoriesName: {},
        customServices: [],
        customList: [],
        dataLoaded: 0,
        Modal: false,
        modalContent: null,
        serviceValues: {
            name: "null",
            price: "null",
            duration: "null",
            category: "null",
            mode: "null",
            id: "null"
        },
        errors: false,
        messages: []

    }

    componentDidMount() {
        const business_services = this.state.data['business_services']

        const custom_business_services = this.state.data['custom_business_services']
        const promise = []
        const allCat = this.state.categoriesName
        const allServ = this.state.allServices

        // const services =

            // const all = this.state.allServices
            //         const services = this.state.services
            //         for (var key in business_services) {
            //             promise.push(
            //                 Axios.get('api/service/business_services/' + business_services[key] + '/')
            //                     .then(res => {
            //                         // console.log(res.data)
            //                         const data = {
            //                             "service": all[res.data.service].name,
            //                             "service_id": res.data.id,
            //                             "category": allCat[all[res.data.service].category].name,
            //                             "duration": res.data.business_service_duration,
            //                             "price": res.data.business_service_price
            //                         }
            //                         services.push(data)
            //                         // console.log(data)

            //                         const num = this.state.dataLoaded + 1
            //                         this.setState({ dataLoaded: num, services: services })
            //                         // if (this.state.dataLoaded === business_services.length) {

            //                         //     this.loadCustomTableData()
            //                         // }

            //                     })
            //                     .catch(e => {

            //                     })

            //             )


            //         }

            promise[0] = Axios.get('api/service/services/')
                .then(res => {

                    for (var key in res.data) {
                        // console.log(res.data)
                        allServ[res.data[key].id] = { ...allServ[res.data[key].id], "category": res.data[key].categories, "name": res.data[key].name }
                    }
                    this.setState({ allServices: allServ }, () => {
                        // console.log(this.state.allServices[1])
                    })
                })

        promise[1] = Axios.get('api/category/categories/')
            .then(res => {
                for (var key in res.data) {
                    allCat[res.data[key].id] = { "name": res.data[key].name }
                }
                this.setState({ categoriesName: allCat }, () => {
                    // console.log(this.state.categoriesName)
                    // this.loadCustomTableData()
                })
            })





        Promise.all(promise)
            .then(res => {
                if (business_services.length === 0) {
                    this.setState({
                        Loading: false
                    })
                    this.loadCustomTableData()
                    return true
                }
                else {
                    this.loadCustomTableData()
                }
                // const all = this.state.allServices
                // const services = this.state.services
                // for (var key in business_services) {
                //     promise.push(
                //         Axios.get('api/service/business_services/' + business_services[key] + '/')
                //             .then(res => {
                //                 // console.log(res.data)
                //                 const data = {
                //                     "service": all[res.data.service].name,
                //                     "service_id": res.data.id,
                //                     "category": allCat[all[res.data.service].category].name,
                //                     "duration": res.data.business_service_duration,
                //                     "price": res.data.business_service_price
                //                 }
                //                 services.push(data)
                //                 // console.log(data)

                //                 const num = this.state.dataLoaded + 1
                //                 this.setState({ dataLoaded: num, services: services })
                //                 // if (this.state.dataLoaded === business_services.length) {

                //                 //     this.loadCustomTableData()
                //                 // }

                //             })
                //             .catch(e => {

                //             })

                //     )
                // }
            })




    }

    loadCustomTableData = () => {

        const customServices = this.state.customServices
        if(customServices === []){
            return
        }
        const custom_services_data = this.state.data['custom_business_services']
        if (custom_services_data != null && custom_services_data.length === 0) {
            this.setState({
                Loading: false
            })
        }
        const allCat = this.state.categoriesName
        for (var key in custom_services_data) {
            // console.log(custom_services_data[key])
            const data = {
                service_name: custom_services_data[key].service_name,
                business_service_duration: custom_services_data[key].business_service_duration,
                business_service_price: custom_services_data[key].business_service_price,
                category: allCat[custom_services_data[key].category].name,
                service_id: custom_services_data[key].id,
                disable: custom_services_data[key].disable
            }
            // console.log(data)
            customServices.push(data)
        }
        this.setState({ customServices: customServices }, () => {
            this.setServiceTable()
            this.setcustomServices()
        })

    }


    deleteHandler = (e) => {
        const id = e.target.id.split(':')[1]
        const action = e.target.id.split(':')[0]
        const index = e.target.id.split(':')[2]
        console.log(action)
        // eslint-disable-next-line no-restricted-globals
        let allow = confirm("Are you Sure you Want to Delete this Service?")
        const url = action === "delete-service" ? 'api/service/business_services/' + id : 'api/service/custom_business_services/' + id
        if (allow) {
            this.setState({ Loading: true })
            Axios.delete(url)
                .then(res => {

                    // setTimeout(()=>{
                    this.props.reload()
                    this.setState({ Loading: false })
                    // this.initialValuesHandler()
                    // },1000)
                })
                .catch(e => {
                    this.setState({ Loading: false })
                })
        }

    }

    disableServiceHandler = (e) => {
        const id = e.target.id.split(':')[1]
        const action = e.target.id.split(':')[0]
        const index = e.target.id.split(':')[2]
        console.log(e.target.id)
        //eslint-disable-next-line no-restricted-globals
        let allow = confirm("Are you Sure you Want to Disable this Service?")
        const url = action === "disable-service" ? 'api/service/business_services/' + id + '/' : 'api/service/custom_business_services/' + id + '/'
        if (allow) {
            const data = {
                disable: e.target.id.split(':')[3] === "true" ? false : true
            }
            console.log(data)
            this.setState({ Loading: true })
            Axios.patch(url, data)
                .then(res => {

                    this.props.reload()
                    this.setState({ Loading: false })
                })
                .catch(e => {
                    console.log(e.response.data)
                    this.setState({ Loading: false })
                })
        }
    }




    setServiceTable = async () => {
        const List = []
        const services = this.state.data['business_services']
        const allServices = this.state.allServices
        const allCat = this.state.categoriesName
        // console.log(allCat)

        // console.log(allServices)


        for (var key = 0; key < services.length; key++) {
            const id = services[key]
            let serviceData = await Axios.get('api/service/business_services/?service='+id)
            serviceData = serviceData.data


            List.push(
                <tr>
                    <th scope="row">{key + 1}</th>
                    <td>{allServices[services[key]].name}</td>
                    <td>{allCat[allServices[services[key]].category].name}</td>
                    <td> {serviceData[0].business_service_duration} minutes </td>
                    <td>{serviceData[0].business_service_price} ₹</td>
                    <td><button id={"edit-custom-service:" + key + ':' + id}
                        type="button" class="btn btn-primary btn-sm" onClick={(e) => this.toggleModal(e, "ServiceEdit")}>Edit</button></td>
                    <td ><button id={"disable-service:" + id + ':' + key + ':' + services[key].disable}
                        onClick={this.disableServiceHandler}
                        type="button"
                        class={services[key].disable ? "btn-success btn btn-sm" : "btn-danger  btn btn-sm"}>
                        {services[key].disable ? "Enable" : "Disable"}
                    </button>
                    </td>
                    <td ><button id={"delete-service:" + id + ':' + key} onClick={this.deleteHandler} type="button" class="btn btn-danger btn-sm">Delete</button> </td>
                </tr>
            )

        }

        if (List.length === 0) {
            List.push(
                <div className="mx-auto">
                    <h3 className="text-center mt-3 text-grey" style={{ color: 'grey' }}>No Services Added</h3>
                </div>
            )
        }


        this.setState({ lists: List, services: services }, () => {

        })

    }


    setcustomServices = () => {
        const List = []
        const customServices = this.state.customServices

        // console.log(customServices)
        for (var key = 0; key < customServices.length; key++) {
            const id = customServices[key].service_id
            console.log(customServices[key])
            List.push(
                <tr>
                    <th scope="row">{key + 1}</th>
                    <td>{customServices[key].service_name}</td>
                    <td>{customServices[key].category}</td>
                    <td> {customServices[key].business_service_duration} </td>
                    <td>{customServices[key].business_service_price} </td>
                    <td><button type="button" id={"edit-service:" + key + ':' + id} class="btn btn-primary btn-sm" onClick={(e) => this.toggleModal(e, "CustomEdit")}>Edit</button> </td>
                    <td ><button id={"disable-custom-service:" + id + ':' + key + ':' + customServices[key].disable}
                        onClick={this.disableServiceHandler}
                        type="button"
                        class={customServices[key].disable ? "btn-success  btn btn-sm" : "btn-danger btn btn-sm"}
                    >
                        {customServices[key].disable ? "Enable" : "Disable"}
                    </button>
                    </td>
                    <td ><button id={"delete-custom-service:" + id} onClick={this.deleteHandler} type="button" class="btn btn-danger btn-sm">Delete</button> </td>
                </tr>
            )

        }

        if (List.length === 0) {
            List.push(
                <div className="mx-auto">
                    <h3 className="text-center mt-3 text-grey" style={{ color: 'grey' }}>No Custom Services Added</h3>
                </div>
            )
        }


        this.setState({ customList: List }, () => {
            this.setState({
                Loading: false
            })
        })


    }

    changeValuesHandler = (e) => {

        const values = this.state.serviceValues

        switch (e.target.name) {
            case "selectedServices":

                values["name"] = e.target.value
                // values["mode"] = "ServiceEdit"
                break;
            case "category":

                values["category"] = e.target.value
                // values["mode"] = "CustomServiceEdit"
                break;
            default:
                console.log()
        }

        switch (e.target.id) {
            case "name":
                if (e.target.value === " ") {
                    // e.target.value = e.target.value.slice(0, -1)
                    return true
                }
                // console.log("object")
                values["name"] = e.target.value
                break;
            case "prices":
                if (e.target.value.length > 6) {
                    e.target.value = e.target.value.slice(0, -1)
                    return true
                }
                values["price"] = e.target.value
                break;
            case "durations":
                if (e.target.value.length > 6) {
                    e.target.value = e.target.value.slice(0, -1)
                    return true
                }
                values["duration"] = e.target.value
                break;
            default:
                console.log()
        }

        console.log(values)

        this.setState({
            serviceValues: values
        })
    }

    toggleModal = (e, action) => {
        console.log(e.target.id)
        const id = e.target.id.split(':')[1]
        let data = this.state.serviceValues

        const allCat = this.state.categoriesName
        const allServices = this.state.allServices
        const services = this.state.data['business_services']

        let currentValue = ''
        switch (action) {
            case "ServiceEdit":
                console.log(allCat[allServices[services[id]].category].name)
                // return
                data = {
                    category: allCat[allServices[services[id]].category].name,
                    mode: "ServiceEdit",
                    id: e.target.id.split(':')[2]
                }
                currentValue = this.state.services[e.target.id.split(':')[1]]
                console.log(allServices[currentValue.service])
                currentValue = <div> Service: {allServices[services[id]].name} ,
                     Category:  {allCat[allServices[services[id]].category].name}  ,
                    Price:  {currentValue.business_service_price}  ,
                     Duration:  {currentValue.business_service_duration} </div>
                break;
            case "CustomEdit":
                data = {
                    mode: "CustomServiceEdit",
                    id: e.target.id.split(':')[2],
                    // name: "null"
                }
                currentValue = this.state.customServices[e.target.id.split(':')[1]]
                currentValue = <div> Service: {currentValue.service_name} ,
                     Category:  {currentValue.category}  ,
                    Price:  {currentValue.business_service_price}  ,
                     Duration:  {currentValue.business_service_duration} </div>
                break;
            case "Add":
                data = {
                    mode: "Add",
                    category: "No Cat"
                }
                break;
            case "CustomAdd":
                console.log("object")
                data = {
                    mode: "CustomAdd",
                    // name: "null"
                }
                break;


        }



        const serviceArray = []
        for (var key in this.state.allServices) {
            // console.log(this.state.allServices)
            serviceArray.push(this.state.allServices[key].name)
        }
        const categoryArray = []
        for (var key in this.state.categoriesName) {
            // console.log(this.state.categoriesName[key])
            // categoryArray.push(this.state.categoriesName[key].name)
            categoryArray.push(<MenuItem key={key} name={"categories"} value={key}>{this.state.categoriesName[key].name}</MenuItem>)
        }


        this.setState({ serviceValues: data }, () => {
            const Modal = !this.state.Modal
            const modal = <Dialog
                open={true}
                onClose={() => this.setState({ Modal: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth="md"
            >
                <DialogTitle id="alert-dialog-title">{"Services"}</DialogTitle>
                <strong className="mx-auto" >{currentValue}</strong>
                <ServiceModal services={serviceArray} categories={categoryArray} action={action} values={this.state.serviceValues} change={this.changeValuesHandler} />
                <DialogActions>
                    <Button onClick={() => this.setState({ Modal: false })} color="secondary">
                        Cancel
              </Button>
                    <Button onClick={() => this.serviceTableEdit()} color="primary" autoFocus>
                        Done
              </Button>
                </DialogActions>
            </Dialog>
            this.setState({
                modalContent: modal,
            }, () => {
                this.setState({ Modal: Modal })
            })

        })


    }

    serviceTableEdit = () => {
        const messages = []

        console.log(this.state.serviceValues)
        if (typeof this.state.serviceValues.name === "undefined") {
            messages.push("Empty Service Field")
            this.setState({ messages: messages, errors: true })
            return true
        }
        if (typeof this.state.serviceValues.category === "undefined") {
            messages.push("Empty Category Field")
            this.setState({ messages: messages, errors: true })
            return true
        }
        if (typeof this.state.serviceValues.price === "undefined") {
            messages.push("Empty Price Field")
            this.setState({ messages: messages, errors: true })
            return true
        }
        if (typeof this.state.serviceValues.duration === "undefined") {
            messages.push("Empty Duration Field")
            this.setState({ messages: messages, errors: true })
            return true
        }

        let url = ''
        let data = {}
        this.setState({ Loading: true })
        switch (this.state.serviceValues.mode) {
            case "ServiceEdit":
                url = 'api/service/business_services/' + this.state.serviceValues.id + '/'
                data = {
                    "business": this.props.data.id,
                    "service": this.state.serviceValues.name + 1,
                    "business_service_price": this.state.serviceValues.price,
                    "business_service_duration": this.state.serviceValues.duration,
                    "buffer_time": "null",
                    "disable": "False"
                }
                Axios.patch(url, data)
                    .then(res => {
                        console.log(res.data)
                        this.props.reload()
                        this.setState({ Loading: false })
                    })
                    .catch(e => {
                        console.log(e.response)
                    })
                break;
            case "CustomServiceEdit":
                url = 'api/service/custom_business_services/' + this.state.serviceValues.id + '/'
                data = {
                    "business": this.props.data.id,
                    "service_name": this.state.serviceValues.name,
                    "business_service_price": this.state.serviceValues.price,
                    "business_service_duration": this.state.serviceValues.duration,
                    "buffer_time": "null",
                    "disable": "False",
                    "category": this.state.serviceValues.category
                }
                Axios.patch(url, data)
                    .then(res => {
                        console.log(res.data)
                        this.props.reload()
                        this.setState({ Loading: false })
                    })
                    .catch(e => {
                        console.log(e.response)
                    })
                break;
            case "Add":
                url = 'api/service/business_services/'
                data = {
                    "business": this.props.data.id,
                    "service": this.state.serviceValues.name + 1,
                    "business_service_price": this.state.serviceValues.price,
                    "business_service_duration": this.state.serviceValues.duration,
                    "buffer_time": "null",
                    "disable": "False"
                }
                Axios.post(url, data)
                    .then(res => {
                        console.log(res.data)
                        this.props.reload()
                        this.setState({ Loading: false })
                    })
                    .catch(e => {
                        console.log(e.response)
                    })
                break;
            case "CustomAdd":
                url = 'api/service/custom_business_services/'
                data = {
                    "business": this.props.data.id,
                    "service_name": this.state.serviceValues.name,
                    "business_service_price": this.state.serviceValues.price,
                    "business_service_duration": this.state.serviceValues.duration,
                    "buffer_time": "null",
                    "disable": "False",
                    "category": this.state.serviceValues.category
                }
                Axios.post(url, data)
                    .then(res => {
                        console.log(res.data)
                        this.props.reload()
                        this.setState({ Loading: false })
                    })
                    .catch(e => {
                        console.log(e.response)
                    })
                break;
        }
        this.setState({ Modal: false, serviceValues: {} })
    }





    render() {
        return (
            <div className="container">
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
                {this.state.Modal ? this.state.modalContent : null}
                {this.state.Loading ? <CircularProgress />
                    : this.state.lists.length == 0
                        ?
                        <div className="mx-auto">
                            <h3 className="text-center mt-3 text-grey" style={{ color: 'grey' }}>No Services Added</h3>
                        </div>
                        :
                        <div>
                            <Heading text="Salon Services" />
                            <div style={{ overflowX: "scroll" }}>
                                <table class="table table-striped" style={{ overflowX: "scroll" }}>
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Service</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Duration</th>
                                            <th scope="col">Price</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.lists}
                                    </tbody>
                                </table>
                            </div>
                            <Button variant="contained" size="small" color="primary" className="mt-4 mb-3" onClick={(e) => this.toggleModal(e, "Add")}>
                                &#x2b; Add New Service
                        </Button>

                            <Heading text="Salon Custom Services" />
                            <div style={{ overflowX: "scroll" }}>
                                <table class="table table-striped" style={{ overflowX: "scroll" }}>
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Service</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Duration</th>
                                            <th scope="col">Price</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.customList}
                                    </tbody>
                                </table>
                            </div>
                            <Button variant="contained" size="small" color="secondary" className="mt-4 mb-3" onClick={(e) => this.toggleModal(e, "CustomAdd")}>
                                &#x2b; Add New Custom Service
                        </Button>
                        </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Services))
