//import logo from './logo.svg';
import React from 'react';
import './index.css';
import data from './data';

function App() {
    return (
        <div>

            <header className="header">
                <div className="container">
                    <div className="header-row">
                        <div className="header-row__logo">
                            <a href="/" title="Home">
                                <img src="./img/logo.svg" alt="logo"/>
                            </a>
                        </div>
                        <div className="header-row__login">
                            <div className="btn-100">
                                <a href="#speople" className="a-btn a-btn-active">Users</a>
                            </div>
                            <div className="btn-100">
                                <a href="#srequest" className="a-btn a-btn-active">Sign up</a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="main">
                <section className="home">
                    <div className="container">
                        <div className="home-block">
                            <div className="home__heading">
                                <h1 className="zindex">
                                    Test assignment for front-end developer
                                </h1>
                            </div>

                            <div className="home__text">
                                <div className="zindex">
                                    <p>
                                        What defines a good front-end developer is one that has skilled knowledge of
                                        HTML, CSS,
                                        JS with
                                        a
                                        vast understanding of User design thinking as they'll be building web interfaces
                                        with
                                        accessibility
                                        in mind. They should also be excited to learn, as the world of Front-End
                                        Development
                                        keeps
                                        evolving.
                                    </p>
                                </div>
                            </div>
                            <div className="home__btn">
                                <div className="zindex btn-100">
                                    <a href="#srequest" className="a-btn a-btn-active">Sign up</a>
                                </div>

                            </div>

                            <div className="home__bg-img">
                                <img src="./img/Rectangle.png" alt="Background cover"/>
                            </div>
                        </div>
                    </div>

                </section>

                <section className="people" id="speople">
                    <div className="container">
                        <h2 className="people__title">
                            Working with GET request
                        </h2>
                        <div className="people__list">

                            {data.workingItem.map((working) => (
                                    <div key={working._id} className="list-item">
                                        <a href={`/working/${working._id}`}>
                                            <img className="list-item-img" src={working.photo}
                                                 alt={working.name}/>
                                        </a>
                                        <a href={`/working/${working._id}`}>
                                            <h3 className="list-item-name">
                                                {working.name}
                                            </h3>
                                        </a>
                                        <div className="list-item-comtent">
                                            <p className="list-item-position">
                                                {working.position}
                                            </p>
                                            <p className="list-item-mail">
                                                {working.email}
                                            </p>
                                            <p className="list-item-phone">
                                                {working.phone}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }


                        </div>
                        <div className="people__btn btn-120">
                            <a href="#" className="a-btn a-btn-active">Show more</a>
                        </div>
                    </div>
                </section>

                <section className="request">
                    <div className="container" id="srequest">
                        <h2 className="request__title">
                            Working with POST request
                        </h2>

                        <form action="/" method="post">
                            <ul>
                                <li>
                                    <div className="request-grid">
                                        <label className="request-label border-error">
                                            <input className="request-input" type="text" id="name"
                                                   name="user_name" placeholder="Your name"/>
                                        </label>
                                        <div className="request-grid-label text-error">error</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="request-grid">
                                        <label className="request-label">
                                            <input className="request-input" type="email" id="mail"
                                                   name="user_mail" placeholder="Email"/>
                                        </label>
                                        <div className="request-grid-label text-error none">error</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="request-grid">
                                        <label className="request-label">
                                            <input className="request-input" type="text" id="phone"
                                                   name="user_phone" placeholder="Phone"/>
                                        </label>
                                        <div className="request-grid-label">+38 (XXX) XXX - XX - XX</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="request-title">
                                        Select your position
                                    </div>


                                    <div className="request-radio">
                                        <div className="custom-radio">
                                            <input type="radio" name="radio" id="radio1" checked/>
                                                <label htmlFor="radio1">Frontend developer</label>
                                        </div>

                                        <div className="custom-radio">
                                            <input type="radio" name="radio" id="radio2"/>
                                                <label htmlFor="radio2">Backend developer</label>
                                        </div>

                                        <div className="custom-radio">
                                            <input type="radio" name="radio" id="radio3"/>
                                                <label htmlFor="radio3">Designer</label>
                                        </div>

                                        <div className="custom-radio">
                                            <input type="radio" name="radio" id="radio4"/>
                                                <label htmlFor="radio4">QA</label>
                                        </div>
                                    </div>

                                </li>
                                <li>
                                    <div className="request_upload">
                                        <div className="mask-wrapper">
                                            <div className="mask">
                                                <button className="send-file send-file-active">Upload</button>
                                                <input className="fileInputText active" type="text"
                                                       placeholder="Upload your photo" disabled/>
                                                    <div className="request-grid-label text-error default">error</div>
                                            </div>
                                            <input id="my_file" className="custom-file-input" type="file"
                                                   name="my_file"/>

                                        </div>

                                    </div>
                                </li>
                            </ul>

                            <div className="request__btn btn-100">
                                <a href="#" className="a-btn a-btn-disable">Sign up</a>
                            </div>
                        </form>

                    </div>
                </section>

            </main>

            <footer className="footer">© Copyright © inogda, 2022 Все права защищены</footer>



        </div>
);
}

export default App;
