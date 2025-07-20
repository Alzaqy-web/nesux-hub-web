import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear(); // Mendapatkan tahun saat ini secara dinamis

  return (
    <footer className="bg-gray-700 text-gray-300 py-8"> {/* Latar belakang gelap, teks abu-abu, padding vertikal */}
      <div className="container mx-auto px-4"> {/* Kontainer utama, di tengah, padding horizontal */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* Kolom 1: Informasi Brand/Copyright */}
          <div className="text-center md:text-left">
            <h3 className="text-white text-lg font-bold mb-2">NaxusHub</h3>
            <p>&copy; {currentYear} NaxusHub. All rights reserved.</p>
            <p className="text-sm">Built with ❤️ in Palu, Central Sulawesi.</p>
          </div>

          {/* Kolom 2: Navigasi/Links */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Kolom 3: Social Media (contoh sederhana) */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-2">Follow Us</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="hover:text-white transition-colors duration-200">
                {/* Kamu bisa ganti ini dengan ikon SVG dari Heroicons atau Font Awesome */}
                <span className="sr-only">Facebook</span>
                <i className="fab fa-facebook-f text-xl"></i> {/* Contoh jika pakai Font Awesome */}
                {/* Atau gunakan div placeholder: */}
                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">FB</div>
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                <span className="sr-only">Twitter</span>
                <i className="fab fa-twitter text-xl"></i> {/* Contoh jika akai Font Awesome */}
                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">TW</div>
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                <span className="sr-only">Instagram</span>
                <i className="fab fa-instagram text-xl"></i> {/* Contoh jika pakai Font Awesome */}
                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">IG</div>
              </a>
            </div>
          </div>
        </div>


        <hr className="border-gray-700 my-8" />

        <div className="text-center text-sm">
          <p>Connecting you to the best events.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;