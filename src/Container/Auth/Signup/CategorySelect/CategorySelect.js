import React, { Component } from 'react'
import './CategorySelect.css'
import { Button, FormControlLabel, Checkbox, FormControl, InputLabel, Select,MenuItem } from '@material-ui/core'
import Colors from '../../../../Constants/Colors'

import { FixedSizeList } from 'react-window';



class CategorySelect extends Component {

    state = {
        CategoryList: [
            'Hair', 'Skin', 'Spa', 'Makeup', 'Eyebrows', 'Hair Removal', 'Nails', 'Massage'
        ],
        List: []
    }

    componentDidMount() {
        //getCategories from server
        const Categories = this.state.CategoryList
        const List = []
        for (var i = 0; i < Categories.length; i++) {
            List.push(<div className="row ml-5">

                <FormControlLabel
                    value={i}
                    control={<Checkbox color="primary" />}
                    label={Categories[i]}
                    labelPlacement="end"
                    
                />
            </div>)
        }
        console.log(List)
        this.setState({ List: List })
    }

    valueChangeHandler = () => {

    }

    submitHandler = () => {
        this.props.toggleLoading(true)

        setTimeout(() => {
            const mode = this.props.mode
            const progress = mode === 'User' ? 50 : 100*4/8
            this.props.changeProgress(progress)
            this.props.toggleLoading(false)
            this.props.nextScreen('ServiceSelect')
        }, 1000)
    }


    render() {
        return (
            <div className="container" style={styles.screen}>
                <div class="list" style={{ width: '100%', height: window.innerHeight / 3,overflowX:'hidden' }}>
                    {this.state.List}
                </div>
                <div className="mt-4">
                <FormControl variant="outlined" className="col-md">
                        <InputLabel>Main Category</InputLabel>
                        <Select
                            // value={age}
                            // onChange={handleChange}
                            label="Age"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'Male'}>Male</MenuItem>
                            <MenuItem value={'Female'}>Female</MenuItem>
                            <MenuItem value={'Unisex'}>Unisex</MenuItem>
                        </Select>
                    </FormControl>
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



