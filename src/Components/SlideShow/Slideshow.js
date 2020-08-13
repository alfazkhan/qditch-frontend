import React, { useEffect, useState } from 'react'
import Slide1 from '../../Assets/Slide-1.png'
import Slide2 from '../../Assets/Slide-2.png'
import Slide3 from '../../Assets/Slide-3.png'
import Slide4 from '../../Assets/Slide-4.png'
import Slide5 from '../../Assets/Slide-5.png'
import Categories from '../Categories/Categories'
import { Avatar, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import Axios from '../../Axios'
import { withRouter } from 'react-router-dom'
import Colors from '../../Constants/Colors'
import Chip from '@material-ui/core/Chip';
import Heading from '../Heading/Heading'

const Slideshow = (props) => {

    const [categories, setCategories] = useState({})

    useEffect(() => {
        const data = categories
        Axios.get('api/category/categories/')
            .then(res => {
                for (var key in res.data) {
                    data[res.data[key].name] = res.data[key].id
                }
            })

        setCategories(data)

        console.log(data)


    }, [categories])


    const clickHandler = (e) => {
        if (e.target.id === "") {
            return true
        }
        console.log(e.target.id)
        props.history.push('/results/' + categories[e.target.id] + '/' + e.target.id)

    }



    return (
        <div>
            
            <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-ride="carousel" data-interval="3000" pause="false" wrap="true">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                    {/* <li data-target="#carouselExampleIndicators" data-slide-to="4"></li> */}
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src={Slide1} style={styles.thumbpost_up} alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={Slide2} style={styles.thumbpost_center} alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={Slide3} style={styles.thumbpost_center} alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={Slide4} style={styles.thumbpost_center} alt="First slide" />
                    </div>
                    {/* <div className="carousel-item">
                        <img className="d-block w-100" src={Slide5} style={styles.thumbpost_center} alt="First slide" />
                    </div> */}


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

            {window.innerWidth <= 1000
                ?
                <div className="mt-5">
                    <Heading text="We Provide" />
                    < div className="row mx-auto my-3">
                        <div className="col-1" />
                        <button onClick={clickHandler} className="col-4 btn chip" style={styles.chip} id="Hair">Hair</button>
                        <div className="col-2" />
                        <button onClick={clickHandler} className="col-4 btn chip" style={styles.chip} id="Skin">Skin</button>
                        <div className="col-1" />
                    </div>
                    < div className="row mx-auto my-3">
                        <div className="col-1" />
                        <button onClick={clickHandler} className="col-4 btn chip" style={styles.chip} id="Spa">Spa</button>
                        <div className="col-2" />
                        <button onClick={clickHandler} className="col-4 btn chip" style={styles.chip} id="Makeup">Makeup</button>
                        <div className="col-1" />
                    </div>
                    < div className="row mx-auto my-3">
                        <div className="col-1" />
                        <button onClick={clickHandler} className="col-4 btn chip" style={styles.chip} id="Eyebrows">Eyebrows</button>
                        <div className="col-2" />
                        <button onClick={clickHandler} className="col-4 btn chip" style={styles.chip} id="Hair Removal">Hair Removal</button>
                        <div className="col-1" />
                    </div>
                    < div className="row mx-auto my-3">
                        <div className="col-1" />
                        {/* <button onClick={clickHandler} className="col-4 btn chip" style={styles.chip} id="Nails">Nails</button> */}
                        {/* <div className="col-2" /> */}
                        <button onClick={clickHandler} className="col-4 btn chip" style={styles.chip} id="Massage" >Massage</button>
                        <div className="col-1" />
                    </div>

                </div>
                : null}

            <div>


            </div>
        </div >
    )
}

const styles = {
    thumbpost_up: {
        objectFit: 'cover',
        objectPosition: 'top',
        width: window.innerWidth,
        maxHeight: 450,
        position: 'sticky',
        overFlow: 'hidden',
        top: 1000
        // marginBottom: '1rem',
    },
    thumbpost_down: {
        objectFit: 'cover',
        objectPosition: 'bottom',
        width: window.innerWidth,
        maxHeight: 450,
        position: 'sticky',
        overFlow: 'hidden',
        top: 1000
        // marginBottom: '1rem',
    },
    thumbpost_center: {
        objectFit: 'cover',
        objectPosition: 'center',
        width: window.innerWidth,
        maxHeight: 450,
        position: 'sticky',
        overFlow: 'hidden',
        top: 1000
        // marginBottom: '1rem',
    },
    chip: {
        color: 'white',
        borderRadius: '5px',
        height: 40,
        backgroundColor: Colors.buttonColor
    }

}


export default withRouter(Slideshow)
