import React from 'react';
import Preloader from '../img/Preloader.png';

function LoadingBox(props) {
    return (
        <div>
            <img src={Preloader} alt="preloader"/>
            Loading...
        </div>
    );
}

export default LoadingBox;