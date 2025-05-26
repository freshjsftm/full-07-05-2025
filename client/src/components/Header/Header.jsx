import React from 'react';
import { Link } from 'react-router-dom';
import './Header.module.scss';

const Header = () => {
  return (
    <header>
      <div>
        <Link to="/">Logo</Link>
        <Link to="/analitics">Analitics</Link>
      </div>
      <div>
        <Link to="/create-sport">Create Sport</Link>
        <Link to="/create-athlete">Create Athete</Link>
      </div>
    </header>
  );
};

export default Header;
