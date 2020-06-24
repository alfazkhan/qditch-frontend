import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BusinessIcon from '@material-ui/icons/Business';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ImageIcon from '@material-ui/icons/Image';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AmpStoriesIcon from '@material-ui/icons/AmpStories';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MyBusiness from './MyBusiness/MyBusiness';
import CircularProgress from '@material-ui/core/CircularProgress';
import Axios from '../../Axios'
import Services from './Services/Services';
import Stylists from './Stylists/Stylists';
import Images from './Images/Images';
import Timings from './Timings/Timings';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
  },
}


class Dashboard extends Component {

  state = {
    value: 0,
    business_id: 18,
    Loading: false,
    Data: null,
    elements: [],
  }

  componentWillMount() {
    
    this.setState({ Loading: true })
    this.setState({ business_id: 18 }, () => {
      Axios.get('/users/business/' + this.state.business_id + '/')
        .then((response) => {
          // console.log(response.data)
          this.setState({ Data: response.data }, () => {
            this.responseValuesHandler()
            this.setState({Loading:false})
          })
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }

  responseValuesHandler=()=>{

  }

  handleChange=(e,newValue)=>{
    this.setState({value:newValue})
  }


  render() {
    return (
      <div>
        {this.state.Loading ? <CircularProgress /> 
        :
        <div style={styles.root} className="text-center">
          <AppBar position="relative" color="default">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              variant="scrollable"
              scrollButtons="on"
              indicatorColor="primary"
              textColor="primary"
              aria-label="scrollable force tabs example"
              className="text-center ml-auto mr-auto"
            >
              <Tab label="My Business" icon={<BusinessIcon />} {...a11yProps(0)} />
              <Tab label="Appointments" icon={<ListAltIcon />} {...a11yProps(1)} />
              <Tab label="Services" icon={<AmpStoriesIcon />} {...a11yProps(2)} />
              <Tab label="Stylists" icon={<FaceIcon />} {...a11yProps(3)} />
              <Tab label="Timings" icon={<AccessTimeIcon />} {...a11yProps(4)} />
              <Tab label="Images" icon={<ImageIcon />} {...a11yProps(5)} />
              <Tab label="Edit Profile" icon={<PersonPinIcon />} {...a11yProps(6)} />
            </Tabs>
          </AppBar>
          <TabPanel value={this.state.value} index={0}>
            <MyBusiness data={this.state.Data} />
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
            Appointments
          </TabPanel>
          <TabPanel value={this.state.value} index={2}>
            <Services data={this.state.Data} />
          </TabPanel>
          <TabPanel value={this.state.value} index={3}>
            <Stylists data={this.state.Data} />
        </TabPanel>
          <TabPanel value={this.state.value} index={4}>
            <Timings data={this.state.Data} />
        </TabPanel>
          <TabPanel value={this.state.value} index={5}>
            <Images data={this.state.Data} />
        </TabPanel>
          <TabPanel value={this.state.value} index={6}>
            Edit Data
        </TabPanel>
        </div>}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  business_id: state.business_id
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)





