import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../redux/slices/userDetailsSlice";

const Update = () => {
  const [updatedData, setUpdatedData] = useState();
  const { users, isLoading } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      const singleUser = users.filter((user) => user._id === id);
      setUpdatedData(singleUser[0]); // singleUser = [{..}]  => setUpdatedData({})
    }
  }, []);

  const newData = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateUser(updatedData));
    navigate("/read");
  };

  if (isLoading) return <h1>Loading...</h1>;

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
            value={updatedData && updatedData.name}
            onChange={newData}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={updatedData && updatedData.email}
            onChange={newData}
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
            value={updatedData && updatedData.phone}
            onChange={newData}
          />
        </div>

        {/* Membership */}
        <div className="mb-3">
          <label className="form-label">Membership</label>
          <select
            className="form-select"
            name="membership"
            value={updatedData && updatedData.membership}
            onChange={newData}
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
            checked={updatedData && updatedData.gender === "male"}
            onChange={newData}
          />
          <label className="form-check-label">Male</label>
        </div>
        <div className="mb-3">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            value="Female"
            checked={updatedData && updatedData.gender === "female"}
            onChange={newData}
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

export default Update;
