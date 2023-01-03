import React from "react";

import { Outlet } from "react-router-dom";

import Navigation from "../routes/navigation/navigation.route";
import Footer from "../footer/footer.component";

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
