import React from "react";
import travel from "../../assets/images/travel.jpg";
import itirenary from "../../assets/images/itirenary.jpg";
const data = [
  {
    id:1,
    feature: "Customized Itinerary",
    image: itirenary,
    detail:
      "Our AI-powered trip planner creates personalized itineraries based on your destination, budget, and preferences.",
  },
  {
    id:2,
    feature: "Travel Options",
    image: travel,
    detail:
      "Choose from a variety of travel options, including flights, trains, and rental cars, to create your perfect trip.",
  },
  {
    id:3,
    feature: "Local Delicacies",
    image:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    datail:
      "Discover the best local restaurants and cuisines to experience the culture of your destination.",
  },
  {
    id:4,
    feature: "Hotel Recommendations",
    image:
      "https://www.intechnic.com/hubfs/Blog/Featured%20Images/Best%20Hotel%20Website%20Designs.jpg",
    detail:
      "Get personalized hotel recommendations based on your budget, location, and preferences.",
  },
];
function Features() {
  return (
    <section className="features py-16 px-4 max-w-7xl mx-auto">
      <h3 className="text-2xl mb-8 text-center">Features</h3>
      <ul className="flex flex-wrap justify-between">
        {data.map((item) => (
          <li
            key={item.id}
            className="w-full md:w-1/2 lg:w-1/2 p-8 bg-white mb-8 md:mb-0 shadow-md"
          >
            <img
              src={item.image}
              alt={item.feature}
              className="block mx-auto mb-4"
            />
            <h4 className="text-lg mb-2">{item.feature}</h4>
            <p className="text-base">{item.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Features;
