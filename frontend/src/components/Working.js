import React from 'react';
import WorkingItem from "./WorkingItem";

function Working(props) {
    const { working } = props;
    return (
        <div className="container">
            <h2 className="people__title">
                {working.title}
            </h2>
            <div className="people__list">

                {working.workingItem.map((working) => (
                    <WorkingItem key={working._id} working={working}></WorkingItem>
                ))}

            </div>
            <div className="people__btn btn-120">
                <a href="#" className="a-btn a-btn-active">Show more</a>
            </div>
        </div>
    );
}

export default Working;