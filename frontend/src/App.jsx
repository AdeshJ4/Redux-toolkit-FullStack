import React from "react";
import NavBar from "./components/NavBar";
import UserForm from "./components/UserForm";
import { Route, Routes } from "react-router-dom";
import Read from "./components/Read";
import Update from "./components/Update";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Customer from "./pages/Customer";
import MovieForm from "./pages/MovieForm";
import CustomerForm from "./pages/CustomerForm";
import NoPage from "./pages/NoPage";

const App = () => {
  return (
    // <div className="App">
    //   <NavBar />
    //   <Routes>
    //     <Route path="/" element={<UserForm />} />
    //     <Route path="/read" element={<Read />} />
    //     <Route path="/edit/:id" element={<Update />} />
    //   </Routes>
    // </div>

    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="movies">
            <Route index element={<Movie />} />
            <Route path="new" element={<MovieForm />} />
            <Route path="edit/:id" element={<MovieForm />} />
          </Route>
          <Route path="customers">
            <Route index element={<Customer />} />
            <Route path="new" element={<CustomerForm />} />
            <Route path="edit/:id" element={<CustomerForm />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;