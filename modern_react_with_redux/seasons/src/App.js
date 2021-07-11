import React from 'react'
import SeasonDisplay from './SeasonDisplay'
import Spinner from './Spinner'


const loadingMessage = 'Tring to determine location...'

class App extends React.Component {
  state = { lat: null, errorMessage: '' }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => this.setState({ lat: coords.latitude }),
      ({ message }) => this.setState({ errorMessage: message }),
    )
  }

  renderContent() {
    const { errorMessage, lat } = this.state
    if (errorMessage && !lat) {
      return <div>{errorMessage}</div>
    }

    if (lat && !errorMessage) {
      return <SeasonDisplay lat={lat} />
    }

    return <Spinner message={loadingMessage} />
  }

  render() {
    return <div className="app">{this.renderContent()}</div>
  }
}

export default App