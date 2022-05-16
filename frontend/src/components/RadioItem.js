import React from 'react';

function RadioItem(props) {
    const { radioItem } = props;

    return (
        <div className="custom-radio">
            <input
                type="radio"
                name="radio"
                id={`radio${radioItem._id}`}
                defaultChecked={radioItem._id === 1? "checked": null}
            />
            <label htmlFor={`radio${radioItem._id}`}>
                {radioItem.radiotext}-
            </label>
        </div>
    );
}

export default RadioItem;