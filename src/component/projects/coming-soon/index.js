import { useEffect, useState } from "react";
import Card from "../card/card";
import { comingSoonProject, searchData } from "../data/data";
import Pagination from "../pagination";
import Search from "../search";

const ProjectComingSoon = () => {
  const perPage = 5;
  const [search, setSearch] = useState("");
  const [filteredData, setFilterdData] = useState([]);
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    let newData = searchData(allData, search);
    setFilterdData(newData);
  }, [search]);

  useEffect(() => {
    let data = comingSoonProject();
    setFilterdData(data);
    setAllData(data);
  }, []);

  return (
    <div className="container mt-4 mx-auto">
      <div className="row">
        <h1>PROJECTS COMING SOON</h1>
        {Array.isArray(allData) &&
        allData?.length > perPage &&
        Array.isArray(filteredData) &&
        filteredData?.length != 0 ? (
          <Search data={filteredData} setSearch={setSearch} search={search} />
        ) : (
          Array.isArray(filteredData) &&
          !filteredData?.length && allData?.length !== 0 &&(
            <>
              <Search
                data={filteredData}
                setSearch={setSearch}
                search={search}
              />
             {
              search&& <h5 className="text-dark">No project found</h5>
             }
            </>
          )
        )}

        {Array.isArray(filteredData) && filteredData?.length > perPage ? (
          <Pagination data={filteredData} status="coming soon" perPage={perPage}/>
        ) : filteredData?.length?(
          filteredData?.map((item, i) => (
            <Card item={item} status="coming soon" key={`card-${i}`} />
          ))
        ):!search&&<h5>No Projects Currently Coming soon</h5>}
      </div>
    </div>
  );
};

export default ProjectComingSoon;
