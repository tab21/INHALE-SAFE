import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// importing pages
import Dashboard from "./Pages/Dashboard";
import Articles from "./Pages/Articles";
import Help from "./Pages/Help";
import { ToastContainer } from "./Pages/Alert";

// importing components
import Navbar from "./Components/Navbar/Navbar";

// main app function
function App() {
  return (
    <div className="App flex justify-end  ">
      <Router>
        <aside className="fixed left-0 top-0 h-screen w-1/5 p-3 bg-mainBlue">
          <Navbar />
        </aside>

        <main className="w-4/5 ">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </main>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
