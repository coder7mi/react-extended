import React, { Component } from 'react'
import withRouter from './withRouter'

class FilmItem extends Component {
  handleClick(id) {
    console.log(this.props.history)
    this.props.history.push(`/detail/${id}`)
  }
  render() {
    return <li onClick={() => this.handleClick(this.props.filmId)}>{this.props.name}</li>
  }
}

export default withRouter(FilmItem)
