import React, { useState } from 'react';
import '../css/review.css';

function Reviews() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const toggleBox = () => {
    setIsOpen(!isOpen);
  };
  const toggleBox2 = () => {
    setIsOpen2(!isOpen2);
  };

  return (
    <div>
    <div className={`box ${isOpen ? 'open' : ''}`} onClick={toggleBox}>
      <div className="box-office">
        {isOpen ? <h1>Reviews</h1> : ""}
      </div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        {isOpen ? "" : "Reviews"}
      </div>
      
    </div>


    <div className={`box2 ${isOpen2 ? 'open' : ''}`} onClick={toggleBox2}>
      <div className="box-office2">
        {isOpen2 ? <h1>Youtube</h1> : ""}
      </div>
      <div className={`sidebar ${isOpen2 ? 'open' : ''}`}>
        {isOpen2 ? "" : <>You <span style={{backgroundColor:'red', borderRadius: '5'}}>Tube</span></>}
      </div>
      
    </div>
    </div>
  );
}

export default Reviews;