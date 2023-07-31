import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import UserForm from "./Components/UserForm/UserForm";
import Dasboard from "./Components/Dashboard/Dasboard";
import Navigation from "./Components/Navigation/Navigation";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/dashboard" element={<Dasboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
