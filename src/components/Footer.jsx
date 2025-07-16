import {
  Facebook,
  Twitter,
  Instagram,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import backgroundImage from "../assets/backgroundImage.jpg";
import { useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { name: "About Us", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const navigateToProducts = () => {
    navigate("/cars");
  };

  return (
    <footer className="relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Car on road"
          className="w-full h-100 object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* CTA Section */}
        <div className="text-center py-16 px-4">
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            Ready to Hit the Road?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers who trust us for their travel
            needs.
          </p>
          <button
            onClick={navigateToProducts}
            className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg transition-colors duration-200 text-lg"
          >
            Start Your Booking
          </button>
        </div>

        {/* Footer Links */}
        <div className="bg-gray-800 bg-opacity-90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Brand Section */}
              <div className="lg:col-span-1">
                <h3 className="text-xl text-white mb-4">Ryde&trade;</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Your trusted partner for car rentals across Nigeria.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg text-white mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-lg text-white mb-4">Support</h4>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300 text-sm">
                    <Phone className="w-4 h-4 mr-2 text-orange-400" />
                    +234 98765 43210
                  </li>
                  <li className="flex items-center text-gray-300 text-sm">
                    <Mail className="w-4 h-4 mr-2 text-orange-400" />
                    help@driveaway.com
                  </li>
                  <li className="flex items-center text-gray-300 text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-orange-400" />
                    Lagos, Nigeria
                  </li>
                </ul>
              </div>

              {/* Stay Connected */}
              <div className="overflow-x-hidden lg:col-span-1">
                <h4 className="text-lg text-white mb-4">Stay Connected</h4>
                <div className="flex space-x-3 mb-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                      <social.icon className="w-5 h-5 text-white" />
                    </a>
                  ))}
                </div>
                <div className="flex min-w-0">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 min-w-0 px-3 py-2 bg-gray-700 text-white placeholder-gray-400 rounded-l-lg focus:outline-none text-sm"
                  />
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 lg:px-4 py-2 rounded-r-lg transition-colors duration-200 text-sm font-medium whitespace-nowrap flex-shrink-0">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <p className="text-center text-gray-400 text-sm">
                © {new Date().getFullYear()} Ryde&trade;. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
