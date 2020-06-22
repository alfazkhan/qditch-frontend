import React, { Component } from 'react'
// import './BasicDetails.css'
import { Button } from '@material-ui/core'
import Colors from '../../../../Constants/Colors'
import { withRouter } from 'react-router-dom'
import ImageUploader from 'react-images-upload';

import Axios from '../../../../Axios'


class UploadImages extends Component {

    state = {
        inputFields: [],
        Pictures:[]
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
                    <ImageUploader
                        withIcon={false}
                        withPreview={true}
                        buttonText='Choose Image'
                        onChange={this.valueChangeHandler}
                        imgExtension={['.jpg', '.gif', '.png', '.gif','.jpeg']}
                        maxFileSize={5242880}
                        withLabel={false}
                        className="col-md"
                        singleImage={true}
                    />
                </div>
            </form>)
        }
        this.setState({ inputFields: inputFields })
    }


    valueChangeHandler = (picture) => {
        const pictures = this.state.Pictures
        pictures.concat(picture)
        this.setState({Pictures:pictures});
    }

    submitHandler = () => {
        console.table(this.state.Pictures)

        this.props.toggleLoading(true)
        Axios.post('/images/business_image/',{
            "business": "2",
            "cover": "false",
            "blob_data": this.state.Pictures[0]
        })
        .then((res)=>{
            console.log(res)
            this.props.toggleLoading(false)

        })
        .catch((e)=>{
            console.log(e)
            this.props.toggleLoading(false)
        })
        // setTimeout(() => {
        //     const mode = this.props.mode
        //     const progress = mode === 'User' ? 50 : 100
        //     this.props.changeProgress(progress)
        //     this.props.toggleLoading(false)
        //     this.props.nextScreen('BasicInfo')
        // }, 1000)
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



