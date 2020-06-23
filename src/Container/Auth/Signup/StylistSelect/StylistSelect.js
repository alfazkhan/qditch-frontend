import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core'
// import './CategorySelect.css'
import Colors from '../../../../Constants/Colors'
import Axios from '../../../../Axios'
import { connect } from 'react-redux'
var FormData = require('form-data');



class StylistSelect extends Component {

    state = {
        Stylists: [],
        List: [],
        currentNumber: 0,
        business_id: null
    }

    componentDidMount() {
        //getServices from server
        this.setState({business_id:this.props.business_id})
        this.addNewStylistField()
    }

    addNewStylistField = () => {
        const List = this.state.List
        const currentNumber = this.state.currentNumber + 1
        this.setState({ currentNumber: currentNumber }, () => {
            const newStylist = <div className="row mt-3">
                <TextField
                    variant="outlined"
                    // margin="normal"
                    onChange={this.valueChangeHandler}
                    required
                    id={this.state.currentNumber}
                    label={"Stylist Name"}
                    name="sal-name"
                    autoComplete=""
                    className="col ml-5 mr-5"
                />

            </div>
            List.push(newStylist)
            this.setState({ List: List })
        })


    }

    valueChangeHandler = (e) => {
        const id = e.target.id
        const value = e.target.value
        const stylists=this.state.Stylists
        stylists[id-1] = value
        this.setState({Stylists:stylists})
    }

    submitHandler = () => {
        const stylists = this.state.Stylists
        const url = '/stylist/stylist_details/'
        console.log(stylists)
        for (var i = 0; i < stylists.length; i++) {
            var data = new FormData();
            data.append('business', this.state.business_id);
            data.append('name', stylists[i]);
            console.log(data)
            Axios.post(url, data)
                .then((res) => {
                    console.log(res)
                    this.props.toggleLoading(false)

                })
                .catch((e) => {
                    console.log(e.response)
                    this.props.toggleLoading(false)
                })
        }
        this.props.toggleLoading(true)

        setTimeout(() => {
            const mode = this.props.mode
            const progress = mode === 'User' ? 50 : 100 * 6 / 8
            this.props.changeProgress(progress)
            this.props.toggleLoading(false)
            this.props.nextScreen('SafetyFeatures')
        }, 1000)
    }



    render() {
        return (
            <div className="container" style={styles.screen}>
                <div className="list" style={{ width: '100%', height: window.innerHeight / 3, overflowX: 'hidden' }}>
                    {this.state.List}
                </div>
                <div>
                    <Button variant="contained" size="small" color="primary" className="mt-4" onClick={this.addNewStylistField}>
                        &#x2b; Add Another Stylist
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
    }
}

const mapStateToProps = (state) => ({
    // user_id : state.user_id,
    business_id : state.business_id
})


export default connect(mapStateToProps, null)(StylistSelect)



