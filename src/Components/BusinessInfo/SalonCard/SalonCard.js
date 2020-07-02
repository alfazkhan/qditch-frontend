import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Axios from '../../../Axios';
import { withRouter } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';



class SalonCard extends Component {

  state = {
    userDetails: [],
    Loading: true
  }

  componentDidMount() {
    let promise = []
    const details = this.state.userDetails

    for (var key in this.props.salon) {
      const url = 'api/users/user_data/'
      const data = {
        "user": this.props.salon[key].user
      }
      promise.push(Axios.post(url, data)
        .then(res => {
          details.push({
            "name": res.data.user_details.first_name + " " + res.data.user_details.last_name,
            "mobile": res.data.user_details.mobile_number
          })
        })
        .catch(e => {
          console.log(e.response)
        }))
      }
      Promise.allSettled(promise)
        .then(res => {
          console.log(details)
          this.setState({ userDetails: details,Loading:false })
        })


  }



  render() {
    return (
      <div>
        {this.state.Loading
          ? <div className="row">
            <CircularProgress className="mx-auto" style={styles.Loader} />
          </div>
          :
          <ul className='list-group mb-4'>
            {this.props.salon.map((salon, index) => (
              <div className="row" onClick={() => this.props.history.push('/saloninfo/' + salon.id)}>
                <Card className="my-4 col-4">
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="200"
                      image="https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                      title={salon.business_name}
                    />
                  </CardActionArea>
                </Card>
                <Card className="my-4 col-8">
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        <strong> {salon.business_name} </strong>
                      </Typography>
                      <Typography variant="body2" color="textPrimary" component="p">
                        {salon.address}
                      </Typography>
                      <Typography variant="body2" color="primary" component="p">
                        {this.state.userDetails[index].name + ":" + this.state.userDetails[index].mobile} 
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions className="mt-auto">
                    <Button className="ml-auto mt-5" size="small" color="primary">
                      Book Appointment Now
            </Button>
                  </CardActions>
                </Card>

              </div>

            ))}
          </ul>
        }
      </div>
    )
  }
}

const styles = {
  container: {
      marginTop: window.innerHeight / 6,
      width: window.innerWidth < 768 ? '100%' : '50%',
  },
  Loader: {
      marginTop: '40px'
  }
}



export default withRouter(SalonCard)
