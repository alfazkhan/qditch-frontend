import React, { Component } from 'react'
import Axios from '../../../Axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import StylistModal from './StylistModal/StylistModal';
import Heading from '../../../Components/Heading/Heading';


export class Stylists extends Component {

    state = {
        stylists: [],
        names: [],
        nameList: [],
        Loading: true,
        Modal: false,
        messages: [],
        modalContent: null,
        stylistValue : {
            title: "null",
            name: "null",
            mode : "null",
            id: "null"
        }
    }

    componentWillMount() {
        const stylist = this.props.data['business_stylist']
        this.setState({ stylists: stylist }, () => {
            const names = this.state.names
            let promise = []
            for (var key in stylist) {
                promise[key] = Axios.get('api/stylist/stylist_details/' + stylist[key] + '/')
                    .then(response => {
                        // console.log(response.data)
                        names.push(response.data)

                    })
                    .catch(e => {
                        console.log(e.response)
                    })
            }
            Promise.all(promise)
                .then(res => {
                    this.setState({ names: names }, () => {
                        this.setTableValues()
                    })

                })


        })


    }

    deleteHandler = (e) => {
        // console.log(e.target.id)
        const id = e.target.id.split(':')[0]
        const index = e.target.id.split(':')[1]
        const list = this.state.nameList
        // eslint-disable-next-line no-restricted-globals
        let allow = confirm("Are you Sure you Want to Delete this Service?")
        const url = 'api/stylist/stylist_details/' + id
        console.log(allow)
        if (allow) {
            list.splice(index, 1)
            this.setState({
                nameList: list
            })
            this.setState({ Loading: true })
            Axios.delete(url)
                .then(res => {
                    this.props.reload()
                    this.setState({ Loading: false })

                })
                .catch(e => {
                    this.props.reload()
                    this.setState({ Loading: false })
                })
        }
    }

    changeValuesHandler = (e) =>{
        // console.log(e.target)
        const value = this.state.stylistValue
        if(e.target.value === " "){
            e.target.value = ""
            return true
        }
        if(e.target.name === "Stylist Title"){
            value["title"] = e.target.value
        }else{
            value["name"] = e.target.value
        }

        this.setState({
            stylistValue : value
        })


    }

    toggleModal = (e,action) => {
        // console.log(e.target.id,action)
        const value = this.state.stylistValue
        let currentValue = ''
        if(action ==="Edit"){
            value["mode"] = "Edit"
            value["id"] = e.target.id.split(':')[1]
            currentValue = this.state.names[e.target.id.split(':')[0]].name

        }else{
            value["mode"] = "Add"
        }
        
        const Modal = !this.state.Modal
        const modal = <Dialog
            open={true}
            onClose={() => this.setState({ Modal: false })}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            maxWidth="md"
        >
            <DialogTitle id="alert-dialog-title">{"Stylist"}</DialogTitle>
            {action ==="Edit"? <strong className="mx-auto"> Enter New Value for: {currentValue} </strong> :null}
            
            <StylistModal values={this.state.serviceValues} change={this.changeValuesHandler} />
            <DialogActions>
                <Button onClick={() => this.setState({ Modal: false })} color="secondary">
                    Cancel
              </Button>
                <Button onClick={() => this.editStylistHandler()} color="primary" autoFocus>
                    Done
              </Button>
            </DialogActions>
        </Dialog>

        this.setState({
            modalContent: modal,serviceValues:value
        }, () => {
            this.setState({ Modal: Modal })
        })
    }

    editStylistHandler = () => {
        const values = this.state.stylistValue
        const messages = []
        console.log(values)
        let url,data
        if(values.title === "null"){
            messages.push("Please Enter Title")
            this.setState({messages:messages,errors:true,Modal: false})
            return true
        }
        if(values.name === "null"){
            messages.push("Please Enter Name")
            this.setState({messages:messages,errors:true,Modal: false})
            return true
        }
        data = {
            "business": this.props.data['id'],
            "name": values.title + " " + values.name
        }
        this.setState({Loading: true})
        switch(values.mode){
            case "Add":
                url = "api/stylist/stylist_details/"
                Axios.post(url,data)
                .then(res=>{
                    console.log(res.data)
                    this.props.reload()
                    this.setState({Loading: false})
                })     
                .catch(e=>{
                    console.log(e.response)
                    this.setState({Loading: false})
                })  
                break;
            case "Edit":
                url = "api/stylist/stylist_details/"+ values.id + '/'
                Axios.patch(url,data)
                .then(res=>{
                    console.log(res.data)
                    this.props.reload()
                    this.setState({Loading: false})
                })     
                .catch(e=>{
                    console.log(e.response)
                    this.setState({Loading: false})
                })
                break;
        }
    }

    setTableValues = () => {
        const names = this.state.names
        const nameList = []
        for (var key = 0; key < this.state.stylists.length; key++) {
            // console.log(names[key])
            const id = names[key].id
            nameList.push(
                <tr>
                    <th scope="row">{key + 1}</th>
                    <td>{names[key].name}</td>
                    <td><button type="button" id={key+':'+id} class="btn btn-primary btn-sm" onClick={(e)=>this.toggleModal(e,"Edit")} >Edit</button> </td>
                    <td ><button id={id + ':' + key} onClick={this.deleteHandler} type="button" class="btn btn-danger btn-sm">Delete</button> </td>
                </tr>
            )
        }
        this.setState({ nameList: nameList, Loading: false })
    }


    render() {
        return (
            <div className="container">
                <Heading text="Salon Stylists" />
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
                {this.state.Loading ? <CircularProgress /> :
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.nameList}
                        </tbody>
                    </table>
                }
                <Button variant="contained" size="small" color="primary" className="mt-4 mb-3" onClick={(e) => this.toggleModal(e, "Add")}>
                    &#x2b; Add New Stylist
                        </Button>
            </div>
        )
    }
}

export default Stylists
