
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from '../../../Axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import Heading from '../../../Components/Heading/Heading';


export class Services extends Component {

    state = {
        services: [],
        prices: [],
        durations: [],
        lists: [],
        buffers: [],
        data: { ...this.props.data },
        Loading: true,
        categoriesName: [],
        customServices:[],
        customList:[]
    }

    componentDidMount() {
        const service_id = this.state.data['business_services']
        const catNames = this.state.categoriesName
        const customServices = this.state.data.custom_business_services
        for (var key in service_id) {
            Axios.get('api/service/business_services/' + service_id[key] + '/')
                .then(res1 => {
                    Axios.get('api/service/services/' + res1.data.service + '/')
                        .then((res2) => {
                            const response = this.state.response
                            const services = this.state.services
                            const duration = this.state.durations
                            const price = this.state.prices
                            const buffer = this.state.buffers
                            // console.log(res2.data)
                            services.push(res2.data.name)
                            duration.push(res1.data.business_service_duration)
                            price.push(res1.data.business_service_price)
                            buffer.push(res1.data.buffer_time)
                            Axios.get('api/category/categories/' + res2.data.categories + '/')
                                .then(res3 => {
                                    // console.log(res3.data.name)
                                    catNames.push(res3.data.name)
                                    this.setState({
                                        services: services,
                                        durations: duration,
                                        prices: price,
                                        buffers: buffer,
                                        categoriesName: catNames
                                    }, () => {
                                        this.setServiceTable()
                                    })
                                })
                                .catch(e => {
                                    console.log(e.response)
                                })
                        })
                        .catch(e => {
                            console.log(e.response)
                        })
                })
                .catch(e => {
                    console.log(e.response)
                })
        }
        this.setState({customServices: customServices},()=>{
            this.setcustomServices()
        })

    }


    setcustomServices=()=>{
        const List = []
        const customServices = this.state.customServices
        for (var key = 0; key < customServices.length; key++) {
            List.push(
                <tr>
                    <th scope="row">{key + 1}</th>
                    <td>{customServices[key].service_name}</td>
                    <td> {customServices[key].business_service_duration} </td>
                    <td>{customServices[key].business_service_price} </td>
                </tr>
            )

        }

        this.setState({ customList: List }, () => {
            this.setState({ Loading: false })
        })


    }


    setServiceTable = () => {
        const List = []
        const services = this.state.services
        const duration = this.state.durations
        const price = this.state.prices
        const buffer = this.state.buffers
        for (var key = 0; key < services.length; key++) {
            List.push(
                <tr>
                    <th scope="row">{key + 1}</th>
                    <td>{services[key]}</td>
                    <td>{this.state.categoriesName[key]}</td>
                    <td> {duration[key]} </td>
                    <td>{price[key]} </td>
                </tr>
            )

        }

        this.setState({ lists: List }, () => {
            this.setState({ Loading: false })
        })

    }


    render() {
        return (
            <div className="container">
                {this.state.Loading ? <CircularProgress /> :
                <div>
                    <Heading text = "Saloon Services" />
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Service</th>
                                <th scope="col">Category</th>
                                <th scope="col">Duration</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.lists}
                        </tbody>
                    </table>
                    <Heading text = "Saloon Custom Services" />
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Service</th>
                                <th scope="col">Duration</th>
                                <th scope="col">Price</th>
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

export default connect(mapStateToProps, mapDispatchToProps)(Services)
