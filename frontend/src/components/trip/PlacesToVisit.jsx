import { useSelector } from "react-redux"

const PlacesToVisit = () => {
  const data = useSelector((store)=> store.trip.value.data.places)
  const options = data?.split("Places to Visit: ")[1].split(", ");
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
    )
  }

export default PlacesToVisit