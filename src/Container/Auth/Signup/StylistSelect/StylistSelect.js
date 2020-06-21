import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core'
// import './CategorySelect.css'
import Colors from '../../../../Constants/Colors'




class StylistSelect extends Component {

    state = {
        ServiceList: [
            'Hair', 'Skin', 'Spa', 'Makeup', 'Eyebrows', 'Hair Removal', 'Nails', 'Massage'
        ],
        List: [],
        show:true,
    }

    componentDidMount() {
        //getServices from server
        this.addNewStylistField()
    }

    addNewStylistField=()=>{
        const List = this.state.List

        const newStylist = <div className="row mt-3">
            <TextField
                variant="outlined"
                // margin="normal"
                required
                id="sal-name"
                label={"Stylist Name"}
                name="sal-name"
                autoComplete=""
                className="col ml-5 mr-5"
            />
            
        </div>
        List.push(newStylist)
        this.setState({ List: List })

    }

    valueChangeHandler = () => {

    }

    submitHandler = () => {
        this.props.toggleLoading(true)

        setTimeout(() => {
            const mode = this.props.mode
            const progress = mode === 'User' ? 50 : 100*6/8
            this.props.changeProgress(progress)
            this.props.toggleLoading(false)
            this.props.nextScreen('SafetyFeatures')
        }, 1000)
    }



    render() {
        return (
            <div className="container" style={styles.screen}>
                <div className="list" style={{ width: '100%', height: window.innerHeight / 3 , overflowX:'hidden'}}>
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

export default StylistSelect



