import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <div className="footer-box">
      <div className="footer">
        <div className="footer-social-link">
          <a className="footer-link" href="https://www.linkedin.com/in/vhunghoang/">
            <LinkedInIcon />
          </a>
          <a className="footer-link" href="https://twitter.com/">
            <TwitterIcon />
          </a>
          <a className="footer-link" href="https://github.com/HungHoang108/fs12-frontend-project-public">
            <GitHubIcon />
          </a>
        </div>
        <div className="footer-copyright">
          <p>© Hung Evan 2022</p>
          <p> React js, Redux, TypeScript, SCSS, & Jest</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
