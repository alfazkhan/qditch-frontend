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
            <div className="container my-3">

                <Card style={styles.root}>
                    {this.props.left
                        ? <CardMedia
                            style={styles.cover}
                            image={this.props.image}
                            title="Live from space album cover"
                        />
                        : null}
                    <div style={styles.details}>
                        <CardContent style={styles.content}>
                            <Typography component="h5" variant="h5">
                               <strong> {this.props.heading}</strong>
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary" className="mt-5">
                                {this.props.text}
                            </Typography>
                        </CardContent>
                    </div>
                    {this.props.right
                        ? <CardMedia
                            style={styles.cover}
                            image={this.props.image}
                            title="Live from space album cover"
                        />
                        : null}

                </Card>
            </div>
        )
    }
}


const styles = {
    root: {
        display: 'flex',
        height: 200
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
        width: window.innerWidth / 2.5
    },
    cover: {
        width: window.innerWidth / 3
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}

export default FeatureCard
