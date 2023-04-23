import { useSelector } from "react-redux"

const TravelOptions = () => {
  const data = useSelector((store)=> store.trip.value.data.travel_options)
    return (
      <div className="mb-8">
        <ul>
        {data?.map((option, i) => (
          <li key={i} className="mb-1">
            {option}
          </li>
        ))}
        </ul>
      </div>
    )
  }

export default TravelOptions