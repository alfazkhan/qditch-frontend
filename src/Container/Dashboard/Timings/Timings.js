import React, { Component } from 'react'
import { CircularProgress } from '@material-ui/core'


class Timings extends Component {

    state={
        Loading:true
    }

    componentDidMount() {
        console.log(this.props.data)
    }
    

    render() {
        return (
            <div>
                {this.state.Loading ? <CircularProgress /> :
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Cover</th>
                                <th scope="col">Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.imageList}
                        </tbody>
                    </table>
                }
            </div>
        )
    }
}

export default Timings
