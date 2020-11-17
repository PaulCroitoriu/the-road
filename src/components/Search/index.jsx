import React from "react";

import Button from "../Button";

const Search = ({ placeholder, onChange, value, children, onSearchSubmit }) => (
  <form onSubmit={onSearchSubmit}>
    <div className="ui category search">
      <input
        onChange={onChange}
        value={value}
        type="text"
        placeholder="Search..."
      />
      <Button candApesiClick={onSearchSubmit} className="ui secondary button">
        Search
      </Button>
    </div>
  </form>
);

export default Search;
