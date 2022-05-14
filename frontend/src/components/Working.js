import React, {useEffect} from 'react';
import WorkingItem from "./WorkingItem";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import {useDispatch, useSelector} from "react-redux";
import {listWorking} from "../actions/workingActions";

function Working(props) {
    const { title } = props;

    const dispatch = useDispatch();
    const workingList = useSelector((state) => state.workingList);
    const { loading, error, working } = workingList;

    useEffect(() => {
        dispatch( listWorking() );
    }, [dispatch]);


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
                        {working.map((workingitem) => (
                            <WorkingItem key={workingitem.id} working={workingitem}></WorkingItem>
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