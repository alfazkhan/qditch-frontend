import React, { Component } from 'react'

export class CategoryImage extends Component {
    render() {
        return (

            <img className="mx-2" height="80px" width="auto" src={this.props.image} />

        )
    }
}

export default CategoryImage
