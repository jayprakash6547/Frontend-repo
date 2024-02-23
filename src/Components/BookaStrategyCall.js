import React from 'react';

// Define your page component
const StrategyCallPage = () => {
  // Define a function to handle button click
  const handleButtonClick = () => {
    alert('Strategy Call Button Clicked!');
  };

  return (
    <div>
      {/* <h1>Strategy Call Page</h1> */}
      <button 
        style={{backgroundColor: 'blue', color: 'white'}} 
        onClick={handleButtonClick}
      >
        Book a Strategy Call
      </button>
    </div>
  );
};

export default StrategyCallPage;
