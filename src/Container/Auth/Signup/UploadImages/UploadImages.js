import React, { Component } from 'react'
// import './BasicDetails.css'
import { Button } from '@material-ui/core'
import Colors from '../../../../Constants/Colors'
import { withRouter } from 'react-router-dom'




class UploadImages extends Component {

    state = {
        inputFields: [],
        images: []
    }

    componentDidMount() {
        const mode = this.props.match.params.mode
        let imageCount = 0
        if (mode === 'User') {
            imageCount = 1
        }
        else {
            imageCount = 5
        }
        const inputFields = this.state.inputFields
        for (var i = 0; i < imageCount; i++) {
            inputFields.push(<form key={i}>
                <div className="form-group">
                    {/* <label for="exampleFormControlFile1">Example file input</label> */}
                    <input type="file" className="form-control-file" onChange={this.imagePreviewHandler} />
                </div>
            </form>)
        }
        this.setState({ inputFields: inputFields })
    }

    imagePreviewHandler = (event) => {
        console.log(event.target.value)
        const images = this.state.inputFields
        images.push(event.target.value)
        this.setState({ inputFields: images })
    }

    valueChangeHandler = () => {

    }

    submitHandler = () => {
        this.props.toggleLoading(true)

        setTimeout(() => {
            const mode = this.props.mode
            const progress = mode === 'User' ? 50 : 100
            this.props.changeProgress(progress)
            this.props.toggleLoading(false)
            this.props.nextScreen('BasicInfo')
        }, 1000)
    }


    render() {
        return (
            <div className="container" style={styles.screen}>
                <div className="row">
                    {this.state.inputFields}
                </div>
                <div className="submitButton text-right">
                    <Button variant="contained" size="large" style={{ backgroundColor: Colors.success, color: 'white' }} onClick={this.submitHandler}>
                        Next
                    </Button>
                </div>
            </div>
        )
    }

}


const styles = {
    screen: {
        marginTop: 40
    }
}

export default withRouter(UploadImages)



