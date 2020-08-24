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
        <div className="container-fluid mx-auto fixed-top" style={{ backgroundColor: Colors.primary,marginTop:'4em' }}>
            <div className="row">
                <div className="col mb-2" onClick={clickHandler} >
                    <Link  className="navbar-link text-bold" id="Hair">Hair</Link>
                </div>
                <div className="col mb-2" onClick={clickHandler} >
                    <Link  className="navbar-link text-bold" id="Skin">Skin</Link>
                </div>
                <div className="col mb-2" onClick={clickHandler} >
                    <Link  className="navbar-link text-bold" id="Spa">Spa</Link>
                </div>
                <div className="col mb-2" onClick={clickHandler} >
                    <Link  className="navbar-link text-bold" id="Makeup">Makeup</Link>
                </div>
                <div className="col mb-2" onClick={clickHandler} >
                    <Link  className="navbar-link text-bold" id="Eyebrows">Eyebrows</Link>
                </div>
                <div className="col mb-2" onClick={clickHandler} >
                    <Link  className="navbar-link text-bold" id="Hair Removal">Hair Removal</Link>
                </div>
                {/* <div className="col mb-2" onClick={clickHandler} >
                    <Link  className="navbar-link text-bold" id="Nails">Nails</Link>
                </div> */}
                <div className="col mb-2" onClick={clickHandler} >
                    <Link  className="navbar-link text-bold" id="Massage">Massage</Link>
                </div>
            </div>
           


        </div>
    )
}

const styles = {
    Avatar: {
        height: 70,
        width: 100,
        color: '#444444', //Organge on Hover
        fontSize: 20,
        fontWeight: 'bold'
    }
}

export default withRouter(Categories)
