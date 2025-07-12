import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does KYC work?",
      answer:
        "Our KYC (Know Your Customer) process is simple and secure. You'll need to provide a valid government-issued ID, proof of address, and a selfie for verification. The entire process takes just 5-10 minutes and can be completed online. Once verified, you can book vehicles instantly without repeating the process.",
    },
    {
      question: "When do I get my caution fee back?",
      answer:
        "Your caution fee is refunded within 24-48 hours after returning the vehicle in good condition. We conduct a quick inspection to ensure there's no damage, and once cleared, the refund is processed directly to your original payment method. You'll receive a confirmation email once the refund is initiated.",
    },
    {
      question: "Can I cancel a booking?",
      answer:
        "Yes, you can cancel your booking up to 24 hours before the rental start time for a full refund. Cancellations made within 24 hours are subject to a 25% cancellation fee. Emergency cancellations due to unforeseen circumstances are reviewed on a case-by-case basis. You can cancel directly through our app or website.",
    },
    {
      question: "What if the vehicle breaks down?",
      answer:
        "Don't worry! We provide 24/7 roadside assistance for all our vehicles. If you experience any mechanical issues, simply call our emergency hotline and we'll arrange immediate help. We'll either fix the issue on-site or provide a replacement vehicle at no extra cost. Your safety and convenience are our top priorities.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <button
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-inset"
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-medium text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ease-in-out flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-4 pt-3">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
