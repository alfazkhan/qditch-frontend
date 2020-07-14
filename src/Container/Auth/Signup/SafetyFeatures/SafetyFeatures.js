import React, { Component } from 'react'
import './SafetyFeatures.css'
import { Button, FormControlLabel, Checkbox } from '@material-ui/core'
import Colors from '../../../../Constants/Colors'
import Axios from '../../../../Axios'
import { connect } from 'react-redux'
import Heading from '../../../../Components/Heading/Heading'
var FormData = require('form-data');



class SafetyFeatures extends Component {

    state = {
        SafetyFeatures: {},
        List: [],
        SelectedFeatures: [],
        business_id: this.props.business_id,

        defaultSelected: []
    }

    componentDidMount() {
        let promise = []
        promise[0] = Axios.get('api/users/business/' + this.state.business_id + '/')
            .then(res => {
                // console.log(res.data.business_safety_features)
                const selected = this.makeValuesInt(res.data.business_safety_features)
                this.setState({
                    defaultSelected: selected,
                    SelectedFeatures: selected
                })
            })

        //getCategories from server
        this.setState({ business_id: this.props.business_id })
        Axios.get('api/safety_feature/safety_features/')
            .then(res => {
                let saf_fec = this.setState.SafetyFeatures
                saf_fec = { ...res.data }
                // console.table(saf_fec)
                this.setState({ SafetyFeatures: saf_fec }, () => {
                    Promise.all(promise)
                        .then(res => {
                            this.initialValuesHandler()
                        })
                })
            })
    }

    makeValuesInt = (array) => {
        for (var key in array) {
            array[key] = parseInt(array[key])
        }
        return array
    }

    initialValuesHandler = () => {
        const safetyFeatures = this.state.SafetyFeatures
        const List = []
        for (var key in safetyFeatures) {
            List.push(<div className="row ml-5">

                <FormControlLabel
                    key={key}
                    value={key}
                    control={<Checkbox
                        defaultChecked={this.state.defaultSelected.indexOf(safetyFeatures[key].id) !== -1}
                        color="primary" />}
                    label={safetyFeatures[key].safety_feature}
                    labelPlacement="end"
                    onChange={this.valueChangeHandler}

                />
            </div>)
        }
        this.setState({ List: List })
    }

    checkSimilar = (json, element) => {
        const values = Object.values(json)
        // console.log(element)
        if (values.indexOf(element) !== -1) {
            return true
        } else {
            return false
        }
    }

    valueChangeHandler = (e) => {
        console.log(e.target.value)
        const id = e.target.value
        var selectedFeatures = this.state.SelectedFeatures
        const features_list = this.state.SafetyFeatures
        if (!this.checkSimilar(selectedFeatures, features_list[id].id)) {
            selectedFeatures.push(features_list[id].id)
        }
        else {
            const index = selectedFeatures.indexOf(features_list[id].id);
            if (index > -1) {
                selectedFeatures.splice(index, 1);
            }
        }
        this.setState({ SelectedFeatures: selectedFeatures })
    }

    pageChangeHandler = () => {
        const mode = this.props.mode
        const progress = 100 * 7 / 8
        this.props.changeProgress(progress)
        this.props.toggleLoading(false)
        this.props.nextScreen('UploadImages')
    }

    submitHandler = () => {
        const selected = this.state.SelectedFeatures
        console.log(selected)
        const url = 'api/safety_feature/business_safety_features/'

        console.log(selected)
        if (this.props.action === "Edit") {
            const data = {
                "business": this.state.business_id,
                safety_features: selected
            }
            Axios.post('api/safety_feature/change_safety_features/', data)
                .then((res) => {
                    // console.log(res)
                    this.props.reload()

                })
                .catch((e) => {
                    console.log(e.response.data)
                })
        } else {
            this.props.toggleLoading(true)
            for (var i = 0; i < selected.length; i++) {
                const data = {
                    "business": this.state.business_id,
                    safety_features: selected[i]
                }

                Axios.post(url, data)
                    .then((res) => {
                        console.log(res)
                        this.props.toggleLoading(false)
                        if (i === selected.length) {
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
                <Heading text={this.props.action === "Edit" ? "Edit Safety Features" : "Safety Features"} />

                <div class="text-left" style={{ width: '100%', height: window.innerHeight / 2, overflowX: 'hidden' }}>
                    {this.state.List}
                </div>
                <div className="submitButton text-center">
                    <Button variant="contained" size="large" style={{ backgroundColor: Colors.success, color: 'white' }} onClick={this.submitHandler}>
                        {this.props.action === "Edit" ? "Save" : "Next"}
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


export default connect(mapStateToProps, null)(SafetyFeatures)



