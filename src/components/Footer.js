import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
const Footer = () => {
  return (
    <div>
      <div className="flex flex-col max-h-screen">
        <footer className="p-2 bg-gray-800 text-xl text-white">
          <center className="p-2">
            © Dhruven | 2022
            <div className="float-right flex p-2">
              <a className="" href="https://github.com/dhruven-god">
                <FaGithub />
              </a>
              <a className="mx-4" href="www.linkedin.com/in/dhruven-god">
                <FaLinkedinIn />
              </a>
            </div>
          </center>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
