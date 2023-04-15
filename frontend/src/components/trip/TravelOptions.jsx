import { useSelector } from "react-redux"

const TravelOptions = () => {
  const data = useSelector((store)=> store.trip.value.data.travel_options)
  const options = data?.split("Travel Options: ")[1].split(", ");
    return (
      <div className="mb-8">
        <ul>
        {options.map((option, i) => (
          <li key={i} className="mb-1">
            {option}
          </li>
        ))}
        </ul>
      </div>
    )
  }

export default TravelOptions