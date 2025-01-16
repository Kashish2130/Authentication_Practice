import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginpage";
import NextPage from "./pages/NextPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* <Route path = "/homepage" element = {}/> */}
        <Route path="/nextpage" element={<NextPage />} />
      </Routes>
    </Router>
  );
};

export default App;
