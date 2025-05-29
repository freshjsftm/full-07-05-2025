import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import { fetchAthletesByCountryAsync } from '../../store/analiticsSlice';
import styles from './analitics.module.scss';
import CONSTANTS from '../../constants';

const AthletesByCountry = () => {
  const dispatch = useDispatch();
  const { athletesByCountry, error, isLoading } = useSelector(
    (state) => state.analitics
  );

  useEffect(() => {
    dispatch(fetchAthletesByCountryAsync());
  }, [dispatch]);
  const showColorCell = (country, i) => <Cell key={country} fill={CONSTANTS.COLORS[i]}/>;
  return (
    <section className={styles.analitic}>
      <h2>Amount athletes by country</h2>
      {error && <p>{error}</p>}
      {isLoading && <p>loading...</p>}
      {athletesByCountry.length === 0 ? (
        <p>empty data</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart width={300} height={300}>
            <Pie data={athletesByCountry} dataKey="amount" nameKey="country" label cx="50%" cy="50%" legendType="star">
              {athletesByCountry.map(showColorCell)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </section>
  );
};

export default AthletesByCountry;
