import React, { useState } from "react";
import { sampleData } from "./sampleData";
import Paginator from "./paginator";

export default function App() {
// Pagination control: Number of pages displayed in the navigator.
let pageInterval = 5; 

// Pagination setting: Number of items to display per page.
const itemPerPage = 3; 

// State for tracking the starting page number displayed in the paginator.
const [startPageNumber, setStartPageNumber] = useState(1);     

// State for tracking the ending page number displayed in the paginator.
const [endPageNumber, setEndPageNumber] = useState(pageInterval);

// State to capture the currently selected page number, triggers data fetch from backend.
const [currentPageNumber, setCurrentPageNumber] = useState(1); 

// Sample placeholder for dynamic data: total number of items available for pagination.
// In practice, this would be fetched alongside the data.
const totalItems = sampleData.length;

// Calculation of the first item's index to be displayed on the current page.
const skipIndex = (currentPageNumber - 1) * itemPerPage; 
const startIndex = skipIndex + 1;

// Calculation of the last item's index to be displayed on the current page.
const endIndex = Math.min(startIndex + itemPerPage - 1, totalItems);

// Data subset for the current page, to be replaced with dynamic data fetching in a production scenario.
const dataToShow = sampleData.slice(startIndex - 1, endIndex);

// Total number of pages, calculated based on the total number of items and items per page.
const totalPages = Math.ceil(totalItems / itemPerPage);

  return (
    <>
    <div className="mx-auto max-w-screen-2xl ">
      <div className="grid grid-cols-3 my-10 place-items-center">
      {dataToShow.map((item)=>(   
        <button className="border-2 px-1 py-1" key={item._id} >{item.name}</button>
      ))}
      </div>
      <div className="mx-auto">
            <Paginator 
              pageInterval={pageInterval}
              setPageNumber={setCurrentPageNumber}
              startPageNumber={startPageNumber}
              setStartPageNumber={setStartPageNumber}
              endPageNumber={endPageNumber}
              setEndPageNumber={setEndPageNumber}
              totalPages={totalPages}
              startIndex={startIndex}
              endIndex={endIndex}
              totalItems={totalItems} 
            />
          </div>
    </div>
    </>
  );
}
