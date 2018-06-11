import React, { PureComponent } from 'react'
import Loading from './loading'

export default class ImageX extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      image: null
    }
  }

  componentDidMount() {
    const image = new Image()

    image.src = this.props.src

    image.onload = () => {
      this.setState({ image: image.src })
    }
  }

  render() {
    return (
      <div>
        {this.state.image ? (
          <img src={this.state.image} />
        ) : (
          <Loading />
        )}
      </div>
    )
  }
}