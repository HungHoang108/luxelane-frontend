const Subcribe = () => {
  return (
    <div>
      <section className="subcrible-box">
        <title>Subscribe for newest updates</title>
        <h1>Subscribe for newest updates</h1>
        <div className="subcrible-box-animation">
          <div className="animated-text-container">
            <h4>Weekly discounts up to 35% all products</h4>
          </div>
        </div>
        <label htmlFor="email" className="label-name"></label>
        <input placeholder="Your email" type="email" id="email" /> <br />
        <button>SUBCRIBE</button>
      </section>
    </div>
  );
};

export default Subcribe;
