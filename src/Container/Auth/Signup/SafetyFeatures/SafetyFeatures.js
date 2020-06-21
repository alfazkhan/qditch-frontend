import React, { Component } from 'react'
import './SafetyFeatures.css'
import { Button, FormControlLabel, Checkbox} from '@material-ui/core'
import Colors from '../../../../Constants/Colors'
import SafetyFeaturesList from '../../../../Constants/SafetyFeaturesList'



class SafetyFeatures extends Component {

    state = {
        CategoryList: {...SafetyFeaturesList},
        List: []
    }

    componentDidMount() {
        //getCategories from server
        const Categories = this.state.CategoryList
        const List = []
        for (var key in Categories) {
            List.push(<div className="row ml-5">

                <FormControlLabel
                    key={key}
                    value={key}
                    control={<Checkbox color="primary" />}
                    label={Categories[key]}
                    labelPlacement="end"
                    
                />
            </div>)
        }
        this.setState({ List: List })
    }

    valueChangeHandler = () => {

    }

    submitHandler = () => {
        this.props.toggleLoading(true)

        setTimeout(() => {
            const mode = this.props.mode
            const progress = mode === 'User' ? 50 : 100*7/8
            this.props.changeProgress(progress)
            this.props.toggleLoading(false)
            this.props.nextScreen('UploadImages')
        }, 1000)
    }


    render() {
        return (
            <div className="container" style={styles.screen}>
                <div class="list text-left" style={{ width: '100%', height: window.innerHeight / 2,overflowX:'hidden' }}>
                    {this.state.List}
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

export default SafetyFeatures



