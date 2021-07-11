import React from 'react'

class SearchBar extends React.Component {

  state = { term: '' }

  onFormSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state.term)
  }

  onInputChange = ({target}) => {
    this.setState({term: target.value})
  }

  render() {
    return (
      <div className="ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <label>Image Search</label>
            <input
              value={this.state.term}
              onChange={this.onInputChange}
              type="text" />
          </div>
        </form>
      </div>
    )
  }
}

SearchBar.defaultProps = {
  onSubmit() { /* noop */ }
}

export default SearchBar