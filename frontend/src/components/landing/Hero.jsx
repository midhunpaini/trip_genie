import heroImage from "../../assets/images/hero.jpg";
import StartButton from "./StartTripButton";

const Hero = () => {
  return (
    <section
      className="hero relative w-full"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        height: "650px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="hero-content text-center max-w-2xl mx-auto">
        <h2 className="text-5xl md:text-5xl text-white font-bold leading-tight mb-4">
          Discover Your Dream Destination
        </h2>
        <p className="text-xl md:text-2xl py-3 text-white mb-8">
          With our AI-powered trip planner, you can easily create your perfect
          itinerary and explore new places. Whether you're looking for a
          relaxing beach vacation or an exciting city break, we've got you
          covered.
        </p>
        <StartButton value = 'Get Started'/>
      </div>
    </section>
  );
};

export default Hero;
