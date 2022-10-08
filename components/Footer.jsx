import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 QCS Audio - All Rights Reserved™</p>
      <p className="icons">
        <a href="https://www.instagram.com/" title="instragram">
          <AiFillInstagram />
        </a>
        <a href="https://twitter.com/" title="twitter">
          <AiOutlineTwitter />
        </a>
      </p>
    </div>
  );
};

export default Footer;
