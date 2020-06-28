import React, { Component } from 'react'
import Axios from '../../../Axios'
import CircularProgress from '@material-ui/core/CircularProgress';

export class Images extends Component {

    state = {
        Loading: true,
        imageData: [],
        images: [],
        imageList: [],
        coverImage: null
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
                            console.log(res.data)
                            images.push({
                                url: res.data.blob_data,
                                cover: res.data.cover
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

    setTableValues = () => {
        const imageList = []
        const images = this.state.images
        let coverImage = this.state.coverImage
        for (var key in images) {
            if (images[key].cover) {
                coverImage = "https://" + images[key].url.split('//')[1]
            }
            else {
                imageList.push(
                    <tr>
                        <td><img src={"https://" + images[key].url.split('//')[1]} width={100} height={100} /></td>
                    </tr>
                )
            }
        }
        this.setState({ Loading: false, imageList: imageList, coverImage:coverImage })
    }

    render() {
        return (
            <div className="container">
                {this.state.Loading ? <CircularProgress /> :
                    <table class="table table-borderless table-sm">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><img src={this.state.coverImage} width={500} height={500} /></td>
                                <td>{this.state.imageList}</td>
                            </tr>
                            
                        </tbody>
                    </table>
                }
            </div>
        )
    }
}

export default Images
