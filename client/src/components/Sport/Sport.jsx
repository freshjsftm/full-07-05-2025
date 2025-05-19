import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSportByIdAsync } from '../../store/sportsSlice';
import CONSTANTS from '../../constants';
import FormUpdateSport from '../forms/FormUpdateSport';
import AthletesList from '../AthletesList/AthletesList';

const Sport = () => {
  const { sportId } = useParams();
  const dispatch = useDispatch();
  const { selectedSport, isLoading, error } = useSelector(
    (state) => state.sports
  );
  const [isShowForm, setIsShowForm] = useState(false);
  const [isShowListAthletes, setIsShowListAthletes] = useState(true);
  const handleShowForm = () => {
    setIsShowForm(!isShowForm);
  };
  const handleShowListAthletes = () => {
    setIsShowListAthletes(!isShowListAthletes);
  };
  useEffect(() => {
    dispatch(fetchSportByIdAsync(sportId));
  }, [dispatch, sportId]);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!selectedSport) return <p>not availebel sport</p>;
  return (
    <article>
      <h2>{selectedSport?.name}</h2>
      <p>{selectedSport.isOlimpic ? 'olimpic' : 'not olimpic'}</p>
      <img
        src={`${CONSTANTS.API_BASE_URL}${selectedSport?.image}`}
        alt={selectedSport?.name}
      />
      <div>
        <button onClick={handleShowForm}>
          {isShowForm ? 'hide' : 'show'} form update sport
        </button>
        {isShowForm && (
          <FormUpdateSport
            sport={selectedSport}
            handleShowForm={handleShowForm}
          />
        )}
        <button onClick={handleShowListAthletes}>
          {isShowListAthletes ? 'hide' : 'show'} list athletes
        </button>
        {isShowListAthletes && <AthletesList athletes={selectedSport.athletes}/>}
      </div>
    </article>
  );
};

export default Sport;
