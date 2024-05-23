import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// importing pages
import Dashboard from "./Pages/Dashboard";
import Articles from "./Pages/Articles";
import Help from "./Pages/Help";
import { ToastContainer } from "./Pages/Alert";
import Settings from "./Pages/Settings";

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
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </main>
      </Router>

      {/* container for alerts  */}
      <ToastContainer
        position="top-right"
        autoClose={100}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
