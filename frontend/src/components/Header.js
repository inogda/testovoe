import React from 'react';
//import ReactLogo from '../../public/img/Logo.svg';  //<ReactLogo/>
//<img src={header.logo} alt="logo"/>

function Header(props) {
    const { header } = props;
    return (
        <div className="container">
            <div className="header-row">
                <div className="header-row__logo">
                    <a href="/" title={header.title}>

                        <img src={header.logo} alt="logo"/>
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