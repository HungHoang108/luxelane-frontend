import React from "react";
import Navigation from "../navigation/nav.component";
import Footer from "../footer/footer.component";
import { Outlet } from "react-router-dom";

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
