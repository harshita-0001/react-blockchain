import { openProject, searchData } from "../data/data";

import Card from "../card/card";
import Pagination from "../pagination";
import Search from "../search";
import { useEffect, useState } from "react";

const OpenProjects = () => {
  //pagination
  const perPage = 4;
  const [search, setSearch] = useState("");
  const [filteredData, setFilterdData] = useState([]);
  const [allData, setAllData] = useState([]);
  //filterData on search
  useEffect(() => {
    let newData = searchData(allData, search);
    setFilterdData(newData);
  }, [search]);
//setData on refresh page
  useEffect(() => {
    let data = openProject();
    setFilterdData(data);
    setAllData(data);
  }, []);
  return (
    <div className="container mt-4 mx-auto">
      <h1>PROJECTS OPEN NOW</h1>

      <div className="row">
        {/* search component */}
        {Array.isArray(allData) &&
        allData?.length > perPage &&
        Array.isArray(filteredData) &&
        filteredData?.length != 0 ? (
          <Search data={filteredData} setSearch={setSearch} search={search} />
        ) : (
          Array.isArray(filteredData) &&
          !filteredData?.length &&
          allData?.length !== 0 && (
            <>
              <Search
                data={filteredData}
                setSearch={setSearch}
                search={search}
              />
              <h5 className="text-dark">No project found</h5>
            </>
          )
        )}
        {/* pagination or card based on condtion  */}
        {Array.isArray(filteredData) && filteredData?.length > perPage ? (
          <Pagination data={filteredData} status="opened" perPage={perPage} />
        ) : filteredData?.length ? (
          filteredData?.map((item, i) => (
            <Card item={item} status="open" key={`card-${i}`} />
          ))
        ) : (
          !search && <h5>No Projects Currently Open</h5>
        )}
      </div>
    </div>
  );
};

export default OpenProjects;
