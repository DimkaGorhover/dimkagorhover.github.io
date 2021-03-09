import React from 'react';

const hobbies = [
  'Traveling',
  'Motorcycles',
  'Gym',
  'Football',
  'Cars',
  'Bicycles',
]

export const Hobbies = () => (
  <div className={"hobbies"}>
    <h4>Hobbies</h4>
    <p>
      {hobbies.reduce((acc, hobby) => {
        return `${acc}, ${hobby}`
      })}
    </p>
  </div>
);
