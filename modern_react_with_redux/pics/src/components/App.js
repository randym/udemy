import React from 'react'
import SearchBar from './SearchBar'
import ImageList from './ImageList'
import unsplash from '../api/unsplash'
import Spinner from './Spinner'
class App extends React.Component {
  state = { images: [], status: 'ready' }

  onSearchBarSubmit = async (term) => {
    this.setState({status:'loading'})
    const response = await unsplash.get('/search/photos', { params: { query: term } })

    this.setState({status:'ready'})

    if(response.status === 200) {
    this.setState({ images: response.data.results })
    } else {
      // on shit!
    }
  }

  render() {
    return (
      <div className="ui container" style={{ marginTop: '10px' }}>
        <SearchBar onSubmit={this.onSearchBarSubmit} />
        {this.state.status === 'loading' ? <Spinner /> : <ImageList images={this.state.images} /> }
      </div>
    )
  }
}
export default App