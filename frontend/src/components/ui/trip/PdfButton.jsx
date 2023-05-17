import React, { useState } from "react";
import html2canvas from 'html2canvas';
import TripDetails from "./TripDetails"; // Import the component you want to convert
import jsPDF from "jspdf";

const PdfButton = ({ data }) => {

  const [loader, setLoader] = useState(false);
  const handlePDFGeneration = () => {
    const input = document.querySelector('#pdf-content');
    // setLoader(true);
    html2canvas(document.querySelector("#pdf-content")).then(canvas => {
     let base64Image = canvas.toDataURL('image/png')
     console.log(base64Image)
  });
    
    // const doc = new jsPDF("p", "mm", "a4");
    // const componentWidth = doc.internal.pageSize.getWidth();
    // const componentHeight = doc.internal.pageSize.getHeight();

    // doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
    // doc.save("trip_details.pdf");

    setLoader(false);
  };

  return (
    <div>
      <button onClick={handlePDFGeneration}>
        {loader ? <span>Downloading</span> : <span>Download</span>}
      </button>
      <div style={{ display: "none" }}>
        <div id="pdf-content">
          <h1>Please</h1>
          {/* <TripDetails data={data} /> Replace `data` with your actual data prop */}
        </div>
      </div>
    </div>
  );
};

export default PdfButton;
