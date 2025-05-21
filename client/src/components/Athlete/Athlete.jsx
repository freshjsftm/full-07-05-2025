import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAthleteByIdAsync } from '../../store/athletesSlice';
import CONSTANTS from '../../constants';

const Athlete = () => {
  const { athleteId } = useParams();
  const dispatch = useDispatch();
  const { selectedAthlete, error, isLoading } = useSelector(
    (state) => state.athletes
  );
  useEffect(() => {
    dispatch(getAthleteByIdAsync(athleteId));
  }, [dispatch, athleteId]);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <article>
      <h2>{selectedAthlete?.name}</h2>
      <img
        src={`${CONSTANTS.API_BASE_URL}${selectedAthlete?.avatar}`}
        alt={`${selectedAthlete?.name}`}
      />
      <p>country: {selectedAthlete?.country}</p>
      <p>
        sport:{' '}
        <Link to={`/sports/${selectedAthlete?.sportId._id}`}>
          {' '}
          {selectedAthlete?.sportId.name}
        </Link>
      </p>
      <p>year of birth: {selectedAthlete?.birthYear}</p>
    </article>
  );
};

export default Athlete;
