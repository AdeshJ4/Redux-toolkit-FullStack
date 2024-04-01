import React from "react";
import "./PopupUserRead.css";
import { useSelector } from "react-redux";

const PopupUserRead = ({ id, showPopup, setShowPopup }) => {
  const allUsers = useSelector((state) => state.user.users);

  const singleUser = allUsers.filter((user) => user._id === id);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="modalHeader">
          <h2>User Details</h2>
        </div>
        <div className="modalContent">
          <h5>Name: {singleUser[0].name}</h5>
          <h5>Email: {singleUser[0].email}</h5>
          <h5>Phone: {singleUser[0].phone}</h5>
          <h5>Membership: {singleUser[0].membership}</h5>
          <h5>Gender: {singleUser[0].gender}</h5>
        </div>
        <div className="modalFooter">
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default PopupUserRead;

// import React from "react";
// import "./PopupUserRead.css";
// import { useSelector } from "react-redux";

// const PopupUserRead = ({ id, showPopup, setShowPopup }) => {
//   const allUsers = useSelector((state) => state.user.users);

//   const singleUser = allUsers.filter((user) => user._id === id);

//   return (
//     <div className="modalBackground">
//       <div className="modalContainer">
//         <h5>{singleUser[0].name}</h5>
//         <h5>{singleUser[0].email}</h5>
//         <h5>{singleUser[0].phone}</h5>
//         <h5>{singleUser[0].membership}</h5>
//         <h5>{singleUser[0].gender}</h5>
//         <button onClick={() => setShowPopup(false)}>Close</button>
//       </div>
//     </div>
//   );
// };

// export default PopupUserRead;
