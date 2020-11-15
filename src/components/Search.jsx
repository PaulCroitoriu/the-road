import React from "react";

const Search = ({ onChange, value, children }) => (
  <form>
    {children}
    <input onChange={onChange} type="text" value={value} />
  </form>
);

export default Search;
