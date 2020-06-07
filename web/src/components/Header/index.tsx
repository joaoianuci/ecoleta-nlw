import React  from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

const Header = () => {
    const history = useHistory();
    return(
        <header>
            <img src={logo} alt="ecoleta"/>
            {history.location.pathname === '/' ? (
                 <></>
            ) : (
                 <Link to="/">
                 <FiArrowLeft/> 
                 Voltar para home
                </Link>
            )}
           
        </header>
    )
};

export default Header;
