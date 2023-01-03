import Bestseller from "../../bestseller/bestseller.component";
import Categories from "../../categories/categories.component";
import "./home.component.styles.scss";

const Home = () => {
  return (
    <div>
      <div className="navBox-img">
        <img
          src="https://burst.shopifycdn.com/photos/kitty-cat-helps-at-work.jpg"
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
