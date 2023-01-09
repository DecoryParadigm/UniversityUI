import "./footer.scss";
import Logo from "../../assets/images/logo.svg";

const Footer = () => {
  return (
    <>
      <div className="footer-wrapper">
        <div className="content-holder">
          <div className="logo-holder">
            <img id="logo" src={Logo} alt="logo"></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
