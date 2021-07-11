import React from "react";

class SearchBar extends React.Component {
  state = { term: "" };

  onFormSubmit = (event) => {
    const { props, state } = this;

    event.preventDefault();
    props.onSubmit(state.term);
  };

  onInputChange = ({ target }) => {
    const { value } = target;

    this.setState({ term: value });
  };

  render() {
    const { onFormSubmit, onInputChange, state } = this;
    const { term } = state;

    return (
      <div className="ui segment search-bar">
        <form onSubmit={onFormSubmit} className="ui form">
          <div className="field">
            <label>Enter Search</label>
            <input value={term} type="text" onChange={onInputChange} />
          </div>
        </form>
      </div>
    );
  }
}
export default SearchBar;
