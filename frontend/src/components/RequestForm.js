import React, { useState } from 'react';
import { useForm} from "react-hook-form";
import InputMask from "react-input-mask";
import axios from "axios-proxy-fix";
import { useDispatch } from "react-redux";
import {
    WORKING_LIST_CLEAR,
    WORKING_SET_CURRENT_END,
    WORKING_SET_CURRENT_NONE,
    WORKING_SET_CURRENT_PAGE,
    WORKING_SET_FETCHING,
} from "../constants/workingConstants";



function RequestForm(props) {
    const { request } = props;
    return (
        <div className="container">
            <h2 className="request__title">
                {request.title}
            </h2>

            <MyForm request={request} />

        </div>
    );
}
export default RequestForm;

function MyForm(props) {
    const { request } = props;
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({mode: "onChange"});



    const [nameInput, setNameInput]   = useState('');     // задали поле ввода input для name
    const [emailInput, setEmailInput] = useState('');     // задали поле ввода input для email
    const [phoneInput, setPhoneInput] = useState('');     // задали поле ввода input для phone
    const [radio,setRadio] = useState('Frontend developer'); // задали поле ввода input для radio


    //debugger;

    const [image, setImage] = useState();
    const [namePhoto, setNamePhoto] = useState();
    const [messagePhoto, setMessagePhoto] = useState(true);
    const dispatch = useDispatch();

    const convert2base64 = file => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result.toString());
        }
        reader.readAsDataURL(file);
    }




    const onSubmit = async (data, e) => {
        e.preventDefault();
        //console.log('отправлено ', data );

        try {
            const sendFormData = new FormData();
            sendFormData.append("name", data.name);
            sendFormData.append("email", data.email);
            sendFormData.append("phone", data.phone);
            sendFormData.append("position", data.radio);
            sendFormData.append("photo", 'https://ino.pp.ua/assets/images/photo/' + data.file[0].name);
            sendFormData.append("file", data.file[0]);


            const respost = await axios({
                method: 'post',
                //url: 'https://ino.pp.ua/rest/login.php',
                url: 'https://ino.pp.ua/rest/working',
                data: sendFormData,
                //data: `data=${data}`,
                crossdomain: true,
                params: {
                    p: 'PiozdolgiduMRZvadwienudaW287Q==',
                },
                headers: {
                    'Content-Language': 'en, ase, ua',
                    'Content-Type': 'multipart/form-data',
                },
            });
            //console.log(respost.data);
            // eslint-disable-next-line
            if(respost.data.success == true){
                alert(JSON.stringify(`${respost.data.success}, id item: ${respost.data.object.id}`));
                //debugger;
            }
        } catch (error) {
            // если асинхронній запрос не прошел, то делаю диспатч на вывод ошибки
            console.log(error);
        }


        dispatch({type: WORKING_LIST_CLEAR});                           // очистить список items
        dispatch({type: WORKING_SET_CURRENT_NONE, payload: true });     // флаг вывода кнопки Показать еще
        dispatch({type: WORKING_SET_CURRENT_PAGE, payload: 0 });        // текущая страница
        //dispatch({type: WORKING_SET_TOTAL_PAGE, payload: 0 });          // кол-во полученных пользователей

        dispatch({type: WORKING_SET_CURRENT_END, payload: true });      // флаг последней страницы
        dispatch({type: WORKING_SET_FETCHING, payload: true });         // обновить список items

        let scroll = document.getElementById('scrolledBlock');
        scroll.scrollIntoView();

        setNameInput('');
        setEmailInput('');
        setPhoneInput('');
        setRadio('Frontend developer');
        setNamePhoto('');
        setImage('');

        /*
        const formData = new FormData();
        formData.append("file", data.file[0]);

        const res = await fetch("http://localhost:5000/rest/upload-file.php", {
            method: "POST",
            body: formData,
        }).then((res) => res.json());
        alert(JSON.stringify(`${res.message}, status: ${res.status}`));
        */

        //formData2.append("patronym", "Робертович");




    };




    const onChange = (file) => {
        // eslint-disable-next-line
        if(file.target.name == 'name'){ setNameInput(file.target.value); }
        // eslint-disable-next-line
        if(file.target.name == 'email'){ setEmailInput(file.target.value); }
        // eslint-disable-next-line
        if(file.target.name == 'phone'){ setPhoneInput(file.target.value); }
        // eslint-disable-next-line
        if(file.target.name == 'radio'){ setRadio(file.target.value) }


        //debugger;

        //console.log('отправлено ', file.target.value );
        if(setMessagePhoto){ setMessagePhoto(false); }  // не выводим подсказку телефона

        if (file.target.files) {
            if (file.target.files.length > 0) {
                //console.log('картинка ', file.target.files[0].name );
                setNamePhoto(file.target.files[0].name);
                convert2base64(file.target.files[0]);
            }
        }
        //console.log('отправлено ', data.target.files[0] );
    }
    //console.log('errors: ', errors);

    return (

        <form onSubmit={handleSubmit(onSubmit)} onChange={onChange}>

            <ul>
                <li>
                    <div className="request-grid">
                        <label className={`request-label ${errors.name ? "border-error" : null}`}>
                            <input type="text" name="name" value={nameInput}
                                   className="request-input" placeholder={request.name}
                                   {...register('name', {required: true, minLength: 3})}
                            />
                        </label>
                        {errors.name &&
                        <div className="request-grid-label text-error">
                            Обязательное поле не менее 3 символов
                        </div>
                        }
                    </div>
                </li>
                <li>
                    <div className="request-grid">
                        <label className={`request-label ${errors.email ? "border-error" : null}`}>
                            <input type="email" name="email" value={emailInput}
                                   className="request-input" placeholder={request.email}
                                   {...register("email", {
                                       required: true,
                                       pattern: {
                                           value: /\S+@\S+\.\S+/,
                                       }
                                   })}
                            />
                        </label>
                        {errors.email &&
                        <div className="request-grid-label text-error">Введите правильно Email</div>
                        }
                    </div>
                </li>

                <li>
                    <div className="request-grid">
                        <label className={`request-label ${errors.phone ? "border-error" : null}`}>

                            <InputMask
                                className="request-input" placeholder={request.phone}
                                mask='+38 999 999-99-99'
                                value={phoneInput}
                                onChange={props.onChange}
                                {...register('phone', {
                                    // eslint-disable-next-line
                                    required: true, pattern:/^\+?3?8?([\s\.-]\d{3}[\s\.-]\d{3}[\s\.-]\d{2}[\s\.-]\d{2})$/
                                })}
                            />

                        </label>
                        {errors.phone &&
                        <div className="request-grid-label text-error">Введите номер телефона +38 XXX XXX-XX-XX</div>
                        }
                        {!errors.phone && messagePhoto &&
                        <div className="request-grid-label">+38 XXX XXX-XX-XX</div>
                        }

                    </div>
                </li>

                <li>
                    <div className="request-title">
                        {request.radioTitle}
                    </div>

                    <div className="request-radio">

                        {request.radioItem.map((request) => (

                            <div className="custom-radio" key={request._id}>
                                <input type="radio" name="radio" id={`radio${request._id}`}
                                       value={request.radiotext}
                                       checked={radio === request.radiotext}
                                       onChange={(e)=>{setRadio(e.target.value)}}

                                    // eslint-disable-next-line
                                       //defaultChecked={request._id == radioInput ? "checked": null}
                                       {...register('radio', {required: true})}
                                />
                                <label htmlFor={`radio${request._id}`}>
                                    {request.radiotext}
                                </label>
                            </div>


                        ))}

                    </div>

                </li>
                <li>
                    {image ? <img src={image} width="200" alt="" /> : null}
                    <div className="request_upload">
                        <div className="mask-wrapper">
                            <div className="mask">
                                <button className={`send-file ${errors.file ? "border-error" : "send-file-active"}`}>
                                    Upload
                                </button>
                                <input className="fileInputText active" type="text"
                                       placeholder="Upload your photo" disabled
                                       value={namePhoto ? namePhoto : ''}

                                />
                                {errors.file &&
                                <div className="request-grid-label text-error default">
                                    Загрузите фото
                                </div>
                                }
                            </div>
                            <input
                                id="my_file" className="custom-file-input" type="file"
                                {...register("file", {required: true})}
                            />
                            <input type="hidden" name="filename" value={namePhoto ? namePhoto : ''}
                                   {...register("filename")}
                            />
                        </div>

                    </div>
                </li>
            </ul>

            <div className="request__btn btn-100">
                <button className="a-btn a-btn-disable">Sign up</button>
            </div>
        </form>

    );
}