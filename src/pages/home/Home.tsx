import { ThemeProvider, createTheme } from "@mui/material/styles";

import Categories from "../../components/categories/Categories";
import { useAppSelector } from "../../hooks/reduxHook";
import pic from "../../styles/image/kitty-cat.jpg";

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
