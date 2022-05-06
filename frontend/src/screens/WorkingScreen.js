import React from 'react';
import data from "../data";
import {Link, useParams} from "react-router-dom";


function WorkingScreen(props) {


    const params=useParams();
    const productId=params.id;
    //const navigate=useNavigate();


    const workingItem = data.working.workingItem.find((x) => x._id === productId);
    if (!workingItem) {
        return <div>Not Found</div>;
    }

    return (
        <div className="list-item">
            <Link to="/" className="btn-100">
                <div className="a-btn a-btn-active">Back</div>
            </Link>
            <div>
                <img className="list-item-img" src={workingItem.photo}
                     alt={workingItem.name}/>
                <h3 className="list-item-name">
                    {workingItem.name}
                </h3>
                <div className="list-item-comtent">
                    <p className="list-item-position">
                        {workingItem.position}
                    </p>
                    <p className="list-item-mail">
                        {workingItem.email}
                    </p>
                    <p className="list-item-phone">
                        {workingItem.phone}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default WorkingScreen;