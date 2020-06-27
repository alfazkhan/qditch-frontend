import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

export const Loader = () => {
    return (
        <div style={styles.screen}>
            <CircularProgress
            size={100}
            />
        </div>
    )
}

const styles={
    screen:{
        marginTop: window.innerHeight/2,
        marginLeft: window.innerWidth/2
    }
}