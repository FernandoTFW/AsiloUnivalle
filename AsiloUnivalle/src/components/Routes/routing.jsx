import React from "react";
import { Routes, Route } from "react-router-dom";
import ListCamp from "../../Views/ManageCamp/ListCamp";

const Routing = () => {
  return (
      <Routes>
        <Route path="/Campaings" element={<ListCamp/>} />
      </Routes>
  );
};

export default Routing;
