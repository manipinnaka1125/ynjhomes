import React, { useState } from 'react';

const MyComponent = () => {
  // Proper initialization
  const [toggle, setToggle] = useState(false); // Initializes to false

  const handleToggle = () => {
    setToggle(prevState => !prevState); // Toggles the state between true and false
  };

  return (
    <div>
      <button onClick={handleToggle}>Toggle</button>
      
      {/* Conditionally render something based on the toggle state */}
      {toggle && <div>This content is toggled!</div>}
    </div>
  );
};

export default MyComponent;
