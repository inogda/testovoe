import React from 'react';
import Home from "../components/Home";
import data from "../data";
import Working from "../components/Working";
import RequestForm from "../components/RequestForm";

function HomeScreen(props) {
    return (
        <main className="main">
            <section className="home">
                <Home homeBlock={data.homeBlock}></Home>
            </section>

            <section className="people" id="speople">
                <Working title={data.working.title} ></Working>
            </section>

            <section className="request" id="srequest">
                <RequestForm request={data.request}></RequestForm>
            </section>

        </main>
    );
}

export default HomeScreen;