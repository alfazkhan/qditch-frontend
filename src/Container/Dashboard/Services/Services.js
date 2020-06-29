
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from '../../../Axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import Heading from '../../../Components/Heading/Heading';
import { withRouter } from 'react-router-dom';


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
        dataLoaded: 0

    }

    componentDidMount() {
        const business_services = this.state.data['business_services']
        const custom_business_services = this.state.data['custom_business_services']
        const promise = []
        const allCat = this.state.categoriesName
        const allServ = this.state.allServices

        promise[1] = Axios.get('api/category/categories/')
        .then(res=>{
            for (var key in res.data) {
                allCat[res.data[key].id] = { "name": res.data[key].name }
            }
            this.setState({ categoriesName: allCat }, () => {
                // console.log(this.state.categoriesName)
            })
        })

        promise[0] = Axios.get('api/service/services/')
            .then(res => {
                
                for (var key in res.data) {
                    allServ[res.data[key].id] = { "name": res.data[key].name, "category": res.data[key].categories  }
                }
                this.setState({ allServices: allServ }, () => {
                })
            })


        Promise.allSettled(promise)
            .then(res => {
                const all = this.state.allServices
                const services = this.state.services
                for (var key in business_services) {
                    promise.push(
                        Axios.get('api/service/business_services/' + business_services[key] + '/')
                            .then(res => {
                                // console.log(res.data)
                            const data = {
                                "service" : all[res.data.service].name,
                                "service_id": res.data.id,
                                "category" : allCat[all[res.data.service].category].name,
                                "duration" : res.data.business_service_duration,
                                "price" : res.data.business_service_price
                            }
                            services.push(data)
                            // console.log(data)

                            const num = this.state.dataLoaded + 1
                            this.setState({dataLoaded:num,services:services})
                                if(this.state.dataLoaded === business_services.length){
                                    
                                    this.loadCustomTableData()
                                }

                            })
                            .catch(e => {

                            })

                    )
                   

                }
            })


    }

    loadCustomTableData = () => {
        const customServices = this.state.customServices
        const custom_services_data = this.state.data['custom_business_services']
        const allCat = this.state.categoriesName
        for(var key in custom_services_data){
            // console.log(custom_services_data[key])
            const data = {
                service_name : custom_services_data[key].service_name,
                business_service_duration: custom_services_data[key].business_service_duration ,
                business_service_price: custom_services_data[key].business_service_price,
                category: allCat[custom_services_data[key].category].name,
                service_id : custom_services_data[key].id
            }
            // console.log(data)
            customServices.push(data)
        }
        this.setState({customServices:customServices},()=>{
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
        console.log(allow)
        if(action === "delete-service"){
            const lists = this.state.lists 
            lists.splice(index, 1)
            this.setState({
                lists : lists
            })
        }else{
            const lists = this.state.customList
            lists.splice(index, 1)
            this.setState({
                customList : lists
            })
        }
         


        

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



    requestHandler = (action, id) => {

    }

    setServiceTable = () => {
        const List = []
        const services = this.state.services
        // console.log(services)

        for (var key = 0; key < services.length; key++) {
            const id = services[key].service_id
            List.push(
                <tr>
                    <th scope="row">{key + 1}</th>
                    <td>{services[key].service}</td>
                    <td>{services[key].category}</td>
                    <td> {services[key].duration} </td>
                    <td>{services[key].price} </td>
                    <td><button type="button" class="btn btn-primary disabled">Edit</button></td>
                    <td ><button id={"delete-service:" + id + ':' + key} onClick={this.deleteHandler} type="button" class="btn btn-danger">Delete</button> </td>
                </tr>
            )

        }

        this.setState({ lists: List }, () => {
            
        })

    }


    setcustomServices = () => {
        const List = []
        const customServices = this.state.customServices

        // console.log(customServices)
        for (var key = 0; key < customServices.length; key++) {
            const id = customServices[key].service_id
            console.log(id)
            List.push(
                <tr>
                    <th scope="row">{key + 1}</th>
                    <td>{customServices[key].service_name}</td>
                    <td>{customServices[key].category}</td>
                    <td> {customServices[key].business_service_duration} </td>
                    <td>{customServices[key].business_service_price} </td>
                    <td><button type="button" class="btn btn-primary disabled">Edit</button> </td>
                    <td ><button id={"delete-custom-service:" + id} onClick={this.deleteHandler} type="button" class="btn btn-danger">Delete</button> </td>
                </tr>
            )

        }

        this.setState({ customList: List }, () => {
            this.setState({
                Loading: false
            })
        })


    }





    render() {
        return (
            <div className="container">

                {this.state.Loading ? <CircularProgress /> :
                    <div>
                        <Heading text="Saloon Services" />
                        <table class="table table-borderless">
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
                        <Heading text="Saloon Custom Services" />
                        <table class="table table-borderless">
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
