import React from "react";

import { Outlet } from "react-router-dom";

import Navigation from "../navigation/Navigation";
import Footer from "../footer/Footer";

const Root = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
      <Footer></Footer>
    </div>
  );
};

export default Root;
