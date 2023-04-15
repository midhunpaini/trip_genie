import { useSelector } from "react-redux";

const AccommodationOptions = () => {
  const data = useSelector((store) => store.trip.value.data.accommodation);
  const options = data?.split("Accommodation Options: ")[1].split(", ");
  return (
    <div className="mb-8">
      <ul className="list-disc list-inside">
        {options.map((option, i) => (
          <li key={i} className="mb-1">
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AccommodationOptions;
