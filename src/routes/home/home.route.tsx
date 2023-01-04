
import Bestseller from "../../components/bestseller/bestseller.component";
import Categories from "../../components/categories/categories.component";
import "./home.component.styles.scss";
import pic from "./kitty-cat.jpg"

const Home = () => {
  return (
    <div>
      <div className="navBox-img">
        <img
          src={pic}
          alt=""
        />
      </div>

      <div className="home">
        <Categories />
        {/* <Bestseller /> */}
      </div>
    </div>
  );
};

export default Home;
