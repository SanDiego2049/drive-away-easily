import { Shield, CheckCircle, Clock, Users, CreditCard } from "lucide-react";

export default function WhyUs() {
  const features = [
    {
      icon: Shield,
      title: "Trusted Vendors",
      description: "Verified rental partners across Nigeria",
    },
    {
      icon: CheckCircle,
      title: "Transparent Pricing",
      description: "No hidden fees, clear caution policy",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance",
    },
    {
      icon: Users,
      title: "Easy KYC",
      description: "Quick verification process",
    },
    {
      icon: CreditCard,
      title: "Refundable Caution",
      description: "Get your deposit back quickly",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Us?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-orange-500" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
