import React from "react";
import { Routes, Route } from "react-router-dom";
import ListCamp from "../../Views/ManageCamp/ListCamp";
import FormCampaing from "../../Views/ManageCamp/NewCampaing/FormCampaing";

const Routing = () => {
  return (
      <Routes>
        <Route path="/Campaings" element={<ListCamp/>} />
        <Route path="/NewCampaing" element={<FormCampaing/>} />
      </Routes>
  );
};

export default Routing;
