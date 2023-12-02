import { Fragment, useState } from "react";
import { pagination } from "../data/data";
import Card from "../card/card";

const Pagination = ({ data, status, perPage }) => {
  const totalPage = Math.ceil(data?.length / perPage);

  const [currentPage, setCurrentPage] = useState(1);
  const endIndex = currentPage * perPage;
  const startIndex = endIndex - perPage;

  //chamge value of currentpage
  const handlePage = (page) => {
    if (page == 0) {
      setCurrentPage(1);
      return;
    } else if (page <= totalPage) {
      setCurrentPage(page);
    }
  };
  //filterdata after pagination
  const filterData = pagination(startIndex, endIndex, data);

  return (
    <Fragment>
      <div className="container mt-4 mx-auto">
        <div className="row">
          {/* card attached */}
          {filterData?.map((item, i) => (
            <Card item={item} status={status} />
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <nav aria-label="Page navigation example ">
          <ul className="pagination">
            {/* previous button */}
            <li className="page-item">
              <a
                className="page-link"
                aria-label="Previous"
                onClick={() => handlePage(currentPage - 1)}
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {/* page index */}
            {[...Array(totalPage).keys()]?.map((item, i) => (
              <li className="page-item ">
                <a
                  className={`page-link ${currentPage === i + 1 && "bg-info"}`}
                  onClick={() => handlePage(i + 1)}
                >
                  {i + 1}
                </a>
              </li>
            ))}
            {/* next button */}
            <li className="page-item">
              <a
                className="page-link"
                aria-label="Next"
                onClick={() => handlePage(currentPage + 1)}
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </Fragment>
  );
};

export default Pagination;
