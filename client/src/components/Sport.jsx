import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSportByIdAsync } from '../store/sportsSlice';
import CONSTANTS from '../constants';

const Sport = () => {
  const { sportId } = useParams();
  const dispatch = useDispatch();
  const { selectedSport, isLoading, error } = useSelector((state) => state.sports);

  useEffect(() => {
    dispatch(fetchSportByIdAsync(sportId));
  }, [dispatch, sportId]);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if(!selectedSport) return <p>not availebel sport</p>
  return (
    <article>
      <h2>{selectedSport?.name}</h2>
      <p>{selectedSport.isOlimpic ? 'olimpic' : 'not olimpic'}</p>
      <img src={`${CONSTANTS.API_BASE_URL}${selectedSport?.image}`} alt={selectedSport?.name}/>
      <button>update sport</button>
    </article>
  );
};

export default Sport;
