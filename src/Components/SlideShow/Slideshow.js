import React, { useEffect, useState } from 'react'
import Slide1 from '../../Assets/Slide-1.png'
import Slide2 from '../../Assets/Slide-2.png'
import Slide3 from '../../Assets/Slide-3.png'
import Slide4 from '../../Assets/Slide-4.png'
import Slide5 from '../../Assets/Slide-5.png'
import Eyebrows from '../../Assets/Category/Eyebrows.svg'
import Hair from '../../Assets/Category/Hair.svg'
import HairRemoval from '../../Assets/Category/Hair Removal.svg'
import Makeup from '../../Assets/Category/Makeup.svg'
import Massage from '../../Assets/Category/Massage.svg'
import Skin from '../../Assets/Category/Skin.svg'
import Spa from '../../Assets/Category/Spa.svg'
import Categories from '../Categories/Categories'
import { Avatar, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import Axios from '../../Axios'
import { withRouter } from 'react-router-dom'
import Colors from '../../Constants/Colors'
import Chip from '@material-ui/core/Chip';
import Heading from '../Heading/Heading'
import CategoryImage from '../CategoryImage/CategoryImage'

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


    const clickHandler = (id) => {
        if (id === "") {
            return true
        }
        console.log(id)
        props.history.push('/results/' + categories[id] + '/' + id)

    }



    return (
        <div className="mt-5">

            <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-ride="carousel" data-interval="4000" pause="false" wrap="true">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src={Slide5} style={styles.thumbpost_down} alt="First slide" />
                    </div>
                    <div className="carousel-item">
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
                ? <div>
                    <Heading text="Services To Choose From" />
                    <div className="container-fluid mt-2" style={{ overflowX: 'scroll' }}>
                        {/* <div className="row" style={{overflowX:'scroll'}}>
                        <CategoryImage image={Hair}/>
                        <CategoryImage image={Skin}/>
                        <CategoryImage image={Spa}/>
                        <CategoryImage image={Makeup}/>
                        <CategoryImage image={Eyebrows}/>
                        <CategoryImage image={HairRemoval}/>
                        <CategoryImage image={Massage}/>
                    </div> */}
                        <table className="table table-borderless" >
                            <tr >
                                <td><CategoryImage onClick={clickHandler} id="Hair" image={Hair} /></td>
                                <td><CategoryImage onClick={clickHandler} id="Skin" image={Skin} /></td>
                                <td><CategoryImage onClick={clickHandler} id="Spa" image={Spa} /></td>
                                <td><CategoryImage onClick={clickHandler} id="Makeup" image={Makeup} /></td>
                                <td><CategoryImage onClick={clickHandler} id="Eyebrows" image={Eyebrows} /></td>
                                <td><CategoryImage onClick={clickHandler} id="Hair Removal" image={HairRemoval} /></td>
                                <td><CategoryImage onClick={clickHandler} id="Massage" image={Massage} /></td>
                            </tr>
                        </table>
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
        objectFit: "cover",
        objectPosition: 'top',
        width: window.innerWidth,
        maxHeight: 450,
        position: 'sticky',
        overFlow: 'hidden',
        top: 1000
        // marginBottom: '1rem',
    },
    thumbpost_down: {
        objectFit: "cover",
        objectPosition: 'bottom',
        width: window.innerWidth,
        maxHeight: 450,
        position: 'sticky',
        overFlow: 'hidden',
        top: 1000
        // marginBottom: '1rem',
    },
    thumbpost_center: {
        objectFit: "cover",
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
    },
    slideshow: {
        marginTop: '0.3%'
    }

}


export default withRouter(Slideshow)



{/* <div className="mt-5">
<Heading text="Services To Choose From" />
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
{/* <div className="col-2" /> */ }
//     <button onClick={clickHandler} className="col-4 btn chip" style={styles.chip} id="Massage" >Massage</button>
//     <div className="col-1" />
// </div>

//</div> */}