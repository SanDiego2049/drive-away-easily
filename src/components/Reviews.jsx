import { Star } from "lucide-react";

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      name: "Felix Michael",
      initials: "RK",
      rating: 5,
      review:
        "Amazing service! The car was spotless and the booking process was super smooth.",
    },
    {
      id: 2,
      name: "Oluwole Toluwani",
      initials: "PS",
      rating: 5,
      review:
        "Got my caution fee back within 2 days. Very transparent pricing and great support.",
    },
    {
      id: 3,
      name: "Ibrahim Chater",
      initials: "AP",
      rating: 5,
      review:
        "Perfect for our family trip to Goa. The SUV was comfortable and well-maintained.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-gray-900 mb-4">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm mr-3">
                  {review.initials}
                </div>
                <div>
                  <h3 className="text-gray-900">{review.name}</h3>
                  <div className="flex items-center">
                    {[...Array(review.rating)].map((_, index) => (
                      <Star
                        key={index}
                        className="w-4 h-4 text-orange-500 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                "{review.review}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
