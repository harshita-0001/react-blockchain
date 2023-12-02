import { useEffect, useState } from "react";

const Search = ({data,setSearch,search}) => {
  return (
    <div className="container mt-4 mx-auto">
      <nav className="navbar d-flex justify-content-end">
      <form>
        <input
          className="form-control mr-sm-2 d-flex form-control-lgc text-black"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
      </form>
    </nav>
    
  </div>
  
  );
};

export default Search;
