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
import SalonResults from '../../SearchResults/SalonResultCards/SalonResultCards';



class SalonCard extends Component {

  state = {
    userDetails: {},
    Loading: true,
    coverImages: {},
    salonServices: {}
  }

  componentDidMount() {
    let promise = []
    const details = this.state.userDetails
    const images = this.state.coverImages
    const salonServices = this.state.salonServices


    const salonData = this.props.salon
    // console.log(salonData)
    for (var key in salonData) {
      const serviceList = []
      for (var index in salonData[key].business_services) {
        if (!salonData[key].business_services[index].disable) {
          serviceList.push(
            <tr>
              <td className="text-left">{salonData[key].business_services[index].service_name}</td>
              <td className="text-right">{salonData[key].business_services[index].business_service_price} ₹</td>
            </tr>
          )
        }
      }

      for (var index in salonData[key].custom_business_services) {
        if (!salonData[key].custom_business_services[index].disable) {
          serviceList.push(
            <tr>
              <td className="text-left">{salonData[key].custom_business_services[index].service_name}</td>
              <td className="text-right">{salonData[key].custom_business_services[index].business_service_price} ₹</td>
            </tr>
          )
        }
      }

      salonServices[salonData[key].id] = serviceList
    }

    for (var key in salonData) {
      const url = 'api/users/user_data/'
      const url2 = 'api/images/business_cover_image/'
      let data = {
        "user": salonData[key].user
      }
      promise.push(Axios.post(url, data)
        .then(res => {
          // console.log(res.data)
          details[res.data.user_details.users] = {
            "name": res.data.user_details.first_name + " " + res.data.user_details.last_name,
            "mobile": res.data.user_details.mobile_number
          }
        })
        .catch(e => {
          console.log(e.response)
        }))
      data = {
        "business": salonData[key].id
      }
      // console.log(data)
      promise.push(Axios.post(url2, data)
        .then(res => {
          // console.log(res.data)
          images[res.data.business] = res.data['cover_photo']
        })
        .catch(e => {
          console.log(e.response)
        }))
    }
    Promise.all(promise)
      .then(res => {
        // console.log(images)
        this.setState({ userDetails: details, Loading: false, coverImages: images }, () => {

        })
      })
  }



  render() {
    return (
      <div className="container" >
        {this.state.Loading
          ?
          <CircularProgress className="mt-5" style={styles.Loader} />

          :
          <ul className='list-group mb-4'>
            {this.props.salon.sort().map((salon, index) => (
              <div key={index} className="row" onClick={() => this.props.history.push('/saloninfo/' + salon.id)} style={{ width: window.innerWidth / 1.12 }}>
                <Card className={window.innerWidth > 768 ? "my-4 col-4" : "col-12"}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="200"
                      image={this.state.coverImages[salon.id] ? "https://master.qditch.com" + this.state.coverImages[salon.id] : "https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
                      title={salon.business_name}
                    />
                  </CardActionArea>
                </Card>
                <Card className={window.innerWidth > 768 ? "my-4 col-8" : "col-12 mb-3"}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h4" component="h2">
                        <strong> {salon.business_name} </strong>
                      </Typography>
                      <Typography variant="body2" color="textPrimary" component="p">
                        {salon.line1}
                      </Typography>
                      <Typography variant="body2" color="textPrimary" component="p">
                        {salon.line2}
                      </Typography>
                      <Typography variant="body2" color="textPrimary" component="p">
                        {salon.area}
                      </Typography>
                      <Typography variant="body2" color="textPrimary" component="p">
                        {salon.city_name}
                      </Typography>
                      <Typography variant="body2" color="textPrimary" component="p">
                        {salon.pincode}
                      </Typography>
                      <Typography variant="body2" color="textPrimary" component="h1">
                        {index}
                      </Typography>

                      <table className="table mt-5">
                        {this.state.salonServices[salon.id].slice(0, 4)}
                      </table>

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
    marginLeft: window.innerWidth / 2.5
  }
}



export default withRouter(SalonCard)
