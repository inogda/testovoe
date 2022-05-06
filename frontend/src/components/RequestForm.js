import React from 'react';

import RadioItem from "./RadioItem";
import WorkingItem from "./WorkingItem";

function RequestForm(props) {
    const { request } = props;
    return (
        <div className="container">
            <h2 className="request__title">
                {request.title}
            </h2>

            <form action="/" method="post">
                <ul>
                    <li>
                        <div className="request-grid">
                            <label className="request-label border-error">
                                <input className="request-input" type="text" id="name"
                                       name="user_name" placeholder={request.name}/>
                            </label>
                            <div className="request-grid-label text-error">error</div>
                        </div>
                    </li>
                    <li>
                        <div className="request-grid">
                            <label className="request-label">
                                <input className="request-input" type="email" id="mail"
                                       name="user_mail" placeholder={request.email}/>
                            </label>
                            <div className="request-grid-label text-error none">error</div>
                        </div>
                    </li>
                    <li>
                        <div className="request-grid">
                            <label className="request-label">
                                <input className="request-input" type="text" id="phone"
                                       name="user_phone" placeholder={request.phone}/>
                            </label>
                            <div className="request-grid-label">+38 (XXX) XXX - XX - XX</div>
                        </div>
                    </li>
                    <li>
                        <div className="request-title">
                            {request.radioTitle}
                        </div>


                        <div className="request-radio">

                            {request.radioItem.map((request) => (
                                <RadioItem key={request._id} radioItem={request}></RadioItem>
                            ))}

                        </div>

                    </li>
                    <li>
                        <div className="request_upload">
                            <div className="mask-wrapper">
                                <div className="mask">
                                    <button className="send-file send-file-active">Upload</button>
                                    <input className="fileInputText active" type="text"
                                           placeholder="Upload your photo" disabled/>
                                    <div className="request-grid-label text-error default">error</div>
                                </div>
                                <input id="my_file" className="custom-file-input" type="file"
                                       name="my_file"/>

                            </div>

                        </div>
                    </li>
                </ul>

                <div className="request__btn btn-100">
                    <a href="#" className="a-btn a-btn-disable">Sign up</a>
                </div>
            </form>

        </div>
    );
}

export default RequestForm;