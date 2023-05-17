import React, { useState } from 'react'

import data from './tripdata'
import PDFButton from '../components/ui/trip/PdfButton'

const Testing = () => {

  return (
    <div>
    <PDFButton data={data}/>
    
    </div>
  )
}

export default Testing