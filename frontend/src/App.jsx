import React from "react";
import NavBar from "./components/NavBar";
import UserForm from "./components/UserForm";
import { Route, Routes } from "react-router-dom";
import Read from "./components/Read";
import Update from "./components/Update";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/read" element={<Read />} />
        <Route path="/edit/:id" element={<Update />} />
      </Routes>
    </div>
  );
};

export default App;
