import { useSelector } from "react-redux";

const LocalDelicacies = () => {
  const data = useSelector((store) => store.trip.value.data.local_delicacies);
  const options = data?.split("Local Delicacies: ")[1].split(", ");
    return (
      <div className="mb-8">
        <ul className="list-disc list-inside">
        {options.map((option, i) => (
          <li key={i} className="mb-1">
            {option}
          </li>
        ))}
        <li>{data}</li>
      </ul>
      </div>
    )
  }
export default LocalDelicacies