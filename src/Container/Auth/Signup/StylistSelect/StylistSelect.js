import React, { Component } from 'react'
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
// import './CategorySelect.css'
import Colors from '../../../../Constants/Colors'
import Axios from '../../../../Axios'
import { connect } from 'react-redux'
import Heading from '../../../../Components/Heading/Heading'
import * as Validator from '../../../../Validator'


class StylistSelect extends Component {

    state = {
        Stylists: [],
        List: [],
        currentNumber: 0,
        business_id: null,
        messages: [],
        errors: false,
        Titles: []
    }

    componentDidMount() {
        //getServices from server
        this.setState({ business_id: this.props.business_id })
        this.addNewStylistField()
    }

    addNewStylistField = () => {
        if (this.state.Stylists.length < this.state.List.length) {
            const messages = this.state.messages
            messages.push("Enter Values in Exsisting Fields")
            this.setState({ messages: messages, errors: true })
        } else {
            const List = this.state.List
            const currentNumber = this.state.currentNumber + 1
            this.setState({ currentNumber: currentNumber }, () => {
                const newStylist = <tr><td className="p-0">
                    <FormControl variant="outlined" className="col-sm text-center">
                        <InputLabel>Title</InputLabel>
                        <Select
                            name={this.state.currentNumber}
                            // value={this.state.currentNumber}
                            onChange={this.titleChangeHandler}
                            label="Title"
                            className="col-12 mt-1"
                            required
                            placeholder="title"
                            margin="none"
                        >

                            {/* <MenuItem key={new Date()} name={"None"} value={"none"} disabled>None</MenuItem> */}
                            <MenuItem key={new Date()} name={"Mr"} value={"Mr."}>Mr.</MenuItem>
                            <MenuItem key={new Date()} name={"Mr"} value={"Ms."}>Ms.</MenuItem>
                            <MenuItem key={new Date()} name={"Mr"} value={"Mrs."}>Mrs.</MenuItem>
                        </Select>
                    </FormControl>
                </td>
                    <td className="pl-3 ml-2 ">
                        <TextField
                            variant="outlined"
                            margin="none"
                            onChange={this.valueChangeHandler}
                            required
                            id={this.state.currentNumber}
                            label={"Stylist Name"}
                            name="sal-name"
                            autoComplete=""
                            className="col-12 w-100"
                        />

                    </td></tr>
                List.push(newStylist)
                this.setState({ List: List })
            })
        }



    }

    titleChangeHandler = (e) => {
        const value = e.target.value
        const id = e.target.name
        const titles = this.state.Titles

        titles[id - 1] = value
        this.setState({
            Titles : titles
        })


    }

    valueChangeHandler = (e) => {
        const id = e.target.id
        const value = e.target.value
        const stylists = this.state.Stylists
        stylists[id - 1] = value
        this.setState({ Stylists: stylists })
    }

    pageChangeHandler = () => {
        const mode = this.props.mode
        const progress = mode === 'User' ? 50 : 100 * 6 / 8
        this.props.changeProgress(progress)
        this.props.toggleLoading(false)
        this.props.nextScreen('SafetyFeatures')
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
        const stylists = this.state.Stylists
        //Counts
        !Validator.isPresent(this.state.Stylists) ? messages.push("Add Atleast One Stylist") : console.log()
        //Names
        for (var key in this.state.currentNumber) {
            console.log(stylists[key])
            if (!stylists[key]) {
                console.log("Not")
            }
            stylists[key] === null ? messages.push("Error: Empty Name of Stylist") : console.log()
        }

        if (this.state.Stylists.length > this.state.Titles.length) {
            messages.push("Select Title of Stylists")
        }

        for (var key in this.state.Stylists) {
            if (stylists[key] === "") {
                messages.push("Error: Empty Field")
            }
        }

        if (stylists.length < this.state.List.length) {
            messages.push("Error: Empty Field")
        }

        if (messages.length !== 0) {
            this.setState({ messages: messages, errors: true })
            return false
        }
        this.setState({ errors: false })
        return true

    }


    submitHandler = () => {
        console.log(this.state)
        if (this.validateData()) {
            this.props.toggleLoading(true)
            const stylists = this.state.Stylists
            const title = this.state.Titles
            const url = 'api/stylist/stylist_details/'
            // console.log(stylists)
            for (var i = 0; i < stylists.length; i++) {

                const data = {
                    "business": this.state.business_id,
                    "name": title[i]+" "+stylists[i]
                }
                console.log(data)
                Axios.post(url, data)
                    .then((res) => {
                        console.log(res)
                        if (i === stylists.length) {
                            this.pageChangeHandler()
                        }

                    })
                    .catch((e) => {
                        console.log(e.response)
                        this.props.toggleLoading(false)
                    })
            }
        }



    }



    render() {
        return (
            <div className="container" style={styles.screen}>
                <Heading text="Enter Stylists Details" />

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

                <div className="list" style={{ width: '100%', height: window.innerHeight / 3, overflowX: 'hidden' }}>
                    <table class="table table-borderless table-sm">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.List}
                        </tbody>
                    </table>
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
    business_id: state.business_id
})


export default connect(mapStateToProps, null)(StylistSelect)



