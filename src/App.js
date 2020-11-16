import "./App.css";
import React from "react";

import axios from "axios";

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
      results: null,
      searchKey: "",
      searchTerm: DEFAULT_QUERY,
      error: null,
    };
  }

  setSearchTopStories = result => {
    // destructuring hits and page from the result state
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits =
      results && results[searchKey] ? results[searchKey].hits : [];

    const updatedHits = [...oldHits, ...hits];

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page },
      },
    });
  };

  //searching for cache results
  needsToSearchTopStories = searchTerm => {
    //takes the serchTerm as input and returns if there are no results based on searchTerm key
    return !this.state.results[searchTerm];
  };

  // method to fetch data from api
  fetchSearchTopStories = (searchTerm, page = 0) => {
    axios(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then(result => this.setSearchTopStories(result.data))
      .catch(error => this.setState({ error }));
  };

  componentDidMount() {
    const { searchTerm } = this.state;

    //update searchKey
    this.setState({ searchKey: searchTerm });
    // update state
    this.fetchSearchTopStories(searchTerm);
  }

  onDismiss = id => {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    //check for the item id and filter the list
    const updatedHits = hits.filter(item => item.objectID !== id);

    //update state with the updated list
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page },
      },
    });
  };

  onSearchSubmit = event => {
    const { searchTerm } = this.state;
    //update searchKey
    this.setState({ searchKey: searchTerm });

    //checks if there are no results[searchTherm]
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  };

  // input handler
  onSearchChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { results, searchTerm, searchKey, error } = this.state;

    const page =
      (results && results[searchKey] && results[searchKey].page) || 0;

    const list =
      (results && results[searchKey] && results[searchKey].hits) || [];

    console.log(this.state.results);

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
        {error ? (
          <div className="interactions">
            <p>Ohh Noo. Something went wrong.</p>
          </div>
        ) : (
          <Table list={list} onDismiss={this.onDismiss} />
        )}
        <div className="interactions">
          <Button
            candApesiClick={() =>
              this.fetchSearchTopStories(searchKey, page + 1)
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
