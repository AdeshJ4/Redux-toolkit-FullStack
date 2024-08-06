import React from "react";
import "./PopupUserRead.css";
import { useSelector } from "react-redux";

const PopupUserRead = ({ id, showPopup, setShowPopup }) => {
  const { customers } = useSelector((state) => state.customers);

  const singleCustomer = customers.filter((user) => user._id === id);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="modalHeader">
          <h2>User Details</h2>
        </div>
        <div className="modalContent">
          <h5>Name: {singleCustomer[0].name}</h5>
          <h5>Email: {singleCustomer[0].email}</h5>
          <h5>Phone: {singleCustomer[0].phone}</h5>
          <h5>Membership: {singleCustomer[0].membership}</h5>
          <h5>Gender: {singleCustomer[0].gender}</h5>
        </div>
        <div className="modalFooter">
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default PopupUserRead;
