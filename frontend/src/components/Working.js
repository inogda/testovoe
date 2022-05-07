import React, {useEffect, useState} from 'react';
import WorkingItem from "./WorkingItem";
import axios from "axios";
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
                const {data} = await axios.get('/rest/working');
                setLoading(false);
                setWorking(data);
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
                            <WorkingItem key={working._id} working={working}></WorkingItem>
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