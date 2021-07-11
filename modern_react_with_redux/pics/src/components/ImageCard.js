import React from 'react'


class ImageCard extends React.Component {
  state = { spans: 0 }

  setSpans = ({ target }) => {
    const spans = Math.ceil(target.clientHeight / 10)
    this.setState({ spans })
  }

  render() {
    const { alt, src } = this.props

    return (
      <div style={{ gridRowEnd: `span ${this.state.spans}` }} className="image-card">
        <img alt={alt} src={src} onLoad={this.setSpans} />
      </div>
    )
  }
}

// ImageCardRef - the same thing using refs as per the actual lessons
//  not really sure why you would want to do it this way...

class ImageCardRef extends React.Component {
  constructor(props) {
    super(props)
    this.imageRef = React.createRef()
  }

  state = { spans: 0 }

  componentDidMount() {
    this.imageRef.current.addEventListener('load', this.setSpans)
  }

  setSpans = () => {
    const spans = Math.ceil(this.imageRef.current.clientHeight / 10)
    this.setState({ spans })
  }

  render() {
    const { alt, src } = this.props

    return (
      <div style={{ gridRowEnd: `span ${this.state.spans}` }} className="image-card">
        <img alt={alt} src={src} ref={this.imageRef} />
      </div>
    )
  }
}

export default ImageCard