//import logo from './logo.svg';
import React from 'react';
import './index.css';
import data from './data';
import Working from "./components/Working";
import Home from "./components/Home";
import Header from "./components/Header";
import RequestForm from "./components/RequestForm";
import Footer from "./components/Footer";

function App() {
    return (
        <div>

            <header className="header">
                <Header header={data.header}></Header>
            </header>

            <main className="main">
                <section className="home">
                    <Home homeBlock={data.homeBlock}></Home>
                </section>

                <section className="people" id="speople">
                    <Working working={data.working}></Working>
                </section>

                <section className="request" id="srequest">
                    <RequestForm request={data.request}></RequestForm>
                </section>

            </main>

            <footer className="footer">
                <Footer title={data.footerTitle}></Footer>
            </footer>

            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.js"></script>
            <script src="js/all.js"></script>

        </div>
);
}

export default App;
