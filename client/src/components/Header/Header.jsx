import React from 'react';
import { Link } from 'react-router-dom';
import './Header.module.scss';

const Header = () => {
  return (
    <header>
      <Link to="/">Logo</Link>
      <Link to="/create-sport">Create Sport</Link>
    </header>
  );
};

export default Header;
