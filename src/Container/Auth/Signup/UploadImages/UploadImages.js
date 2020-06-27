import React, { Component } from 'react'
// import './BasicDetails.css'
import { Button } from '@material-ui/core'
import Colors from '../../../../Constants/Colors'
import { withRouter } from 'react-router-dom'
import ImageUploader from 'react-images-upload';
import Axios from '../../../../Axios'

import { connect } from 'react-redux'
import Heading from '../../../../Components/Heading/Heading';
import * as Validator from '../../../../Validator'
var FormData = require('form-data');



class UploadImages extends Component {

    state = {
        inputFields: [],
        Pictures: [],
        profile_image: null,
        Mode: '',
        business_id: null,
        user_id: null,
        messages: [],
        errors: false
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

    componentDidMount = () => {
        // console.log(this.props.mode)
        const mode = this.props.mode



        let imageCount = 0
        if (mode === 'User') {
            imageCount = 1
            this.setState({ user_id: this.props.user_id })
        }
        else {
            imageCount = 5
            this.setState({ business_id: this.props.business_id, user_id: this.props.user_id })
        }
        const inputFields = this.state.inputFields
        for (var i = 0; i < imageCount; i++) {
            inputFields.push(<form key={i}>
                <div class="form-group col-md">
                    {/* <ImageUploader
                        withIcon={false}
                        buttonText={'Select Image'}
                        onChange={this.valueChangeHandler}
                        singleImage={true}
                        withPreview={true}
                        withLabel={false}
                        // imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                        maxFileSize={5242880}
                    /> */}
                    <div class="row">
                        <label for="exampleFormControlFile1">{"Select Image"}</label>
                        <input type="file" class="form-control-file" id="exampleFormControlFile1" onChange={this.valueChangeHandler} />
                    </div>
                </div>
            </form>)
        }
        this.setState({ inputFields: inputFields, Mode: mode }, () => {
            // console.log(this.state)
        })
    }


    valueChangeHandler = (picture) => {
        console.log(picture.target.files[0])

        const pictures = this.state.Pictures
        pictures.push(picture.target.files[0])
        this.setState({ Pictures: pictures })

    }

    pageChangeHandler = () => {
        const mode = this.props.mode
        const progress = 100
        this.props.changeProgress(progress)
        this.props.toggleLoading(false)

        mode === 'User'
            ? this.props.history.push('/')
            : this.props.history.push('/admin/dashboard')


    }

    validateData = () => {

        const messages = []

        !Validator.isPresent(this.state.Pictures) ? messages.push("Add Atleast One Image") : console.log()

        if (messages.length !== 0) {
            this.setState({ messages: messages, errors: true })
            return false
        }
        this.setState({ errors: false })
        return true

    }
        
    submitHandler = () => {
        console.table(this.state.Pictures)
        let url = ''
        if (this.validateData()) {
            this.props.toggleLoading(true)
            if (this.state.Mode === 'Business') {
                url = 'api/images/business_image/'
                const pictures = this.state.Pictures
                // console.log(pictures[0])
                for (var i = 0; i < pictures.length; i++) {
                    
                    var data = new FormData();
                    data.append('blob_data', pictures[i],pictures[i].name);
                    data.append('business', this.state.business_id);
                    data.append('cover', i == 0 ? 'true' : 'false');
                    // const data = {
                    //     "blob_data": await toBase64(pictures[i]),
                    //     "business": this.state.business_id,
                    //     "cover": i == 0 ? 'true' : 'false',
                    // }
                    
                    Axios.post(url, data)
                        .then((res) => {
                            console.log(res)
                            this.props.toggleLoading(false)
                            if (i === pictures.length) {
                                // this.pageChangeHandler()
                            }

                        })
                        .catch((e) => {
                            console.log(e.response)
                            this.props.toggleLoading(false)
                        })
                }


            }
        }

    }


    render() {
        return (
            <div className="container" style={styles.screen}>
                <Heading text="Upload Salon Images" />
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

const mapStateToProps = (state) => ({
    user_id: state.user_id,
    business_id: state.business_id
})


export default connect(mapStateToProps, null)(withRouter(UploadImages))



