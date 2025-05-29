import React from 'react';
import AthletesBySport from '../components/analitics/AthletesBySport';
import AthletesByCountry from '../components/analitics/AthletesByCountry';

import styles from './pages.module.scss';

const AnaliticsPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Analitics</h1>
      <AthletesByCountry />
      <hr />
      <AthletesBySport />
    </div>
  );
};

export default AnaliticsPage;
