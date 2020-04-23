import React from 'react';

import LinkWrapper from '../../utils/LinkWrapper';

const Header = () => {
    return (
        <nav>
            <div className="nav-wrapper lime darken-1">
                <LinkWrapper to="/" className="brand-logo">Casa do Código</LinkWrapper>
                <ul className="right">
                    <li><LinkWrapper to="/">Home</LinkWrapper></li>
                    <li><LinkWrapper to="/autores">Autores</LinkWrapper></li>
                    <li><LinkWrapper to="/livros">Livros</LinkWrapper></li>
                    <li><LinkWrapper to="/sobre">Sobre</LinkWrapper></li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;