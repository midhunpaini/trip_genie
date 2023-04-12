import React from 'react'
import TripResultButton from './TripResultButton'
import Itinerary from './Itinerary'
import PlacesToVisit from './PlacesToVisit'
import AccommodationOptions from './AccommodationOptions'
import LocalDelicacies from'./LocalDelicacies'
import TravelOptions from './TravelOptions'

const TripSearchResult = ({data}) => {
  return (
    <div className='mt-32'>
        <TripResultButton data={data?.itinerary} sectionName='Itinerary' component= { <Itinerary itinerary={data?.itinerary}/> } />
        <TripResultButton data={data?.places_to_visit} sectionName ='Places to Visit' component={ <PlacesToVisit placesToVisit={data?.places_to_visit}/> }/>
        <TripResultButton data={data?.accommodation_options} sectionName ='Accommodation Options' component={ <AccommodationOptions accommodationOptions={data?.accommodation_options}/> } />
        <TripResultButton data={data?.local_delicacies} sectionName ='Local Delicacies' component={ <LocalDelicacies localDelicacies={data?.local_delicacies}/> }/>
        <TripResultButton data={data?.travel_options} sectionName ='Travel Options' component={<TravelOptions travelOptions={data?.travel_options}/> }/>
    </div>
  )
}

export default TripSearchResult