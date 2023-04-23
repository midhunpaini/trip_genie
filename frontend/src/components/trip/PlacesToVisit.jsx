import PlacesCarousal from "../ui/PlacesCarousal"

const PlacesToVisit = ({datas}) => {
  console.log(datas,'inside places ro visit *******************************')
    return (
      <div className="mb-8">
          <PlacesCarousal places = {datas}/>
      </div>
    )
  }

export default PlacesToVisit