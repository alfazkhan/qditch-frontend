import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box } from '@material-ui/core';


export const Loader = () => {
    return (
        <div className="container" style={styles.screen}>
            <Box>

                <CircularProgress
                    size={100}
                    className="mx-auto"
                    // style={{marginLeft:window.innerWidth/2}}
                />
            </Box>
        </div>
    )
}

const styles = {
    screen: {
        marginTop: window.innerHeight / 2,
        marginLeft: window.innerWidth / 2
    },
    container: {
        marginTop: window.innerHeight / 3,
        width: window.innerWidth < 768 ? '100%' : '50%',
    },
}

// export default Loader