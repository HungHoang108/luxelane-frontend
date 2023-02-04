import Categories from "../../components/categories/Categories";
import Subcribe from "../../components/subcribe/Subcribe";
import pic from "../../styles/image/homepage.jpg";

const Home = () => {
  return (
    <div>
      <div className="navBox-img">
        <img src={pic} alt="" />
      </div>
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
