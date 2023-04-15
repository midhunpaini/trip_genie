import { useSelector } from "react-redux";

const Itinerary = () => {
  const data = useSelector((store) => store.trip.value.data);
  console.log(data)
  return (
    <div className="mb-8">
      <ul className="list-disc list-inside">
        {data.itinerary
          ?.split("\n\n")
          .filter((line) => line.startsWith("Day"))
          .map((day, i) => (
            <li key={i} className="mb-1">
              {day}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Itinerary;
