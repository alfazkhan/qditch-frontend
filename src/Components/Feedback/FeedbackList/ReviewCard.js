import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export class ReviewCard extends Component {

    state={
        stars:[]
    }

    componentDidMount() {
        const starCount = this.props.rating
        const stars = []
        for(var i=0; i<5; i++){
            console.log(i,starCount)
            stars.push(
                <i class="fa fa-star mx-1" id="0" aria-hidden="true" style={{ fontSize: 30, color: i < starCount ? 'gold' : 'grey' }}></i>
            )
        }

        this.setState({
            stars: stars
        })
    }
    

    render() {
        return (
            <div className="my-3 ">
                <Card>
      <CardActionArea>
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {this.props.username}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {
                this.state.stars
            }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <p>
                {this.props.review}
            </p>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
            </div>
        )
    }
}

export default ReviewCard
