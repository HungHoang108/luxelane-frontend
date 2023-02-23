import React from "react";

import { Outlet } from "react-router-dom";

import Navigation from "./Navigation";
import Footer from "./Footer";

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
