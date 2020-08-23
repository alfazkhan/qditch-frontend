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
    console.log(salonData)
    for (var key in salonData) {
      const serviceList = []
      for (var index in salonData[key].business_services) {
        if (!salonData[key].business_services[index].disable) {
          serviceList.push(
            <tr>
              <td style={{marginTop: "50px"}} className="text-left">{salonData[key].business_services[index].service_name}</td>
              <td style={{marginTop: "50px"}} className="text-right">{salonData[key].business_services[index].business_service_price} ₹</td>
            </tr>
          )
        }
      }

      for (var index in salonData[key].custom_business_services) {
        if (!salonData[key].custom_business_services[index].disable) {
          serviceList.push(
            <tr>
              <td style={{marginTop: "50px"}} className="text-left">{salonData[key].custom_business_services[index].service_name}</td>
              <td style={{marginTop: "50px"}} className="text-right">{salonData[key].custom_business_services[index].business_service_price} ₹</td>
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
      <div className={window.innerWidth > 768 ? "mx-auto" : "mx-auto mt-4"} >
        {this.state.Loading
          ?
          <CircularProgress className="mt-5" />

          :
          <ul className='list-group mb-4'>
            {this.props.salon.sort().map((salon, index) => (
              <div key={index} className="row" onClick={() => this.props.history.push('/saloninfo/' + salon.id)} >
                <div className={window.innerWidth > 768 ? "my-4 col-4" : "col-12"} >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="200"
                      image={this.state.coverImages[salon.id] ? "https://master.qditch.com" + this.state.coverImages[salon.id] : "https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
                      title={salon.business_name}
                      className={window.innerWidth > 768 ? "my-5" : "my-auto"}
                    />
                  </CardActionArea>
                </div >
                <div className={window.innerWidth > 768 ? "my-4 col-8" : "col-12 mb-3"}>
                  <CardActionArea>
                    <CardContent>
                      <div className="row">
                          <strong className="col-8 text-left" style={{ fontFamily: 'Montserrat', color: '#1B1D21', fontSize: "17px" }}> {salon.business_name} </strong>
                        <Typography gutterBottom variant="h6" className="col text-right my-auto">
                          {salon.distance !== "" && salon.distance !== null && typeof salon.distance !== "undefined"
                            ?
                            <strong className="text-right" style={{ color: '#00B0B9', fontFamily: 'Montserrat', fontSize: "17px" }}> {salon.distance + "KM"}</strong>
                            : null}
                        </Typography>
                      </div>
                      <Typography variant="body2" color="textPrimary" className="text-left" component="p" style={{ fontFamily: 'Montserrat' }}>
                        {salon.line1 + ", " + salon.line2}
                      </Typography>
                      <Typography variant="body2" color="textPrimary" className="text-left" component="p" style={{ fontFamily: 'Montserrat' }}>
                        {salon.area + ", " + salon.city_name + ", " + salon.pincode}
                      </Typography>
                      <Typography variant="body2" color="textPrimary" className="text-left" component="p" style={{ fontFamily: 'Montserrat' }}>
                        {salon.about !== null ? salon.about : null}
                      </Typography>


                      <table className="table mt-4" style={{ fontSize: "14px" }}>
                        {this.state.salonServices[salon.id].slice(0, 3)}
                      </table>

                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button className="ml-auto" size="small" style={{ color: '#00B0B9', fontFamily: 'Montserrat' }}>
                      Book Appointment Now
                    </Button>
                  </CardActions>
                </div>

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
