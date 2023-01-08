import { ThemeProvider, createTheme } from "@mui/material/styles";

import Categories from "../../components/categories/categories.component";
import { useAppSelector } from "../../hooks/reduxHook";
import "./home.component.styles.scss";
import pic from "./kitty-cat.jpg";

const Home = () => {
  const darkModeStatus = useAppSelector((state) => state.DarkModeReducer);
  const myTheme = createTheme({
    palette: {
      mode: darkModeStatus ? "dark" : "light",
    },
  });
  return (
    <ThemeProvider theme={myTheme}>
      <div>
        <div className="navBox-img">
          <img src={pic} alt="" />
        </div>
        <div className="home">
          <Categories />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;
