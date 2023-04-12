const Itinerary = ({ itinerary }) => {
  return (
    <div className="mb-8">
      <ul className="list-disc list-inside">
        {itinerary?.split('\n\n').map((day, i) => (
          <li key={i} className="mb-1">{day}</li>
        ))}
      </ul>
    </div>
  )
}

export default Itinerary