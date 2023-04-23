import { useSelector } from "react-redux";

const Itinerary = () => {
  const data = useSelector((store) => store.itinerary.value.data.itinerary);
  return (
    <div className="mb-8">
      <ul className="list-disc list-inside">
        {data.map((day) => (
          <li key={day}>{day}</li>
        ))}
      </ul>
    </div>
  );
};

export default Itinerary;
