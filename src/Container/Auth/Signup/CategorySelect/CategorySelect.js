import React, { Component } from 'react'
import './CategorySelect.css'
import { Button, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import Colors from '../../../../Constants/Colors'

import Axios from '../../../../Axios'


class CategorySelect extends Component {

    state = {
        CategoryList: [],
        List: [],
        selectedCategoryList: [],
        selectedCategory: [],
        values: [],
        mainCategory: 'None'
    }

    componentDidMount() {
        //getCategories from server
        Axios.get('/category/categories')
            .then(res => {
                const data = res.data
                const CatList = this.state.CategoryList
                const checkValues = this.state.values
                for (var key in data) {
                    checkValues.push(false)
                    CatList.push(data[key].name)
                }
                this.setState({ CategoryList: CatList }, () => {
                    this.initialValuesHandler();
                })
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
                // newCatList.push(<option key={Categories[i]} onSelect={() => this.mainCategoryChange(Categories[i])} name={Categories[i]} value={values[i]}>{Categories[i]}</option>)
                newCatList.push(<MenuItem  key={Categories[i]} value={Categories[i]}>{Categories[i]}</MenuItem>)
            }
        }

        this.setState({ List: List, selectedCategoryList: newCatList })
    }

    valueChangeHandler = (event) => {
        const id = event.target.value
        const Values = this.state.values
        Values[id] = !Values[id]

        const selectedCategories = this.state.selectedCategory
        console.log(this.state.CategoryList[id])

        this.setState({ values: Values },
            () => {
                this.initialValuesHandler()
            })
    }

    mainCategoryChange = (e) => {
        // this.initialValuesHandler()
        // const mainCat = document.getElementById("mainCatSelect")
        console.log(e.target.value)
        this.setState({mainCategory:e.target.value})
    }

    submitHandler = () => {
        // this.props.toggleLoading(true)
        console.log(this.state)

        // setTimeout(() => {
        //     const mode = this.props.mode
        //     const progress = mode === 'User' ? 50 : 100 * 4 / 8
        //     this.props.changeProgress(progress)
        //     this.props.toggleLoading(false)
        //     this.props.nextScreen('ServiceSelect')
        // }, 1000)
    }


    render() {
        return (
            <div className="container" style={styles.screen}>
                <div className="list" style={{ width: '100%', height: window.innerHeight / 3, overflowX: 'hidden' }}>
                    {this.state.List}
                </div>
                <div className="mt-4">
                    <div className="col-md form-group">
                        <label>Main Category</label>
                        <Select
                            labelId="demo-simple-select-label"
                            id="main_category"
                            value={this.state.mainCategory}
                            onChange={this.mainCategoryChange}
                        >
                            {/* <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem> */}
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

export default CategorySelect



