import React from 'react';
import logo from '../assets/logo.png';
import '../styles/Header.css';

const Header = () => (
    <header className="App-header">
        <img src={logo} alt="Logo" />
        <h1>Music Game</h1>
    </header>
);

export default Header;
