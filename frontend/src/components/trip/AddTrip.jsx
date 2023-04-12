import addImage from "../../assets/images/add.png";

const AddTrip = ({setShowForm}) => {

  return (
    <div className="mt-28">
      <h1 className="text-2xl">Add Trip</h1>
      <button
        onClick={() => {
          setShowForm(true)
        }}
        className=" flex justify-center items-center w-[15rem] h-[6.5rem] rounded-md bg-[#dba661b9] hover:bg-[#a57c48] focus:outline-none focus:ring-2 focus:ring-yellow-300"
      >
        <img className="w-8" src={addImage} alt="add" />
      </button>
    </div>
  );
};

export default AddTrip;
