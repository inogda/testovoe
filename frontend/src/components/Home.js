import React from 'react';

function Home(props) {
    const { homeBlock } = props;
    return (
        <div className="container">
            <div className="home-block">
                <div className="home__heading">
                    <h1 className="zindex">
                        {homeBlock.title}
                    </h1>
                </div>

                <div className="home__text">
                    <div className="zindex">
                        <p>
                            {homeBlock.text}
                        </p>
                    </div>
                </div>
                <div className="home__btn">
                    <div className="zindex btn-100">
                        <a href="#srequest" className="a-btn a-btn-active">Sign up</a>
                    </div>
                </div>

                <div className="home__bg-img">
                    <img src={homeBlock.image} alt="Background cover"/>
                </div>
            </div>
        </div>
    );
}

export default Home;