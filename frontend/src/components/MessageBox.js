import React from 'react';

function MessageBox(props) {
    return (
        <div className={`text-${props.variant || 'info'}`}>
            {props.children}
        </div>
    );
}

export default MessageBox;