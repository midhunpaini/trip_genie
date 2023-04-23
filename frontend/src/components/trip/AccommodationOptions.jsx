import { useSelector } from "react-redux";

const AccommodationOptions = () => {
  const data = useSelector((store) => store.trip.value.data.accommodation_options);
  return (
    <div className="mb-8">
      <ul className="list-disc list-inside">
        {data.map((option, i) => (
          <li key={i} className="mb-1">
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AccommodationOptions;
