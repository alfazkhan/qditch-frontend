import React, { Component } from 'react'
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
// import './CategorySelect.css'
import Colors from '../../../../Constants/Colors'
import Axios from '../../../../Axios'
import { connect } from 'react-redux'
import Heading from '../../../../Components/Heading/Heading'



class ServiceSelect extends Component {

    state = {
        ServiceList: [

        ],
        List: [],
        selectedServices:[],
        prices: [],
        durations:[],
        buffers:[],
        elementNumber: 0,
        Services: [],
        business_id:''
    }

    componentDidMount() {
        //getServices from server
        this.setState({business_id:this.props.business_id})
        Axios.get('api/service/services/')
            .then(res => {
                const data = res.data
                const newServiceList = this.state.ServiceList
                const services = this.state.Services
                for (var key in data) {
                    services.push(data[key].name)
                    // newServiceList.push(
                    //     <MenuItem key={key} name={this.state.elementNumber + ':choice'} value={key}>{data[key].name}</MenuItem>
                    // )
                }
                this.setState({ ServiceList: newServiceList, Services: services }, () => {
                    this.addServiceField()
                })
                this.props.toggleLoading(false)

            })
            .catch((e) => {
                console.log(e)
            })

    }

    addServiceField = () => {
        const elementNumber = this.state.elementNumber + 1
        this.setState({ elementNumber: elementNumber }, () => {
            const List = this.state.List
            const serviceItem = (<div className="row mt-3" key={new Date()}>
                {/* <div className="col-md pr-5"></div> */}
                <FormControl variant="outlined" className="col-sm">
                    <InputLabel>Select Service</InputLabel>
                    <Select
                        name='selectedServices'
                        onChange={this.valueChangeHandler}
                        label="Select Service"
                        className="col-md"
                    >

                        {this.state.Services.map((value,index)=>{
                            return <MenuItem key={index} name={this.state.elementNumber + ':choice'} value={[index,this.state.elementNumber]}>{value}</MenuItem>
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
                    className="col-md"
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
                    className="col-md"
                />
                {/* <TextField
                    variant="outlined"
                    // margin="normal"
                    required
                    id={this.state.elementNumber+':buffers'}
                    onChange={this.valueChangeHandler}
                    label={"Buffer Time(Hours)"}
                    name="sal-name"
                    autoComplete=""
                    className="col-sm"
                /> */}

            </div>)
            List.push(serviceItem)
            this.setState({ List: List })

        })
    }

    valueChangeHandler = (e) => {
        let value,index,name
        const services = this.state.Services
        if(e.target.name === 'selectedServices'){
            name = e.target.name
            const id = e.target.value[0]
            index = e.target.value[1]
            value = services[id]
        }else{
            value = e.target.value
            const info = e.target.id.split(':')
            index = info[0]
            name = info[1]
        }
        const newValue = this.state[name]
        newValue[index-1] = value
        switch(name){
            case 'selectedServices':
                this.setState({selectedServices:newValue});break;
            case 'prices':
                this.setState({prices:newValue});break;
            case 'durations':
                this.setState({durations:newValue});break;
            case 'buffers':
                this.setState({buffers:newValue});break;
        }
    }

    findIndex=(element,array)=>{
        for(var i=0;i<array.length;i++){
            if(array[i]===element){
                return i
            }
        }
    }

    pageChangeHandler = () =>{
        const progress =  100 * 5 / 8
        this.props.changeProgress(progress)
        this.props.toggleLoading(false)
        this.props.nextScreen('StylistSelect')
    }

    submitHandler = () => {
        // console.log(this.state)
        this.props.toggleLoading(true)

        const url = 'api/service/business_services/'
        const selectedService = this.state.selectedServices
        const price = this.state.prices
        const duration = this.state.durations
        const buffer = this.state.buffers
        const ServiceList = this.state.Services
        for(var i=0;i<selectedService.length;i++){
            const data= JSON.stringify({
                "business":this.state.business_id,
                "service": this.findIndex(selectedService[i],ServiceList)+1,
                "business_service_price": price[i],
                "business_service_duration": duration[i],
                "buffer_time":"null",
                "disable":"False"
            })
            // console.log(data)
            Axios.post(url,data)
            .then(res=>{
                console.log(res.data)
                if(i === selectedService.length){
                    this.pageChangeHandler()
                }
            })
            .catch(e=>{
                console.log(e.response)
            })
           
        }

            
    }


    render() {
        return (
            <div className="container" style={styles.screen}>
                <Heading text="Select Services" />
                <div className="" style={{ width: '100%', height: window.innerHeight / 3}}>
                    {this.state.List}
                </div>
                <div>
                    <Button variant="contained" size="small" color="primary" className="mt-4" onClick={this.addServiceField}>
                        &#x2b; Add New Service
                    </Button>

                </div>
                <div className="submitButton text-right">
                    <Button variant="contained" size="large" style={{ backgroundColor: Colors.success, color: 'white' }} onClick={this.submitHandler}>
                        Next
                    </Button>
                </div>
            </div >
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
    business_id : state.business_id
})


export default connect(mapStateToProps, null)(ServiceSelect)





