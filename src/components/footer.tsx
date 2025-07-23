import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-5 bg-gray-800 py-4 text-gray-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <h3 className="mb-2 text-lg font-bold text-white">NaxusHub</h3>
          </div>
          <div className="text-center md:text-left">
            <h4 className="mb-2 font-semibold text-white">Quick Links</h4>
            <ul className="">
              <li>
                <a
                  href="#"
                  className="transition-colors duration-200 hover:text-white"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors duration-200 hover:text-white"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors duration-200 hover:text-white"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors duration-200 hover:text-white"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
