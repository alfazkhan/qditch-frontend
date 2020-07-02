import React, { Component } from 'react'
import {
    withRouter
  } from "react-router-dom";
import Axios from '../../Axios';
import Heading from '../../Components/Heading/Heading';
import SalonResultCards from '../../Components/SearchResults/SalonResultCards/SalonResultCards';


class Results extends Component {

    state={
        businessIDs : [],
        categoryName : '',
        results: null
    }

    componentDidMount() {
        const category = this.props.match.params.category
        const categoryName = this.props.match.params.categoryName
        this.setState({categoryName:categoryName})
        const data = {
            "id" : category
        }
        Axios.post('api/category/super_category/',data)
        .then(res=>{
            this.setState({businessIDs:res.data},()=>{
                const results = <SalonResultCards business_ids={this.state.businessIDs}/>
                
                this.setState({results:results})
            })
        })
        .catch(e=>{
            console.log(e.response)
        })

        
    }
    

    render() {
        return (
            <div>
                <Heading text={this.state.categoryName} />
                {this.state.results}
            </div>
        )
    }
}

export default withRouter(Results)
