import React, { Component } from 'react'
// import './BasicDetails.css'
import { Button } from '@material-ui/core'
import Colors from '../../../../Constants/Colors'
import { withRouter } from 'react-router-dom'
import ImageUploader from 'react-images-upload';
import Axios from '../../../../Axios'
import { connect } from 'react-redux'

var FormData = require('form-data');



class UploadImages extends Component {

    state = {
        inputFields: [],
        Pictures: [],
        profile_image: null,
        Mode: '',
        business_id: null,
        user_id: null
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
                <div class="form-group">
                    <ImageUploader
                        withIcon={false}
                        buttonText={'Select Image'}
                        onChange={this.valueChangeHandler}
                        singleImage={true}
                        withPreview={true}
                        withLabel={false}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                    />
                </div>
            </form>)
        }
        this.setState({ inputFields: inputFields, Mode: mode }, () => {
            console.log(this.state)
        })
    }


    valueChangeHandler = (picture) => {
        // console.log(picture[0])
        if (this.state.Mode === 'Business') {
            const pictures = this.state.Pictures
            pictures.push(picture[0])
            this.setState({ Pictures: pictures })
        } else {
            const pro_picture = picture[0]
            this.setState({ profile_image: pro_picture });
        }
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

    submitHandler = () => {
        // console.table(this.state.Pictures)
        let url = ''
        this.props.toggleLoading(true)
        if (this.state.Mode === 'Business') {
            url = 'api/images/business_image/'
            const pictures = this.state.Pictures
            console.log(pictures[0])
            for (var i = 0; i < pictures.length; i++) {
                var data = new FormData();
                data.append('blob_data', pictures[i]);
                data.append('business', this.state.business_id);
                data.append('cover', i == 0 ? 'true' : 'false');
                Axios.post(url, data)
                    .then((res) => {
                        console.log(res)
                        this.props.toggleLoading(false)
                        if (i === pictures.length) {
                            this.pageChangeHandler()
                        }

                    })
                    .catch((e) => {
                        console.log(e.response.data)
                        this.props.toggleLoading(false)
                    })
            }

            // } else if (this.state.Mode) {
            //     url = '/images/profile_image/'
            //     var data = new FormData();
            //     data.append('blob_data', this.state.profile_image);
            //     data.append('user', this.props.user_id);
            //     data.append('cover', 'false');
            //     Axios.post(url, data)
            //         .then((res) => {
            //             console.log(res)
            //             this.props.toggleLoading(false)
            //             this.pageChangeHandler()
            //         })
            //         .catch((e) => {
            //             console.log(e.response.data)
            //             this.props.toggleLoading(false)
            //         })
            // }


        }
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

const mapStateToProps = (state) => ({
    user_id: state.user_id,
    business_id: state.business_id
})


export default connect(mapStateToProps, null)(withRouter(UploadImages))



