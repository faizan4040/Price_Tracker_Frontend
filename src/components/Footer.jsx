import { TiSocialFacebook } from "react-icons/ti";
import { RiTwitterXLine } from "react-icons/ri";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
// import qr from "@/assets/BrandLogo/QR.png";
import playstore from "@/assets/BrandLogo/playstore.webp";
import chrome from "@/assets/BrandLogo/chrome.webp";
import telegram from "@/assets/BrandLogo/telegram.webp";
import { Mail, MessageCircle, Send } from "lucide-react";
import logo from "@/assets/BrandLogo/meesho.webp";
import whatsapp from "@/assets/BrandLogo/whatsapp.png"
import telegram_logo from "@/assets/BrandLogo/telegram_logo.webp"
import gmail from "@/assets/BrandLogo/gmail.jpg"


const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <img src={logo} alt="Logo" className="w-32" />

          {/* Social */}
          <div className="text-center md:text-right">
            <p className="font-semibold text-lg">Social Media</p>
            <p className="text-sm mb-3 text-gray-300">
              Don't Miss To Follow Us On Our Social Network Accounts.
            </p>

            <div className="flex justify-center md:justify-end gap-5">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <TiSocialFacebook
                  size={28}
                  className="hover:text-blue-400 transition"
                />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <RiTwitterXLine
                  size={28}
                  className="hover:text-gray-300 transition"
                />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram
                  size={28}
                  className="hover:text-pink-400 transition"
                />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedin
                  size={28}
                  className="hover:text-blue-500 transition"
                />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer">
                <FaYoutube
                  size={28}
                  className="hover:text-red-500 transition"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-700 my-10"></div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-lg">
          {/* Column 1 */}
          <div>
            <ul className="space-y-4">
              <li>
                <a href="#" className="hover:text-gray-300 text-2xl font-bold">
                  Explore
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Extension
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <ul className="space-y-4">
              <li>
                <a href="#" className="hover:text-gray-300 text-2xl font-bold">
                  Price History Tracker
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Amazon Price History Tracker
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Flipkart Price History Tracker
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Myntra Price History Tracker
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
         

        <div>
          <ul className="space-y-4 text-white">
            <li className="flex items-center gap-3">
              <a href="#" className="hover:text-gray-300 text-2xl font-bold">
                Contact Us
              </a>
            </li>

            <li className="flex items-center gap-3">
              <img src={gmail} className="h-7 w-7" />
              <a
                href="mailto:cs@flipshope.com"
                className="hover:text-gray-300"
              >
                cs@flipshope.com
              </a>
            </li>

            <li className="flex items-center gap-3">
              <img src={telegram_logo} className="h-6 w-6" />
              <a href="#" className="hover:text-gray-300">
                Telegram support
              </a>
            </li>

            <li className="flex items-center gap-3">
              <img src={whatsapp} className="h-6 w-6"/>
              <a href="#" className="hover:text-gray-300">
                Whatsapp support
              </a>
            </li>
          </ul>
        </div>

          {/* Column 4 — QR + Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col items-start gap-6">
            <h3 className="font-bold text-2xl mb-3 text-white">Get It On</h3>
            {/* QR */}
            <div>
              {/* <img
                src={qr}
                alt="QR Code"
                className="w-32 h-32 md:w-57 md:h-52 -mr-1 object-contain"
              /> */}
            </div>

            {/* Buttons */}
            <div>
              <div className="space-y-3">
                {/* Google Play Store */}
                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gray-800 px-4 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-700 transition"
                >
                  <img src={playstore} className="w-8 h-8" />
                  <span className="text-lg text-gray-200">
                    Google Play Store
                  </span>
                </a>

                {/* Chrome Web Store */}
                <a
                  href="https://chromewebstore.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gray-800 px-4 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-700 transition"
                >
                  <img src={chrome} className="w-8 h-8" />
                  <span className="text-lg text-gray-200">
                    Chrome Web Store
                  </span>
                </a>

                {/* Telegram */}
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gray-800 px-4 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-700 transition"
                >
                  <img src={telegram} className="w-8 h-8" />
                  <span className="text-lg text-gray-200">
                    Telegram Channel
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 text-center text-sm md:text-base text-gray-300 space-y-4 bg-gray-800 py-6 rounded-lg">
          <p className="text-base md:text-lg text-gray-200">
            © 2025 Protean Mind Pvt. Ltd. All Rights Reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-gray-300 text-base md:text-lg">
            <a href="#" className="hover:text-white transition">
              Disclaimer
            </a>
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Extension Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms and Conditions
            </a>
            <a href="#" className="hover:text-white transition">
              Careers
            </a>
            <a href="#" className="hover:text-white transition">
              FAQ
            </a>
            <a href="#" className="hover:text-white transition">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
