import React, { useEffect, useState, Component } from 'react'
import Axios from '../../../Axios'
import Colors from '../../../Constants/Colors'


class BusinessSlideshow extends Component {

    state = {
        images: []
    }
    componentDidMount() {
        const imageData = this.props.images
        const imagesURL = this.state.images
        var promise = []
        for (var key in imageData) {
            promise[key] = Axios.get('api/images/business_image/' + imageData[key] + '/')
                .then(res => {
                    const image = "https://" + res.data.blob_data.split('//')[1]
                    imagesURL.push(image)
                })
                .catch(e => {
                    console.log(e.response)
                })
        }

        Promise.allSettled(promise)
            .then(res => {
                this.setState({images:imagesURL})
            })


    }


    render() {
        return (
            <div style={styles.border} >
                <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-ride="carousel" data-interval="5000" pause="false" wrap="true">
                <ol className="carousel-indicators">
                    {/* <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li> */}
                    {this.state.images.map((url, index) => (
                        <li data-target="#carouselExampleIndicators" data-slide-to={index} className={index===0?"active":""}  ></li>
                    ))}
                </ol>
                <div className="carousel-inner">
                    {this.state.images.map((url, index) => {
                      return  <div className={index===0?"carousel-item active":"carousel-item"}>
                            <img className="d-block w-100" src={url} style={styles.thumbpost_center} alt="First slide" />
                        </div>
                    })}
                </div>
            </div>
            </div>
        )
    }
}

const styles = {
    thumbpost_center: {
        objectFit: 'cover',
        objectPosition: 'center',
        width: window.innerWidth,
        maxHeight: 400,
        position: 'sticky',
        overFlow: 'hidden',
        top: 1000
        // marginBottom: '1rem',
    },
    border:{
        border:"4px solid "+ Colors.primary
    }

}


export default BusinessSlideshow
