import React from 'react';
import AthleteItem from './AthleteItem';

const AthletesList = ({ athletes }) => {
  const showAthleteItem = (athlete) => (
    <AthleteItem key={athlete._id} athlete={athlete} />
  );
  return (
    <div>
      Athletes List
      {athletes.length === 0 ? (
        <p>empty list</p>
      ) : (
        <ul>{athletes.map(showAthleteItem)}</ul>
      )}
    </div>
  );
};

export default AthletesList;
