import Categories from "../../components/categories/Categories";
import Subcribe from "../../components/email-subcribe/Subcribe";
import pic from "../../styles/image/kitty-cat.jpg";

const Home = () => {
  return (
    <div>
      <div className="navBox-img">{/* <img src={pic} alt="" /> */}</div>
      <div className="home">
        <Categories />
      </div>
      <div>
        <Subcribe />
      </div>
    </div>
  );
};

export default Home;
