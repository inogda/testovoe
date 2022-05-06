import React from 'react';

function WorkingItem(props) {
    const { working } = props;
    return (
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
    );
}

export default WorkingItem;