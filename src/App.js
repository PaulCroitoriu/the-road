import "./App.css";
import React from "react";

import Search from "./components/Search";
import Table from "./components/Table";
import Button from "./components/Button";

const DEFAULT_QUERY = "redux";
const DEFAULT_HPP = "100";

const PATH_BASE = "https://hn.algolia.com/api/v1/";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";
const PARAM_HPP = "hitsPerPage=";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };
  }

  setSearchTopStories = result => {
    // destructuring hits and page from the result state
    const { hits, page } = result;

    const oldHits = page !== 0 ? this.state.result.hits : [];

    const updatedHits = [...oldHits, ...hits];

    this.setState({ result: { hits: updatedHits, page } });
  };

  // method to fetch data from api
  fetchSearchTopStories = (searchTerm, page = 0) => {
    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  };

  componentDidMount() {
    // update state
    this.fetchSearchTopStories(this.state.searchTerm);
  }

  onDismiss = id => {
    //check for the item id and filter the list
    const updatedHits = this.state.result.hits.filter(
      item => item.objectID !== id
    );
    //update state with the updated list
    this.setState({
      result: { ...this.state.result, hits: updatedHits },
    });
  };

  onSearchSubmit = event => {
    this.fetchSearchTopStories(this.state.searchTerm);
    event.preventDefault();
  };

  // input handler
  onSearchChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { result, searchTerm } = this.state;

    const page = (result && result.page) || 0;

    console.log(this.state);
    return (
      <div className="page">
        <div className="interactions">
          <Search
            onChange={this.onSearchChange}
            value={searchTerm}
            onSearchSubmit={this.onSearchSubmit}
          >
            <h1>Search</h1>
          </Search>
        </div>
        {result ? (
          <Table list={result.hits} onDismiss={this.onDismiss} />
        ) : null}
        <div className="interactions">
          <Button
            candApesiClick={() =>
              this.fetchSearchTopStories(searchTerm, page + 1)
            }
          >
            More
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
