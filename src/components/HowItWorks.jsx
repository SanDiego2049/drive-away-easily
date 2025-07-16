import {
  User,
  Upload,
  Car,
  CreditCard,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: User,
      title: "Sign Up",
      description: "Create your account in seconds",
      color: "bg-orange-500",
    },
    {
      icon: Upload,
      title: "Upload ID",
      description: "Quick KYC verification",
      color: "bg-orange-500",
    },
    {
      icon: Car,
      title: "Choose Vehicle",
      description: "Pick from our fleet",
      color: "bg-orange-500",
    },
    {
      icon: CreditCard,
      title: "Pay Online",
      description: "Secure payment gateway",
      color: "bg-orange-500",
    },
    {
      icon: CheckCircle,
      title: "Enjoy the Ride",
      description: "Hit the road!",
      color: "bg-orange-500",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl text-gray-900 mb-4">
            How It Works
          </h2>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                {/* Step Card */}
                <div className="flex flex-col items-center text-center max-w-xs">
                  {/* Icon Circle */}
                  <div
                    className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Step Content */}
                  <h3 className="text-lg text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>

                {/* Arrow (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="mx-6 flex-shrink-0">
                    <ChevronRight className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="flex items-start space-x-4">
                  {/* Icon Circle */}
                  <div
                    className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center shadow-lg flex-shrink-0`}
                  >
                    <step.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <h3 className="text-lg text-gray-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>

                {/* Vertical Line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-300 transform -translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
