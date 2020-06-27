import React, { Component } from 'react'
import Axios from '../../../Axios'
import CircularProgress from '@material-ui/core/CircularProgress';

export class Images extends Component {

    state = {
        Loading: true,
        imageData: [],
        images: [],
        imageList: []
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
        for (var key in images) {
            console.log(images[key].url.split('//')[1])
            imageList.push(
                <tr>
                    <th scope="row">{parseInt(key) + 1}</th>
                    <td>{images[key].cover.toString().toUpperCase()}</td>
                    <td><img src={"https://"+images[key].url.split('//')[1]} width="100" height="100" /></td>
                </tr>
            )
        }
        this.setState({ Loading: false, imageList: imageList })
    }

    render() {
        return (
            <div>
                {this.state.Loading ? <CircularProgress /> :
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Cover</th>
                                <th scope="col">Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.imageList}
                        </tbody>
                    </table>
                }
            </div>
        )
    }
}

export default Images
