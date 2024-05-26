import _ from "lodash";
import { memo } from "react";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  console.log(itemsCount, pageSize, currentPage, onPageChange);
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  const getPrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const getNextPage = () => {
    if (currentPage < pagesCount) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li class="page-item">
          <a class="page-link" onClick={() => getPrevPage()}>
            Previous
          </a>
        </li>

        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}

        <li class="page-item">
          <a class="page-link" onClick={() => getNextPage()}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default memo(Pagination);
