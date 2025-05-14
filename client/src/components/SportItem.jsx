import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@mdi/react';
import { mdiTrashCanOutline } from '@mdi/js';
import { deleteSportByIdAsync } from '../store/sportsSlice';

const SportItem = ({ sport }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateToSport = () => {
    navigate(`/sports/${sport._id}`);
  };
  const handleDelete = (event) => {
    event.stopPropagation();
    dispatch(deleteSportByIdAsync(sport._id));
  };
  return (
    <li onClick={navigateToSport} key={sport._id}>
      {sport.name}
      
      <Icon onClick={handleDelete} path={mdiTrashCanOutline} size={0.7} />
    </li>
  );
};

export default SportItem;
