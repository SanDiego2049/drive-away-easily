import {
  Car,
  Users,
  Shield,
  Star,
  Award,
  Clock,
  Heart,
  Zap,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";

const AboutUs = () => {
  const navigate = useNavigate();

  const stats = [
    { number: "10,000+", label: "Happy Customers", icon: Users },
    { number: "5,000+", label: "Vehicles Rented", icon: Car },
    { number: "1+", label: "Years Experience", icon: Clock },
    { number: "4.9/5", label: "Customer Rating", icon: Star },
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Reliability",
      description:
        "We believe in building lasting relationships through transparency and reliability in every transaction.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description:
        "Your satisfaction is our priority. We go above and beyond to ensure you drive away happy.",
    },
    {
      icon: Award,
      title: "Quality Assured",
      description:
        "Every vehicle in our inventory undergoes rigorous inspection to meet our high-quality standards.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "We embrace technology to make car renting simple, fast, and enjoyable for everyone.",
    },
  ];

  const team = [
    {
      name: "Sarah Ify",
      role: "Product Manager",
      image:
        "https://imgs.search.brave.com/AzC7QUcHJ87_u8zgkbs4HOK0qzsf1L-7UPaBvFBaBRw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTIv/MTg5LzI2Ni9zbWFs/bC91c2VyLW1hbi1h/Y2NvdW50LXBlcnNv/bi1wZW9wbGUtaGFs/Zi1ib2R5LWhlYWQt/c3RpY2ttYW4tc3Rp/Y2stZmlndXJlLXBy/b2ZpbGUtc2lsaG91/ZXR0ZS1uZXR3b3Jr/LWNvbnRhY3QtYmxh/Y2std2hpdGUtc2ln/bi1pY29uLXNoYXBl/LW91dGxpbmUtdmVj/dG9yLmpwZw",
      description:
        "Devoted to crafting personalized solutions that turn customers into lifelong advocates.",
    },
    {
      name: "Kelvin Akproko",
      role: "Backend Developer",
      image:
        "https://imgs.search.brave.com/AzC7QUcHJ87_u8zgkbs4HOK0qzsf1L-7UPaBvFBaBRw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTIv/MTg5LzI2Ni9zbWFs/bC91c2VyLW1hbi1h/Y2NvdW50LXBlcnNv/bi1wZW9wbGUtaGFs/Zi1ib2R5LWhlYWQt/c3RpY2ttYW4tc3Rp/Y2stZmlndXJlLXBy/b2ZpbGUtc2lsaG91/ZXR0ZS1uZXR3b3Jr/LWNvbnRhY3QtYmxh/Y2std2hpdGUtc2ln/bi1pY29uLXNoYXBl/LW91dGxpbmUtdmVj/dG9yLmpwZw",
      description:
        "Expert in matching customers with their perfect vehicle, ensuring every purchase is the right fit.",
    },
    {
      name: "Oluwole Habibi",
      role: "Product Designer 1",
      image:
        "https://imgs.search.brave.com/AzC7QUcHJ87_u8zgkbs4HOK0qzsf1L-7UPaBvFBaBRw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTIv/MTg5LzI2Ni9zbWFs/bC91c2VyLW1hbi1h/Y2NvdW50LXBlcnNv/bi1wZW9wbGUtaGFs/Zi1ib2R5LWhlYWQt/c3RpY2ttYW4tc3Rp/Y2stZmlndXJlLXBy/b2ZpbGUtc2lsaG91/ZXR0ZS1uZXR3b3Jr/LWNvbnRhY3QtYmxh/Y2std2hpdGUtc2ln/bi1pY29uLXNoYXBl/LW91dGxpbmUtdmVj/dG9yLmpwZw",
      description:
        "Dedicated to ensuring exceptional customer service and building long-term relationships.",
    },
    {
      name: "Ali Mayowa",
      role: "Product Designer 2",
      image:
        "https://imgs.search.brave.com/AzC7QUcHJ87_u8zgkbs4HOK0qzsf1L-7UPaBvFBaBRw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTIv/MTg5LzI2Ni9zbWFs/bC91c2VyLW1hbi1h/Y2NvdW50LXBlcnNv/bi1wZW9wbGUtaGFs/Zi1ib2R5LWhlYWQt/c3RpY2ttYW4tc3Rp/Y2stZmlndXJlLXBy/b2ZpbGUtc2lsaG91/ZXR0ZS1uZXR3b3Jr/LWNvbnRhY3QtYmxh/Y2std2hpdGUtc2ln/bi1pY29uLXNoYXBl/LW91dGxpbmUtdmVj/dG9yLmpwZw",
      description:
        "Committed to transforming every interaction into a meaningful connection that creates lasting value.",
    },
    {
      name: "Oreoluwa Alaba",
      role: "Frontend Developer",
      image:
        "https://imgs.search.brave.com/AzC7QUcHJ87_u8zgkbs4HOK0qzsf1L-7UPaBvFBaBRw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTIv/MTg5LzI2Ni9zbWFs/bC91c2VyLW1hbi1h/Y2NvdW50LXBlcnNv/bi1wZW9wbGUtaGFs/Zi1ib2R5LWhlYWQt/c3RpY2ttYW4tc3Rp/Y2stZmlndXJlLXBy/b2ZpbGUtc2lsaG91/ZXR0ZS1uZXR3b3Jr/LWNvbnRhY3QtYmxh/Y2std2hpdGUtc2ln/bi1pY29uLXNoYXBl/LW91dGxpbmUtdmVj/dG9yLmpwZw",
      description:
        "Passionate about delivering experiences that exceed expectations and foster unwavering trust.",
    },
  ];

  const navigateToProducts = () => {
    navigate("/cars");
  };

  const navigateToContactUs = () => {
    navigate("/contact");
  };

  return (
    <section className="min-h-screen bg-gray-50 w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white pb-20">
        <Navbar />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl  mt-20 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            About Drive Away Easily
          </h1>
          <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            We're passionate about making car ownership accessible, affordable,
            and enjoyable for everyone.
          </p>
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
            <Car className="w-6 h-6" />
            <span className="font-medium">
              Your trusted automotive partner since 2025
            </span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4 group-hover:bg-orange-200 transition-colors duration-300">
                  <stat.icon className="w-8 h-8 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2025, Drive Away Easily started with a simple
                mission: to revolutionize how people rent cars. We noticed that
                car shopping was often stressful, time-consuming, and filled
                with uncertainty.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our founders, passionate automotive enthusiasts, decided to
                create a different kind of dealership—one that prioritizes
                transparency, quality, and customer satisfaction above all else.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we're proud to be one of the most trusted names in
                automotive retail, helping thousands of customers find their
                perfect vehicle every year.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1426&q=80"
                alt="Car dealership"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape how we serve
              our customers every day.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center group hover:bg-gray-50 p-6 rounded-lg transition-colors duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4 group-hover:bg-orange-200 transition-colors duration-300">
                  <value.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our dedicated team of automotive experts is here to help you find
              the perfect vehicle.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-orange-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Drive Away Easily?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover our amazing selection of vehicles and experience the
            difference of working with a trusted partner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={navigateToProducts}
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              View Our Inventory
            </button>
            <button
              onClick={navigateToContactUs}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors duration-200"
            >
              Contact Us Today
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AboutUs;
