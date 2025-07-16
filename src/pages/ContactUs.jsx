import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowLeft,
  User,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Contact form submitted:", formData);
    // You can add success message or redirect logic here
  };

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <button
            onClick={navigateToHome}
            className="inline-flex items-center text-orange-500 hover:text-orange-600 transition-colors duration-200 mb-6 group text-sm sm:text-base"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Home
          </button>

          <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-center text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-center text-gray-600 max-w-xl mx-auto text-sm sm:text-base px-2">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-2xl sm:text-3xl text-gray-900 mb-6 text-center ">
              Send us a Message
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone Field */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter message subject"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-vertical"
                  placeholder="Enter your message here..."
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center group"
              >
                <span className="mr-2">Send Message</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-sm">
          <h2 className="text-2xl sm:text-3xl text-gray-900 mb-6 text-center ">
            Contact Information
          </h2>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-0 sm:mr-4 mb-3 sm:mb-0 flex-shrink-0">
                <Mail className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className=" text-gray-900 mb-1">Email</h3>
                <span className="flex flex-col sm:flex-row gap-2 text-gray-600 text-sm sm:text-base">
                  <p>support@company.com,</p>
                  <p>info@company.com</p>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-0 sm:mr-4 mb-3 sm:mb-0 flex-shrink-0">
                <Phone className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className=" text-gray-900 mb-1">Phone</h3>
                <span className="flex flex-col sm:flex-row gap-2 text-gray-600 text-sm sm:text-base">
                  <p>+1 (555) 123-4567,</p>
                  <p>+1 (555) 987-6543</p>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-0 sm:mr-4 mb-3 sm:mb-0 flex-shrink-0">
                <MapPin className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className=" text-gray-900 mb-1">Office</h3>
                <span className="text-gray-600 text-sm sm:text-base">
                  123 Business Street, Suite 100, City, State 12345
                </span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-center sm:text-left">
            <h3 className=" text-gray-900 mb-4 text-lg sm:text-xl">
              Business Hours
            </h3>
            <div className="space-y-2 text-sm sm:text-base text-gray-600 max-w-xs sm:max-w-full mx-auto sm:mx-0">
              <div className="flex justify-between">
                <span className="flex-shrink-0">Monday - Friday</span>
                <span className="flex-shrink-0">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="flex-shrink-0">Saturday</span>
                <span className="flex-shrink-0">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="flex-shrink-0">Sunday</span>
                <span className="flex-shrink-0">Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-12 text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <p className="text-sm sm:text-base text-gray-500">
          Need immediate assistance? Call us at{" "}
          <a
            href="tel:+15551234567"
            className="text-orange-500 hover:text-orange-600 transition-colors duration-200"
          >
            +1 (555) 123-4567
          </a>{" "}
          or email{" "}
          <a
            href="mailto:support@company.com"
            className="text-orange-500 hover:text-orange-600 transition-colors duration-200"
          >
            support@company.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
