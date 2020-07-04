import React,{useEffect,useState} from 'react'
import Slide1 from '../../Assets/Slide-1.png'
import Slide2 from '../../Assets/Slide-2.png'
import Slide3 from '../../Assets/Slide-3.png'
import Slide4 from '../../Assets/Slide-4.png'
import Categories from '../Categories/Categories'
import { Avatar, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import Axios from '../../Axios'
import { withRouter } from 'react-router-dom'
import Colors from '../../Constants/Colors'


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
        props.history.push('/results/' + categories[e.target.id] + '/' + e.target.id)

    }

    return (
        <div>
            <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-ride="carousel" data-interval="5000" pause="false" wrap="true">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
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
                    {window.innerWidth > 1000
                        ? <div class="carousel-caption d-none d-md-block" style={{ top: 300 }}>
                            <Categories />
                        </div>
                        : null}

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
                ? <div className='row text-center mx-1 my-3' style={{backgroundColor: '#fff'}}>
                    <FormControl variant="filled" className={"text-center"} style={{ width: '100%' }} >
                        <InputLabel className="text-center" >Search By Category</InputLabel>
                        <Select
                            fullWidth
                            value={""}
                            className="text-center"
                            inputProps={{
                                name: 'age',
                                id: 'filled-age-native-simple',
                            }}
                            style={{color:'#fff'}}
                        >
                            <MenuItem id="Hair" onClick={clickHandler}>Hair</MenuItem>
                            <MenuItem id="Skin" onClick={clickHandler}>Skin</MenuItem>
                            <MenuItem id="Spa" onClick={clickHandler}>Spa</MenuItem>
                            <MenuItem id="Makeup" onClick={clickHandler}>Makeup</MenuItem>
                            <MenuItem id="Eyebrows" onClick={clickHandler}>Eyebrows</MenuItem>
                            <MenuItem id="Hair Removal" onClick={clickHandler}>Hair Removal</MenuItem>
                            <MenuItem id="Nails" onClick={clickHandler}>Nails</MenuItem>
                            <MenuItem id="Massage" onClick={clickHandler}>Massage</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                : null}

            <div>


            </div>
        </div>
    )
}

const styles = {
    thumbpost_up: {
        objectFit: 'cover',
        objectPosition: 'top',
        width: window.innerWidth,
        maxHeight: 550,
        position: 'sticky',
        overFlow: 'hidden',
        top: 1000
        // marginBottom: '1rem',
    },
    thumbpost_down: {
        objectFit: 'cover',
        objectPosition: 'bottom',
        width: window.innerWidth,
        maxHeight: 550,
        position: 'sticky',
        overFlow: 'hidden',
        top: 1000
        // marginBottom: '1rem',
    },
    thumbpost_center: {
        objectFit: 'cover',
        objectPosition: 'center',
        width: window.innerWidth,
        maxHeight: 550,
        position: 'sticky',
        overFlow: 'hidden',
        top: 1000
        // marginBottom: '1rem',
    },

}


export default withRouter(Slideshow)
