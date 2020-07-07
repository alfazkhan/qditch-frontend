import React, { useEffect, useState } from 'react'
import { Avatar, FormControl, InputLabel, Select } from '@material-ui/core'
import Axios from '../../Axios'
import { withRouter, Link } from 'react-router-dom'
import './Categories.css'

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
        <div className="container-fluid mb-5 mx-auto" style={{ backgroundColor: "rgba(255,255,255,0)" }}>
            <div className="row">
                <div className="col " onClick={clickHandler} >
                    <Avatar variant="square" className="mx-5 category-button" id="Hair" style={styles.Avatar}>Hair</Avatar>
                </div>
                <div className="col " onClick={clickHandler} >
                    <Avatar variant="square" className="mx-5 category-button" id="Skin" style={styles.Avatar}>Skin</Avatar>
                </div>
                <div className="col " onClick={clickHandler} >
                    <Avatar variant="square" className="mx-5 category-button" id="Spa" style={styles.Avatar}>Spa</Avatar>
                </div>
                <div className="col " onClick={clickHandler} >
                    <Avatar variant="square" className="mx-5 category-button" id="Makeup" style={styles.Avatar}>Makeup</Avatar>
                </div>
                <div className="col " onClick={clickHandler} >
                    <Avatar variant="square" className="mx-5 category-button" id="Eyebrows" style={styles.Avatar}>Eyebrows</Avatar>
                </div>
                <div className="col " onClick={clickHandler} >
                    <Avatar variant="square" className="mx-5 category-button" id="Hair Removal" style={styles.Avatar}>Hair Removal</Avatar>
                </div>
                <div className="col " onClick={clickHandler} >
                    <Avatar variant="square" className="mx-5 category-button" id="Nails" style={styles.Avatar}>Nails</Avatar>
                </div>
                <div className="col " onClick={clickHandler} >
                    <Avatar variant="square" className="mx-5 category-button" id="Massage" style={styles.Avatar}>Massage</Avatar>
                </div>
            </div>
           


        </div>
    )
}

const styles = {
    Avatar: {
        height: 70,
        width: 100,
    }
}

export default withRouter(Categories)
