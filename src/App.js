import "./App.css";
import React from "react";

import Search from "./components/Search";
import Table from "./components/Table";

const DEFAULT_QUERY = "redux";
const PATH_BASE = "https://hn.algolia.com/api/v1/";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };
  }

  setSearchTopStories = result => {
    this.setState({ result });
  };

  componentDidMount() {
    const { searchTerm } = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  onDismiss = id => {
    //check for the item id and filter the list
    const updatedHits = this.state.result.hits.filter(
      item => item.objectID !== id
    );
    //update state with the updated list
    this.setState({
      result: { ...this.state.list, hits: updatedHits },
    });
  };

  onSearchChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { result, searchTerm } = this.state;

    if (!result) {
      return null;
    }

    return (
      <div className="page">
        <div className="interactions">
          <Search onChange={this.onSearchChange} value={searchTerm}>
            <h1>Search</h1>
          </Search>
        </div>
        <Table
          list={result.hits}
          onDismiss={this.onDismiss}
          pattern={searchTerm}
        />
      </div>
    );
  }
}

export default App;
