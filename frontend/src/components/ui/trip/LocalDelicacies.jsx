import { useSelector } from "react-redux";

const LocalDelicacies = () => {
  const data = useSelector((store) => store.trip.value.data.local_delicacies);
    return (
      <div className="mb-8">
        
      </div>
    )
  }
export default LocalDelicacies