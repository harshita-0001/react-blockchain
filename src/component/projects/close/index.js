import { useEffect, useState } from "react";
import Card from "../card/card";
import { closedProjects, searchData } from "../data/data";
import Pagination from "../pagination";
import Search from "../search";

const ProjectClosed = () => {
  // pagination
  const perPage = 5;
  const [search, setSearch] = useState("");
  const [filteredData, setFilterdData] = useState([]);
  const [allData, setAllData] = useState([]);
  // filtered after search
  useEffect(() => {
    let newData = searchData(allData, search);
    setFilterdData(newData);
  }, [search]);
  // set data on page refresh
  useEffect(() => {
    let data = closedProjects();
    setFilterdData(data);
    setAllData(data);
  }, []);
  return (
    <div className="container mt-4 mx-auto">
      <div className="row">
        <h1>PROJECTS CLOSED</h1>
        {/*search */}
        {Array.isArray(allData) &&
        allData?.length > perPage &&
        allData?.length !== 0 &&
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
              {search && <h5 className="text-dark">No project found</h5>}
            </>
          )
        )}
{/* pagination */}
        {Array.isArray(filteredData) && filteredData?.length > perPage ? (
          <Pagination data={filteredData} perPage={perPage} status="closed" />
        ) : filteredData?.length ? (
          filteredData?.map((item, i) => (
            <Card item={item} status="closed" key={`card-${i}`} />
          ))
        ) : (
          !search && <h5>No Projects Currently Closed</h5>
        )}
      </div>
    </div>
  );
};
export default ProjectClosed;
