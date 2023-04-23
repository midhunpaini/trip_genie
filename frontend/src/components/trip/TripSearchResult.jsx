import React from 'react'
import TripResultButton from './TripResultButton'
import Itinerary from './Itinerary'
import PlacesToVisit from './PlacesToVisit'
import AccommodationOptions from './AccommodationOptions'
import LocalDelicacies from'./LocalDelicacies'
import TravelOptions from './TravelOptions'
import { useSelector } from 'react-redux'
import SaveTrip from '../ui/buttons/SaveTrip'


const TripSearchResult = () => {
  const itinerary =  useSelector(store => store.itinerary.value)
  const places_to_visit =  useSelector(store => store.place.value)
  const accommodation =  useSelector(store => store.accommodation.value)
  const local_delicacies =  useSelector(store => store.localDelicacy.value)
  const travel_options =  useSelector(store => store.travelOption.value)
  return (
    <div className='mt-32'>
        <TripResultButton datas={itinerary} sectionName='Itinerary' component= { <Itinerary/> } />
        <TripResultButton datas={places_to_visit} sectionName ='Places to Visit' component={ <PlacesToVisit datas={places_to_visit.data}/> }/>
        <TripResultButton datas={accommodation} sectionName ='Accommodation Options' component={ <AccommodationOptions /> } />
        <TripResultButton datas={local_delicacies} sectionName ='Local Delicacies' component={ <LocalDelicacies /> }/>
        <TripResultButton datas={travel_options} sectionName ='Travel Options' component={<TravelOptions /> }/>
        <SaveTrip/>
    </div>
  )
}

export default TripSearchResult