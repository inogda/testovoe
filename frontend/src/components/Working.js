import React, {useEffect, useState} from 'react';
import WorkingItem from "./WorkingItem";
import axios from 'axios-proxy-fix';
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

function Working(props) {
    const { title } = props;

    const [working, setWorking] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fecthData = async () => {
            try {
                setLoading(true);
                //const {data} = await axios.get('http://127.0.0.1:5000/rest/working', { withCredentials: true });

                const {data} = await axios.get('https://ino.pp.ua/rest/working?p=Piondolgidra.Zvadwiensda-287');
                //console.log(data);


                //const {data} = await
                //    axios({
                //        method: 'get',
                //        url: 'https://ino.pp.ua/rest/working?p=Piondolgidra.Zvadwiensda-287',
                //        withCredentials: true,
                //        headers: {
                //            "Access-Control-Allow-Origin": "*",
                //            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                //            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
                //            "Access-Control-Allow-Credentials": true,
                //        },
                //        responseType: "json",
                //    });

                    setLoading(false);
                setWorking(data.results);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fecthData();
    }, [])

    return (
        <div className="container">
            <h2 className="people__title">
                {title}
            </h2>

            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="error">{error}</MessageBox>
            ) : (
                <div>
                    <div className="people__list">
                        {working.map((working) => (
                            <WorkingItem key={working.id} working={working}></WorkingItem>
                        ))}
                    </div>
                    <div className="people__btn btn-120">
                        <a href="#" className="a-btn a-btn-active">Show more</a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Working;