//import logo from './logo.svg';
import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.css';
import data from './data';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import WorkingScreen from "./screens/WorkingScreen";
import WebFont from "webfontloader";
import {ToastContainer} from "react-toastify";

function App() {

    useEffect(() => {
        WebFont.load({
            google: {
                families: [
                    "Nunito:400&display=swap"
                ],
            },
        });

    }, []);


    return (


        <BrowserRouter>
            <ToastContainer />
            {/*<Helmet>
                <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.js"></script>
                <script type="text/javascript" src="/js/all2.js"></script>
            </Helmet>*/}
            <header className="header">
                <Header header={data.header}></Header>
            </header>

            <Routes>
                <Route path="/" element={<HomeScreen/>} exact />
                <Route path="/working/:id" element={<WorkingScreen />} />
            </Routes>

            <footer className="footer">
                <Footer title={data.footerTitle}></Footer>
            </footer>

            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.js"></script>
            <script src="js/all.js"></script>


        </BrowserRouter>
    );
}

export default App;
