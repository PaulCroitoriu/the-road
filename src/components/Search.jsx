import React from "react";

const Search = ({ onChange, value, children, onSearchSubmit }) => (
  <form onSubmit={onSearchSubmit}>
    <input onChange={onChange} type="text" value={value} />
    <button className="ui button" type="submit">
      {children}
    </button>
  </form>
);

export default Search;
