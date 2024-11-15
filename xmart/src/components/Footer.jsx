import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faItchIo, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="mb-4">
          &copy; {new Date().getFullYear()} BracUChickens. All rights reserved. || Designed By: Tahmid, Tasnim, Riz, Antor
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/TahmidRaven/ShopieeMart"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faGithub} className="text-xl" />
          </a>

          <a
            href="https://ravendeath.itch.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faItchIo} className="text-xl" />
          </a>

          <a
            href="https://www.facebook.com/tahmidxraven/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faFacebook} className="text-xl" />
          </a>

          <a
            href="https://www.instagram.com/tahmid_raven/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faInstagram} className="text-xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
