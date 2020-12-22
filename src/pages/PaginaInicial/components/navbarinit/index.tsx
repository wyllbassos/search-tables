import React from 'react';

const NavBarInit: React.FC = () => {
    return (
        <>
            <a className="navbar-brand" href="#top">Consultas PCM</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>  
        </>  
    );
}

export default NavBarInit;