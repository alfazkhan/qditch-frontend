import React, { Component } from 'react'
import Axios from '../../../Axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import Heading from '../../../Components/Heading/Heading';
import { Button } from '@material-ui/core';
import Colors from '../../../Constants/Colors';

const styles = {
    coverImage: {
        border: "5px solid " + Colors.primary
    },
    Image: {
        border: "2px solid " + Colors.primary
    }
}


export class Images extends Component {

    state = {
        Loading: true,
        imageData: [],
        images: [],
        imageList: [],
        coverImage: null,
        coverImageID: null,
        errors: false,
        messages: []
    }

    componentDidMount() {
        this.setState({ imageData: this.props.data['business_images'] }, () => {
            const imageData = this.state.imageData
            const images = this.state.images
            if (imageData.length === 0) {
                this.setState({ Loading: false })
            }
            else {
                for (var key in imageData) {
                    Axios.get('api/images/business_image/' + imageData[key] + '/')
                        .then(res => {
                            // console.log(res.data)
                            images.push({
                                url: res.data.blob_data,
                                cover: res.data.cover,
                                id: res.data.id
                            })
                            this.setState({ images: images }, () => {
                                this.setTableValues()
                            })
                        })
                        .catch(e => {
                            console.log(e.response)
                        })
                }
            }
        })
    }

    deleteImageHandler = (e) => {
        // console.log(e.target.id)

        const id = e.target.id.split(':')[1]
        let url = 'api/images/business_image/' + id + '/'


        // eslint-disable-next-line no-restricted-globals
        let allow = confirm("Are you sure, you want to Delete this Image?")

        if (allow) {
            this.setState({
                Loading: true
            })
            Axios.delete(url)
                .then(res => {
                    console.log(res.data)
                    this.props.reload()
                    this.setState({
                        Loading: false
                    })
                })
                .catch(e => {
                    console.log(e.response)
                })
        }


    }


    changeCoverImageHandler = (e) => {
        // console.log(e.target.id)

        const id = e.target.id.split(':')[1]
        let url = 'api/images/change_cover_image/'

        const data = {
            "business_image_id": id
        }
        console.log(data)

        // eslint-disable-next-line no-restricted-globals
        let allow = confirm("Are you sure, you want to set this Image as Cover Image?")

        if (allow) {
            this.setState({
                Loading: true
            })
            Axios.post(url, data)
                .then(res => {
                    console.log(res.data)
                    this.props.reload()
                    this.setState({
                        Loading: false
                    })
                })
                .catch(e => {
                    console.log(e.response.data)
                })
        }


    }

    imageAddHandler = (e) => {
        this.setState({
            Loading: true
        })
        console.log(e.target.files[0])
        const url = 'api/images/business_image/'
        var data = new FormData();
        data.append('blob_data', e.target.files[0]);
        data.append('business', this.props.data['id']);
        data.append('cover', 'false');

        Axios.post(url, data)
            .then(res => {
                console.log(res.data)
                this.props.reload()
            })
            .catch(e => {
                console.log(e.response)
                this.props.reload()
            })

    }

    imageEditHandler = (e) => {
        console.log(e.target.id)
        const messages = []
        let url = 'api/images/business_image/' + e.target.id.split(':')[1] + '/'
        const data = new FormData()
        data.append("blob_data", e.target.files[0])
        data.append("business", this.props.data['id'])
        data.append("cover", e.target.id.split(':')[0] === "cover-image-edit" ? "true" : "false")
        if (e.target.files[0] && e.target.files[0].size > 5242880) {
            messages.push("Image Size should be Less than 5 MB")
            this.setState({
                errors: true,
                messages: messages
            })
            return true
        }

        const formats = ['image/jpg', 'image/gif', 'image/png', 'image/jpeg']

        if (!formats.includes(e.target.files[0].type)) {
            messages.push("Image Format should be .jpg,.gif,.png,.jpeg")
            this.setState({
                errors: true,
                messages: messages
            })
            return true
        }
        this.setState({
            Loading: true
        })

        Axios.patch(url, data)
            .then(res => {
                console.log(res.data)
                this.props.reload()
                this.setState({
                    Loading: false
                })
            })
            .catch(e => {
                console.log(e.response)
            })

    }

    setTableValues = () => {
        const imageList = []
        const images = this.state.images
        let coverImage = this.state.coverImage
        let coverImageID = this.state.coverImageID
        for (var key in images) {
            // console.log(images[key].id)
            if (images[key].cover) {
                coverImage = "https://" + images[key].url.split('//')[1]
                coverImageID = images[key].id
            }
            else {
                imageList.push(
                    <tr>
                        <td><img src={"https://" + images[key].url.split('//')[1]} width="auto" height={window.innerHeight / 12} style={styles.Image} /></td>
                        <td>
                            <label for={"image-edit:" + images[key].id}>
                                <div type="button" class="btn btn-primary btn-sm mt-4">Edit Image</div>
                            </label>
                            <input id={"image-edit:" + images[key].id} type="file" style={{ display: "none" }} onChange={this.imageEditHandler} />
                        </td>
                        <td ><button id={"delete-service:" + images[key].id} onClick={this.deleteImageHandler} type="button" class="btn btn-danger btn-sm mt-4">Delete</button> </td>
                        <td ><button id={"make-cover:" + images[key].id} onClick={this.changeCoverImageHandler} type="button" class="btn btn-success btn-sm mt-4">Make Cover Image</button> </td>
                    </tr>
                )
            }
        }
        this.setState({ Loading: false, imageList: imageList, coverImage: coverImage, coverImageID: coverImageID })
    }

    render() {
        return (
            <div className="container">
                <Heading text="Salon Images" />
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
                {this.state.Loading ? <CircularProgress /> :
                    <div style={{ overflowX: "scroll" }}>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Images</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.coverImage !== null
                                    ?
                                    <tr>
                                        <td><img src={this.state.coverImage} style={styles.coverImage} width="auto" height={window.innerHeight / 6} /></td>
                                        <td>
                                            <label for={"cover-image-edit:" + this.state.coverImageID}>
                                                <div type="button" class="btn btn-primary btn-sm mt-5">Edit Cover Image</div>
                                            </label>
                                            <input id={"cover-image-edit:" + this.state.coverImageID} type="file" style={{ display: "none" }} onChange={this.imageEditHandler} />
                                        </td>
                                    </tr>
                                    : null}
                                <tr><div className="my-5"></div></tr>
                                {this.state.imageList}
                            </tbody>
                        </table>
                    </div>
                }

                {this.state.imageList.length < 5
                    ?
                    <div>
                        <label for={"add-image"}>
                            <div type="button" class="btn btn-success btn-sm mt-5">Add Image</div>
                        </label>
                        <input type="file" id="add-image" style={{ display: "none" }} onChange={this.imageAddHandler} />
                    </div>
                    : null}

            </div>
        )
    }
}




export default Images
