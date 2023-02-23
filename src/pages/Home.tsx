import Categories from "../components/Categories";
import Subcribe from "../components/Subcribe";
import pic from ".././styles/image/homepage.jpg";

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
