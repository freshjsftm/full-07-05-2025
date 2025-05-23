import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAthleteByIdAsync } from '../../store/athletesSlice';
import CONSTANTS from '../../constants';
import FormUpdateAthlete from '../forms/FormUpdateAthlete';

const Athlete = () => {
  const { athleteId } = useParams();
  const dispatch = useDispatch();
  const { selectedAthlete, error, isLoading } = useSelector(
    (state) => state.athletes
  );
  const [isShowForm, setIsShowForm] = useState(true);

  useEffect(() => {
    dispatch(getAthleteByIdAsync(athleteId));
  }, [dispatch, athleteId]);

  const handleShowForm = () => {
    setIsShowForm(!isShowForm);
  };

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
          {selectedAthlete?.sportId.name}
        </Link>
      </p>
      <p>year of birth: {selectedAthlete?.birthYear}</p>
      <div>
        <button onClick={handleShowForm}>
          {isShowForm ? 'hide' : 'show'} update athlete form
        </button>
        {isShowForm && <FormUpdateAthlete  athlete={selectedAthlete} handleShowForm={handleShowForm}/>}
      </div>
    </article>
  );
};

export default Athlete;
