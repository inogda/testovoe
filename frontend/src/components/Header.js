import React from 'react';
import reactLogo from '../img/Logo.svg';
//<img src={header.logo} alt="logo"/>

function Header(props) {
    const { header } = props;
    return (
        <div className="container">
            <div className="header-row">
                <div className="header-row__logo">
                    <a href="/" title={header.title}>
                        <img src={reactLogo} alt="logo" width="104" height="26"/>
                    </a>
                </div>
                <div className="header-row__login">
                    <div className="btn-100">
                        <a href="#speople" className="a-btn a-btn-active">{header.buttonLeft}</a>
                    </div>
                    <div className="btn-100">
                        <a href="#srequest" className="a-btn a-btn-active">{header.buttonRight}</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;