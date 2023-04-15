import React from 'react'
import TripResultButton from './TripResultButton'
import Itinerary from './Itinerary'
import PlacesToVisit from './PlacesToVisit'
import AccommodationOptions from './AccommodationOptions'
import LocalDelicacies from'./LocalDelicacies'
import TravelOptions from './TravelOptions'
import { useSelector } from 'react-redux'
import SaveTrip from './SaveTrip'

const TripSearchResult = () => {
  const data =  useSelector(store => store.trip.value.data)
  return (
    <div className='mt-32'>
        <TripResultButton  sectionName='Itinerary' component= { <Itinerary/> } />
        <TripResultButton  sectionName ='Places to Visit' component={ <PlacesToVisit/> }/>
        <TripResultButton  sectionName ='Accommodation Options' component={ <AccommodationOptions /> } />
        <TripResultButton  sectionName ='Local Delicacies' component={ <LocalDelicacies /> }/>
        <TripResultButton  sectionName ='Travel Options' component={<TravelOptions /> }/>
        <SaveTrip/>
    </div>
  )
}

export default TripSearchResult