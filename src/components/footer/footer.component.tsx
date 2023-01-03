import "./footer.style.scss";

const Footer = () => {
  return (
    <div className="footer-box">
      <div className="footer">
        <div className="footer-social-link">
          <a
            className="footer-link"
            href="https://www.linkedin.com/in/vhunghoang/"
          >
            {" "}
            LinkedIn
          </a>
          <a className="footer-link" href="https://twitter.com/">
            {" "}
            Twitter
          </a>
          <a className="footer-link" href="https://github.com/HungHoang108">
            {" "}
            Github
          </a>
        </div>
        <div className="footer-copyright">
          <p>© Made by Evan Hung. 2022</p>
          <p> React TypeScript Redux & SCSS</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
