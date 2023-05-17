import { useState} from 'react'
import TripResultButton from './TripResultButton'
import Itinerary from './Itinerary'
import TravelOptions from './TravelOptions'
import { useSelector } from 'react-redux'
import SaveTrip from '../buttons/SaveTrip'
import Map from '../../Google/GoogleMap'
import Carousel from './Carousel'
import PlacesCarousal from './PlacesCarousal'
import Modal from '../Modal'



const TripSearchResult = () => {
  const [isSaved, setIsSaved] = useState(false);
  
  const itinerary =  useSelector(store => store.itinerary.value)
  const places_to_visit =  useSelector(store => store.place.value)
  const accommodation =  useSelector(store => store.accommodation.value)
  const local_delicacies =  useSelector(store => store.localDelicacy.value)
  const travel_options =  useSelector(store => store.travelOption.value)


  return (
    <div>
        {isSaved?<Modal message='Trip Saved Successfully'/>:null}
        <TripResultButton datas={itinerary} sectionName='Itinerary' component= { <Itinerary/> } />
        <TripResultButton datas={places_to_visit} sectionName ='Places to Visit' component={ <PlacesCarousal places = {places_to_visit?.data}/> }/>
        <TripResultButton datas={places_to_visit} sectionName='Map' component= { <Map places={places_to_visit?.data} /> } />
        <TripResultButton datas={local_delicacies} sectionName ='Local Delicacies' component={ <Carousel data={local_delicacies.data?.delicacies} card='cusine'/> }/>
        <TripResultButton datas={accommodation} sectionName ='Accommodation Options' component={ <Carousel data={accommodation?.data?.hotels} card='hotel'/> } />
        <TripResultButton datas={travel_options} sectionName ='Travel Options' component={<TravelOptions options={travel_options.data?.travel_options}/> }/>
        <SaveTrip  setIsSaved={setIsSaved}/>
    </div>
  )
}

export default TripSearchResult