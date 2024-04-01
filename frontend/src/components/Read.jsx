import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../redux/slices/userDetailsSlice";
import PopupUserRead from "./PopupUserRead";
import { Link } from "react-router-dom";

const Read = () => {
  const dispatch = useDispatch();
  const { users, count, isLoading, searchData } = useSelector(
    (state) => state.user
  );
  const [showPopup, setShowPopup] = useState(false);
  const [selectGender, setSelectedGender] = useState("");
  const [id, setId] = useState();

  useEffect(() => {
    dispatch(getAllUsers());
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

      {users &&
        users
          .filter((user) => {
            if (searchData.length === 0) {
              return user;
            } else {
              // you can filter by name, email, phone...
              return user.name.toLowerCase().includes(searchData.toLowerCase());
            }
          })
          .filter((user) => {
            if (selectGender === "Male") {
              return user.gender === selectGender.toLowerCase();
            } else if (selectGender === "Female") {
              return user.gender === selectGender.toLowerCase();
            } else {
              return user;
            }
          })

          .map((user) => (
            <div
              key={user._id}
              className="card mx-auto w-50 my-2"
              style={{ width: "18rem" }}
            >
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                <h6 className="card-subtitle mb-2 text-muted">{user.phone}</h6>
                <h6 className="card-subtitle mb-2 text-muted">{user.gender}</h6>
                <h6 className="card-subtitle mb-2 text-muted">
                  {user.membership}
                </h6>

                <button
                  className="card-link"
                  onClick={() => [setId(user._id), setShowPopup(true)]}
                >
                  View
                </button>

                <Link to={`/edit/${user._id}`} className="card-link">
                  Edit
                </Link>
                <Link
                  onClick={() => dispatch(deleteUser(user._id))}
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
