import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { fetchAthletesBySportAsync } from '../../store/analiticsSlice';
import styles from './analitics.module.scss';

const AthletesBySport = () => {
  const dispatch = useDispatch();
  const { athletesBySport, isLoading, error } = useSelector(
    (state) => state.analitics
  );
  useEffect(() => {
    dispatch(fetchAthletesBySportAsync());
  }, [dispatch]);

  return (
    <section className={styles.analitic}>
      <h2>Amount athletes in each sport</h2>
      {error && <p>{error}</p>}
      {isLoading && <p>loading...</p>}
      {athletesBySport.length === 0 ? (
        <p>empty data</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={athletesBySport}>
            <XAxis dataKey="sport" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="red" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </section>
  );
};

export default AthletesBySport;
