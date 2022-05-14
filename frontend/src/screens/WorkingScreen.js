import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {detailsWorking} from "../actions/workingActions";


function WorkingScreen(props) {


    //const params=useParams();
    //const productId=params.id;
    //const navigate=useNavigate();
    //const productId=1;

    const dispatch = useDispatch();
    const params=useParams();
    const productId=params.id;

    const workingDetails = useSelector((state) => state.workingDetails);
    const { loading, error, details } = workingDetails;

    useEffect(() => {
        dispatch( detailsWorking(productId) );
    }, [dispatch, productId]);

    return (
        <div className="list-item">
            <Link to="/" className="btn-100">
                <div className="a-btn a-btn-active">Back</div>
            </Link>

            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="error">{error}</MessageBox>
            ) : (
                <div>
                    <img className="list-item-img" src={details.photo}
                         alt={details.name}/>
                    <h3 className="list-item-name">
                        {details.name}
                    </h3>
                    <div className="list-item-comtent">
                        <p className="list-item-position">
                            {details.position}
                        </p>
                        <p className="list-item-mail">
                            {details.email}
                        </p>
                        <p className="list-item-phone">
                            {details.phone}
                        </p>
                    </div>
                </div>
            )}




        </div>
    );
}

export default WorkingScreen;