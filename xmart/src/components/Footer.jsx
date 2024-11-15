import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faItchIo, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-800 via-indigo-500 to-indigo-800 text-white py-8">
      <div className="container mx-auto text-center">
        {/* Footer Text */}
        <p className="mb-6 text-sm md:text-base font-light">
          &copy; {new Date().getFullYear()} <span className="font-bold text-cyan-200">BracUChickens</span>. All rights reserved. <br /> 
          Designed By: <span className="text-orange-200 font-medium">Tahmid, Tasnim, Riz, Antor</span>
        </p>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/TahmidRaven/ShopieeMart"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-300 transition-colors"
          >
            <FontAwesomeIcon icon={faGithub} className="text-2xl" />
          </a>

          <a
            href="https://ravendeath.itch.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-300 transition-colors"
          >
            <FontAwesomeIcon icon={faItchIo} className="text-2xl" />
          </a>

          <a
            href="https://www.facebook.com/tahmidxraven/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-300 transition-colors"
          >
            <FontAwesomeIcon icon={faFacebook} className="text-2xl" />
          </a>

          <a
            href="https://www.instagram.com/tahmid_raven/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-300 transition-colors"
          >
            <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
