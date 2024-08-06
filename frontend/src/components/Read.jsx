import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomer, getAllCustomers } from "../redux/slices/customerDetailsSlice";
import PopupUserRead from "./PopupUserRead";
import { Link } from "react-router-dom";


const Read = () => {
  const { customers, count, isLoading, searchData } = useSelector((state) => state.customers);
  const dispatch = useDispatch();
    
  const [showPopup, setShowPopup] = useState(false);
  const [selectGender, setSelectedGender] = useState("");
  const [id, setId] = useState();

  useEffect(() => {
    dispatch(getAllCustomers());
  }, []);

  if (isLoading) return <h1>Loading</h1>;

  return (
    <>
      <div className="text-center">
        <h2>All Data</h2>
        <h3>Total Users: {count}</h3>
      </div>
      <div className="d-flex justify-content-center">
        <div>
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            checked={selectGender === ""}
            onChange={(e) => setSelectedGender(e.target.value)}
          />
          <label className="form-check-label">All</label>
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            value="Male"
            checked={selectGender === "Male"}
            onChange={(e) => setSelectedGender(e.target.value)}
          />
          <label className="form-check-label">Male</label>
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            value="Female"
            checked={selectGender === "Female"}
            onChange={(e) => setSelectedGender(e.target.value)}
          />
          <label className="form-check-label">Female</label>
        </div>
      </div>

      {showPopup && (
        <PopupUserRead
          id={id}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}

      {customers &&
        customers
        .filter((customer) => {
            if (searchData.length === 0) {
              return customer;
            } else {
              // you can filter by name, email, phone...
              return customer.name.toLowerCase().includes(searchData.toLowerCase());
            }
          })
        .filter((customer) => {
            if (selectGender === "Male") {
              return customer.gender === selectGender.toLowerCase();
            } else if (selectGender === "Female") {
              return customer.gender === selectGender.toLowerCase();
            } else {
              return customer;
            }
          })
        .map((customer) => (
            <div
              key={customer._id}
              className="card mx-auto w-50 my-2"
              style={{ width: "18rem" }}
            >
              <div className="card-body">
                <h5 className="card-title">{customer.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{customer.email}</h6>
                <h6 className="card-subtitle mb-2 text-muted">{customer.phone}</h6>
                <h6 className="card-subtitle mb-2 text-muted">{customer.gender}</h6>
                <h6 className="card-subtitle mb-2 text-muted">
                  {customer.membership}
                </h6>

                <button
                  className="card-link"
                  onClick={() => [setId(customer._id), setShowPopup(true)]}
                >
                  View
                </button>

                <Link to={`/edit/${customer._id}`} className="card-link">
                  Edit
                </Link>
                <Link
                  onClick={() => dispatch(deleteCustomer(customer._id))}
                  className="card-link"
                >
                  Delete
                </Link>
              </div>
            </div>
          ))}

    </>
  );
};

export default Read;
