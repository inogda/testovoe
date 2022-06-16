import React, { useState} from 'react';
import { useForm} from "react-hook-form";
import InputMask from "react-input-mask";
import {useDispatch} from "react-redux";
import {
    WORKING_LIST_CLEAR,
    WORKING_SET_CURRENT_END,
    WORKING_SET_CURRENT_NONE,
    WORKING_SET_CURRENT_PAGE,
    WORKING_SET_FETCHING,
} from "../constants/workingConstants";
import LoadingBox from "./LoadingBox";
import useTokenData from "../hooks/get-token-data";
import usePositionsData from "../hooks/get-positions-data";
import { createWorking} from "../actions/workingActions";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
        reset,
        formState: {errors},
    } = useForm({mode: "onChange"});

    const dispatch = useDispatch();

    // получаем токен
    const { token } = useTokenData();
    //console.log(token);

    // получаем массив positions
    const {
        positions,
        loading,
    } = usePositionsData();
    //console.log(positions);


    const [nameInput, setNameInput]   = useState('');     // задали поле ввода input для name
    const [emailInput, setEmailInput] = useState('');     // задали поле ввода input для email
    const [phoneInput, setPhoneInput] = useState('');     // задали поле ввода input для phone
    const [radio,setRadio] = useState(1); // задали поле ввода input для radio
    const [image, setImage] = useState();
    const [namePhoto, setNamePhoto] = useState();
    const [messagePhoto, setMessagePhoto] = useState(true);
    const [viewButton, setViewButton] = useState(true);


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
        // скрыть кнопку BUTTON submit
        setViewButton(false);
        try {
            const sendFormData = new FormData();
            sendFormData.append("name", data.name);
            sendFormData.append("email", data.email);
            sendFormData.append("phone", data.phone);
            sendFormData.append("position_id", data.radio);
            sendFormData.append("photo", data.file[0]);

            // добавляем запись в базу пользователя
            const datapost = dispatch(createWorking(sendFormData, token));

            datapost
            .then(response => {
                console.log(response.data);

                toast.error(JSON.stringify(`${response.data.message}, id item: ${response.data.user_id}`), {
                    position: toast.POSITION.TOP_RIGHT
                });
                //alert(JSON.stringify(`${response.data.message}, id item: ${response.data.user_id}`));

                // диспатчим WORKING
                dispatch({type: WORKING_LIST_CLEAR});                           // очистить список items
                dispatch({type: WORKING_SET_CURRENT_NONE, payload: true });     // флаг вывода кнопки Показать еще
                dispatch({type: WORKING_SET_CURRENT_PAGE, payload: 1 });        // текущая страница
                //dispatch({type: WORKING_SET_TOTAL_PAGE, payload: 0 });          // кол-во полученных пользователей

                dispatch({type: WORKING_SET_CURRENT_END, payload: true });      // флаг последней страницы
                dispatch({type: WORKING_SET_FETCHING, payload: true });         // обновить список items

                // перемещаем скрол к началу вывода WORKING
                let scroll = document.getElementById('scrolledBlock');
                scroll.scrollIntoView();

                // обнуляем форму
                reset({ name: '',  email: '',  phone: '',  radio: '',  file: '', })
                setNameInput('');
                setEmailInput('');
                setPhoneInput('');
                setRadio(1);
                setNamePhoto('');
                setImage('');

            })
            .catch(function (error) {
                // если ошибка то выводим сообщение про ошибку

                toast.error(JSON.stringify(`error - ${error.response.data.message}`), {
                    position: toast.POSITION.TOP_RIGHT
                });

                //alert(JSON.stringify(`error - ${error.response.data.message}`));
                console.log(error);
            });

        } catch (error) {
            // если запрос не прошел, то делаю диспатч на вывод ошибки
            console.log(error);
        }
        // показать кнопку BUTTON submit
        setViewButton(true);

        /*
        // загрузить файл картинки для моего сервера
        const formData = new FormData();
        formData.append("file", data.file[0]);
        const res = await fetch("http://localhost:5000/rest/upload-file.php", {
            method: "POST",
            body: formData,
        }).then((res) => res.json());
        alert(JSON.stringify(`${res.message}, status: ${res.status}`));
        */

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
        // вставляем имя файла в input text для имени файла
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
                            <input
                                type="text"
                                name="name"
                                value={nameInput}
                                className="request-input"
                                placeholder={request.name}
                                {...register('name', {
                                    required: true,
                                    minLength: 2,
                                    maxLength: 60
                                })}
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
                        <label className={`request-label ${errors.email && !errors.name? "border-error" : null}`}>
                            <input
                                type="email"
                                name="email"
                                value={emailInput}
                                className="request-input"
                                placeholder={request.email}
                                {...register("email", {
                                    required: true,
                                    minLength: 2,
                                    maxLength: 100,
                                    pattern: {
                                       // eslint-disable-next-line
                                       value: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
                                    }
                                })}
                            />
                        </label>
                        {emailInput && errors.email &&
                            <div className="request-grid-label text-error">Введите правильно Email</div>
                        }
                        {!emailInput && errors.email && emailInput && !errors.name &&
                            <div className="request-grid-label text-error">Введите правильно Email</div>
                        }
                    </div>
                </li>

                <li>
                    <div className="request-grid">
                        <label className={`request-label ${errors.phone && !errors.name && !errors.email? "border-error" : null}`}>

                            <InputMask
                                className="request-input"
                                placeholder={request.phone}
                                mask='+380999999999'
                                value={phoneInput}
                                onChange={props.onChange}
                                {...register('phone', {
                                    required: true,
                                    // eslint-disable-next-line
                                    pattern:/^[\+]{0,1}380([0-9]{9})$/
                                })}
                            />

                        </label>
                        {errors.phone && !errors.name && !errors.email &&
                            <div className="request-grid-label text-error">Введите номер телефона +380XXXXXXXXXX</div>
                        }
                        {!errors.phone && messagePhoto &&
                            <div className="request-grid-label">+380XXXXXXXXXX</div>
                        }

                    </div>
                </li>

                <li>
                    <div className="request-title">
                        {request.radioTitle}
                    </div>

                        {loading && <div>Loading</div>}

                        {!loading && (
                            <div>
                                <MyRadio
                                    positions={positions}
                                    radio={radio}
                                    setRadio={setRadio}
                                    register={register}
                                />
                            </div>
                        )}
                 </li>
                <li>
                    {image ? <img src={image} width="200" alt="" /> : null}
                    <div className="request_upload">
                        <div className="mask-wrapper">
                            <div className="mask">
                                <button className={`send-file ${errors.file && !errors.phone && !errors.name && !errors.email? "border-error" : "send-file-active"}`}>
                                    Upload
                                </button>
                                <input
                                    type="text"
                                    className="fileInputText active"
                                    placeholder="Upload your photo"
                                    disabled
                                    value={namePhoto ? namePhoto : ''}

                                />
                                {errors.file && !errors.phone && !errors.name && !errors.email &&
                                    <div className="request-grid-label text-error default">
                                        Загрузите фото
                                    </div>
                                }
                            </div>
                            <label>
                                <input
                                    type="file"
                                    className="custom-file-input"
                                    accept="image/jpeg,image/jpg"
                                    {...register("file", {required: true})}
                                />
                            </label>
                        </div>

                    </div>
                </li>
            </ul>

            <div className="request__btn btn-100">
                {viewButton && <button className="a-btn a-btn-disable">Sign up</button>}
            </div>
        </form>

    );
}

function MyRadio(props) {
    const { positions, radio, setRadio, register } = props;
    // eslint-disable-next-line
    if(!positions || positions.length == 0) return <LoadingBox></LoadingBox>

    return (

        <div className="request-radio">

            {positions.map((position) => (

                <div className="custom-radio" key={position.id}>
                    <input
                        type="radio"
                        name="radio"
                        id={`radio${position.id}`}
                        value={position.id}
                        // eslint-disable-next-line
                        checked={radio == position.id}
                        onChange={(e) => {
                            setRadio(e.target.value)
                        }}

                        {...register('radio', {required: true})}
                    />
                    <label htmlFor={`radio${position.id}`}>
                        {position.name}
                    </label>
                </div>
            ))}
        </div>
    )

}
