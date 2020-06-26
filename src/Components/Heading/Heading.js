import React, { useState, useEffect } from 'react'
import Fade from '@material-ui/core/Fade';

const Heading = (props) => {

    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setChecked(true)
        }, 100)
        
    }, [checked])

    return (
        <div className=" m-4">
            <Fade in={checked}>
                <h1>{props.text}</h1>
            </Fade>
        </div>
    )
}

export default Heading
