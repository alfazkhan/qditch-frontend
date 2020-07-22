import React, { useEffect, useState } from 'react'
import { Avatar, FormControl, InputLabel, Select } from '@material-ui/core'
import Axios from '../../Axios'
import { withRouter, Link } from 'react-router-dom'
import './Categories.css'
import Colors from '../../Constants/Colors'

const Categories = (props) => {

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
        <div className="container-fluid mx-auto" style={{ backgroundColor: Colors.primary }}>
            <div className="row">
                <div className="col mb-1" onClick={clickHandler} >
                    <Link  className="navbar-link text-bold" id="Hair" style={styles.Avatar}>Hair</Link>
                </div>
                <div className="col mb-1" onClick={clickHandler} >
                    <Link  className="navbar-link text-bold" id="Skin" style={styles.Avatar}>Skin</Link>
                </div>
                <div className="col mb-1" onClick={clickHandler} >
                    <Link  className="navbar-link text-bold" id="Spa" style={styles.Avatar}>Spa</Link>
                </div>
                <div className="col mb-1" onClick={clickHandler} >
                    <Link  className="navbar-link text-bold" id="Makeup" style={styles.Avatar}>Makeup</Link>
                </div>
                <div className="col mb-1" onClick={clickHandler} >
                    <Link  className="navbar-link text-bold" id="Eyebrows" style={styles.Avatar}>Eyebrows</Link>
                </div>
                <div className="col mb-1" onClick={clickHandler} >
                    <Link  className="navbar-link text-bold" id="Hair Removal" style={styles.Avatar}>Hair Removal</Link>
                </div>
                {/* <div className="col mb-1" onClick={clickHandler} >
                    <Link  className="navbar-link text-bold" id="Nails" style={styles.Avatar}>Nails</Link>
                </div> */}
                <div className="col mb-1" onClick={clickHandler} >
                    <Link  className="navbar-link text-bold" id="Massage" style={styles.Avatar}>Massage</Link>
                </div>
            </div>
           


        </div>
    )
}

const styles = {
    Avatar: {
        height: 70,
        width: 100,
        color: '#CF3C37',
        fontSize: 20,
    }
}

export default withRouter(Categories)
