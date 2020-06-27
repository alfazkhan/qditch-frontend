import { Button, Checkbox, FormControlLabel, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from '../../../../Axios'
import Colors from '../../../../Constants/Colors'
import './CategorySelect.css'
import Heading from '../../../../Components/Heading/Heading'
import * as Validator from '../../../../Validator'


class CategorySelect extends Component {

    state = {
        CategoryList: [],
        List: [],
        categoryIDs: [],
        selectedCategoryList: [],
        selectedCategory: [],
        values: [],
        mainCategory: false,
        business_id: null,
        messages: [],
        errors: false
    }

    componentDidMount() {
        //getCategories from server
        this.setState({ business_id: this.props.business_id })
        Axios.get('api/category/categories/')
            .then(res => {
                const data = res.data
                console.log(data)
                const CatList = this.state.CategoryList
                const checkValues = this.state.values
                const ids = this.state.categoryIDs
                for (var key in data) {
                    checkValues.push(false)
                    ids.push(data[key].id)
                    CatList.push(data[key].name)
                }
                this.setState({ CategoryList: CatList, values: checkValues, categoryIDs: ids }, () => {
                    this.initialValuesHandler();
                })
                this.props.toggleLoading(false)

            })
            .catch((e) => {
                console.log(e)
            })
    }

    initialValuesHandler = () => {
        const Categories = this.state.CategoryList
        const selectedCategoryList = this.state.selectedCategoryList
        const values = this.state.values
        const List = []
        const newCatList = []
        for (var i = 0; i < Categories.length; i++) {
            List.push(<div key={Categories[i]} className="row ml-5">

                <FormControlLabel
                    value={i}
                    control={<Checkbox color="primary" checked={this.state.values[i]} />}
                    label={Categories[i]}
                    labelPlacement="end"
                    index={i}
                    onChange={this.valueChangeHandler}
                />
            </div>)
            if (values[i] === true) {
                newCatList.push(<MenuItem key={Categories[i]} value={Categories[i]}>{Categories[i]}</MenuItem>)
            }
        }

        this.setState({ List: List, selectedCategoryList: newCatList })
    }

    valueChangeHandler = (event) => {
        const id = event.target.value
        const Values = this.state.values
        Values[id] = !Values[id]

        const selectedCategories = this.state.selectedCategory
        selectedCategories.push(this.state.CategoryList[id])
        // console.log(selectedCategories)
        this.setState({ values: Values, selectedCategories: selectedCategories },
            () => {
                this.initialValuesHandler()
            })
    }

    mainCategoryChange = (e) => {
        // this.initialValuesHandler()
        // const mainCat = document.getElementById("mainCatSelect")
        console.log(e.target.value)
        this.setState({ mainCategory: e.target.value })
    }

    changePageHandler = () => {
        this.props.toggleLoading(false)
        const progress = 100 * 4 / 8
        this.props.changeProgress(progress)
        this.props.nextScreen('ServiceSelect')
    }



    validateData = () => {
        // const values = this.state.values
        const messages = []


        //Main Category
        !this.state.mainCategory ? messages.push("Select Main Category") : console.log()
        //Category
        !Validator.isPresent(this.state.selectedCategory)? messages.push("Select Atleast 1 Category") : console.log()
        


        if (messages.length !== 0) {
            this.setState({ messages: messages, errors: true })
            return false
        }
        this.setState({ errors: false })
        return true

    }


    submitHandler = () => {

        if (this.validateData()) {
            this.props.toggleLoading(true)
            console.log(this.state)
            const url = 'api/category/business_categories/'
            const catList = this.state.CategoryList
            const values = this.state.values
            const superCat = this.state.mainCategory
            for (var i = 0; i < catList.length; i++) {
                if (values[i]) {
                    const data = {
                        "business": this.state.business_id,
                        "category": this.state.categoryIDs[i],
                        "super_category": catList[i] === superCat ? "true" : "false"
                    }
                    Axios.post(url, data)
                        .then((response) => {
                            this.setState({ success: true })
                            console.log(JSON.stringify(response.data));
                            // this.props.onResponseRecieve(response.data.id)
                            if (i === catList.length) {
                                this.changePageHandler()
                            }

                        })
                        .catch((error) => {
                            this.props.toggleLoading(false)
                            console.log(error.response);
                        });

                }
            }
        }


    }


    render() {
        return (
            <div className="container" style={styles.screen}>
                <Heading text="Select Categories" />

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

                <div className="" style={{ width: '100%', height: window.innerHeight / 3, overflowY: 'scroll', overflowX: 'hidden' }}>
                    {this.state.List}
                </div>
                <div className="row" >
                    <div className="col-md form-group mt-5">
                        <InputLabel id="demo-simple-select-label">Main Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="main_category"
                            value={this.state.mainCategory ? this.state.mainCategory : 'None'}
                            onChange={this.mainCategoryChange}
                            placeholder="None"
                            style={{ width: '100%' }}
                        >
                            <MenuItem key={'placeholder'} disabled>None</MenuItem>
                            {this.state.selectedCategoryList}
                        </Select>
                    </div>
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


export default connect(mapStateToProps, null)(CategorySelect)



