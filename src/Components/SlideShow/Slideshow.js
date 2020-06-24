import React from 'react'
import Slide1 from '../../Assets/Slide-1.png'
import Slide2 from '../../Assets/Slide-2.png'
import Slide3 from '../../Assets/Slide-3.png'
import Slide4 from '../../Assets/Slide-4.png'

const Slideshow = () => {



    return (
        <div>
            <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-ride="carousel" data-interval="3000" pause="false" wrap="false">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src={Slide1} style={styles.thumbpost} alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={Slide2} style={styles.thumbpost} alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={Slide3} style={styles.thumbpost} alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={Slide4} style={styles.thumbpost} alt="First slide" />
                        </div>
                        
                    </div>
                    {/* <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a> */}
                </div>
        </div>
    )
}

const styles = {
    thumbpost: {
        objectFit: 'cover',
        objectPosition: 'top',
        width: window.innerWidth,
        maxHeight: 550,
        position: 'sticky',
        overFlow: 'hidden',
        top: 1000
        // marginBottom: '1rem',
    }
}


export default Slideshow
