import React, { useRef} from "react";
import 'primeicons/primeicons.css';

export default function Paginator({ pageInterval, setPageNumber, 
                                    startPageNumber, setStartPageNumber, endPageNumber, setEndPageNumber,  
                                    totalPages, startIndex, endIndex, totalItems}){

const selectPage = useRef(1)

// number array from 1 to totalPages
const allPagesList = Array.from({ length: totalPages }, (_, i) => i + 1);      

// the sliced list of page number to display
const displayPageList = allPagesList.slice(startPageNumber - 1, endPageNumber); 
    
 // Resets the pagination to show the first set of pages, from 1 to pageInterval.
 function backToStart(){
    setStartPageNumber(1);
    setEndPageNumber(pageInterval);
  }

  // Adjusts pagination to display the last set of pages, ending with the total number of pages.
  function goToEnd(){
    const newEnd = Math.ceil(totalPages/pageInterval) * pageInterval;
    setEndPageNumber(newEnd);
    setStartPageNumber(newEnd - pageInterval);
  }

  // Navigates the pagination forward or backward by a pageInterval, updating the range of displayed pages.
  function handleChange(interval){
    const newStart = Math.max(1, startPageNumber + interval);
    const newEnd = Math.min(totalPages, endPageNumber + interval);
    setStartPageNumber(newStart);
    setEndPageNumber(newEnd);
  }
  
  const handleLocalPageClick = (newPageNumber) => {
    // Set the selected page locally for UI updates 
    selectPage.current=newPageNumber;    

    // propagating the selection to ExplorePage
    setPageNumber(newPageNumber);        
  };
  
  return(
      <div className="my-10">
          <div className="flex justify-center ">
            {/* Resets the pagination to show the first set of pages. Disabled when already at the first set. */}
            <button onClick={()=>backToStart()} disabled={startPageNumber === 1}>
                <span className="pi pi-step-backward" style={{ color: startPageNumber === 1 ? '#c6c6c6' : '#222222' }}></span>
            </button>

            {/* Moves the pagination back by one set of pages. Disabled when on the first set of pages. */}
            <button onClick={() => handleChange(-pageInterval)} disabled={startPageNumber === 1}>
                <span className="pi pi-angle-left" style={{ color: startPageNumber === 1 ? '#c6c6c6' : '#222222' }}></span>
            </button>

            {/* Display and allow navigation to specific pages. Highlights the currently selected page. */}
            {displayPageList.map((pageNumber) => (
                <button
                    key={pageNumber}
                    className="w-8 h-8 text-xs text-gray-700 rounded-full lg:ml-2 lg:py-1" 
                    onClick={() => handleLocalPageClick(pageNumber)}
                    style={{ fontWeight: selectPage.current === pageNumber ? 'bold' : 'normal' }}
                >{pageNumber}
                </button>
            ))}

            {/* Advances the pagination to the next set of pages. Disabled when on the last set of pages. */}
            <button onClick={() => handleChange(pageInterval)} disabled={endPageNumber > totalPages}>
                <span className="pi pi-angle-right" style={{ color: endPageNumber > totalPages ? '#c6c6c6' : '#222222' }}></span>
            </button>

            {/* Navigates directly to the last set of pages. Disabled when already viewing the last set. */}            
            <button onClick={()=>goToEnd()}  disabled={endPageNumber > totalPages}>
                <span className="pi pi-step-forward" style={{ color: endPageNumber > totalPages ? '#c6c6c6' : '#222222' }}></span>
            </button>
          </div>

          <p className="py-2 text-xs text-center ">
              {startIndex} to {endIndex} of {" "} {totalItems} results
          </p>
      </div>
  );
}