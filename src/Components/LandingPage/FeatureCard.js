import React, { Component } from 'react'
import { Paper } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

export class FeatureCard extends Component {
    render() {
        return (
            <div className="mx-auto" style={{width:window.innerWidth<768?'300px':''}}>
                {window.innerWidth < 768
                    ?
                    <div style={styles.root}>
                        <CardMedia
                            style={styles.cover}
                            image={this.props.image}
                            title="Live from space album cover"
                        />
                    </div>
                    : null
                }

                <div style={styles.root}>
                    {this.props.left && window.innerWidth >= 768
                        ? <CardMedia
                            style={styles.cover}
                            image={this.props.image}
                            title="Live from space album cover"
                        />
                        : null}
                    <CardContent style={styles.content}>
                        <Typography component="h5" variant="h5">
                            <strong style={{fontFamily:'Montserrat'}}> {this.props.heading}</strong>
                        </Typography>
                        {/* <Typography variant="subtitle1" color="textSecondary" className="mt-4" style={{fontFamily:'Montserrat'}}>
                            {this.props.text}
                        </Typography> */}
                    </CardContent>
                    {this.props.right && window.innerWidth >= 768
                        ? <CardMedia
                            style={styles.cover}
                            image={this.props.image}
                            title="Live from space album cover"
                        />
                        : null}
                </div>


            </div>
        )
    }
}


const styles = {
    root: {
        display: 'flex',
        height: 200,
        fontFamily: 'Montserrat',
        width:'100%'
    },
    details: {
        flexDirection: 'column',
    },
    content: {
        width: '100%'
    },
    cover: {
        width: '200%'
    },
    controls: {
        alignItems: 'center',
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}

export default FeatureCard
