import addImage from "../../../assets/images/add.png";

const AddTrip = ({setShowForm}) => {

  return (
    <div className="mt-10 sm:mt-28 bg-gray-50">
      <h1 className="text-2xl sm:text-3xl text-center mb-4">Add Trip</h1>
      <button
        onClick={() => {
          setShowForm(true)
        }}
        className="flex justify-center items-center w-32 sm:w-48 h-14 sm:h-16 rounded-md bg-[#dba661b9] hover:bg-[#a57c48] focus:outline-none focus:ring-2 focus:ring-yellow-300"
      >
        <img className="w-8 sm:w-10" src={addImage} alt="add" />
      </button>
    </div>
  );
};

export default AddTrip;
