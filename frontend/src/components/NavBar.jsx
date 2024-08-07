import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCustomers, searchCustomer } from "../redux/slices/customerDetailsSlice";

const NavBar = () => {
  const { count } = useSelector((state) => state.customers);
  const dispatch = useDispatch();

  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    dispatch(getAllCustomers());
    dispatch(searchCustomer(searchData));
  }, [searchData]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand" href="#">
            Redux Toolkit
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarToggleExternalContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Create Post
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/read" className="nav-link">
                  All Post ({count})
                </Link>
              </li>
            </ul>

            <input
              className="form-control me-2 w-50"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearchData(e.target.value)}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
