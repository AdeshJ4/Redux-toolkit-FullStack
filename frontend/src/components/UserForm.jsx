import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCustomer } from "../redux/slices/customerDetailsSlice";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const [customers, setCustomers] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getCustomerData = (e) => {
    setCustomers({ ...customers, [e.target.name]: e.target.value });
  };

  // const error  = useSelector((state) => state.user.error);  // old
  const { error } = useSelector((state) => state.customers);
  // useEffect(() => {
  //   if (error) {
  //     console.log('error from UserForm.jsx: ', error);
  //     alert(error);
  //   }
  // }, [error]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createCustomer(customers));
    if (error) {
      console.log("Error: ", error);
      alert(error);
    } else {
      navigate("/read");
    }
  };

  return (
    <div>
      <h2 className="my-2">Customer Form</h2>
      <form className="w-50 mx-auto" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={getCustomerData}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={getCustomerData}
          />
        </div>

        {/* phone */}
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="number"
            className="form-control"
            id="phone"
            name="phone"
            onChange={getCustomerData}
          />
        </div>

        {/* Membership */}
        <div className="mb-3">
          <label className="form-label">Membership</label>
          <select
            className="form-select"
            name="membership"
            onChange={getCustomerData}
          >
            <option value="none">None</option>
            <option value="bronze">Bronze</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
          </select>
        </div>

        {/* CheckBox */}
        <div className="mb-3">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            value="Male"
            onChange={getCustomerData}
          />
          <label className="form-check-label">Male</label>
        </div>
        <div className="mb-3">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            value="Female"
            onChange={getCustomerData}
          />
          <label className="form-check-label">Female</label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
