import React, {useEffect, useState} from 'react';
import { useForm} from "react-hook-form";
import InputMask from "react-input-mask";
import axios from "axios-proxy-fix";
import {useDispatch} from "react-redux";
import {
    WORKING_LIST_CLEAR,
    WORKING_SET_CURRENT_END,
    WORKING_SET_CURRENT_NONE,
    WORKING_SET_CURRENT_PAGE,
    WORKING_SET_FETCHING,
} from "../constants/workingConstants";
import LoadingBox from "./LoadingBox";



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





    const [positions, setPositions] = useState();

    useEffect(() => {
        const apiUrl = 'https://frontend-test-assignment-api.abz.agency/api/v1/positions';
        axios.get(apiUrl).then((resp) => {
            const allPersons = resp.data;
            setPositions(allPersons);
        });
    }, [setPositions]);


    //console.log(positions);


    //debugger;





    const [nameInput, setNameInput]   = useState('');     // задали поле ввода input для name
    const [emailInput, setEmailInput] = useState('');     // задали поле ввода input для email
    const [phoneInput, setPhoneInput] = useState('');     // задали поле ввода input для phone



    const [radio,setRadio] = useState(1); // задали поле ввода input для radio





//console.log(respost.data);


    const [image, setImage] = useState();
    const [namePhoto, setNamePhoto] = useState();
    const [messagePhoto, setMessagePhoto] = useState(true);


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
            sendFormData.append("position_id", data.radio);
            sendFormData.append("photo", data.file[0]);

            //var formData = new FormData();
            // file from input type='file' var fileField = document.querySelector('input[type="file"]');
            //formData.append('position_id', data.radio);
            //formData.append('name', data.name);
            //formData.append('email', data.email);
            //formData.append('phone', data.phone);
            //formData.append('photo', fileField.files[0]);
            fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users',
                {
                    method: 'POST',
                    body: sendFormData,
                    headers: {
                        'Token': 'eyJpdiI6ImhEQWpvdzVcL1Rkb3NySUYxVlBaYmN3PT0iLCJ2YWx1ZSI6IlRKd29wTUNlcnhRY1pSSWFGb2FvZTVxTGJ4NkxWODl4QXRCNXM5TlwvZHVxUUFGUkN2b2RIblFYR3YwbFBRa011aFwvTDBTdURQQlJIZEIyM0xvZmwxRkE9PSIsIm1hYyI6ImNmOWUwNWYzNTNmZDg2OWE0ZDRkYjI4MTc3OGEzYWU1NTgyMmVmMDY4YjliYTg1OThiZjY0ZDYzZDgxZDlmNWMifQ==', // get token with GET api/v1/token method
                    },
                })
                .then(function(response) { return response.json(); })
                .then(function(data) { console.log(data); if(data.success) {
                    // process success response
                } else {
                    // proccess server errors
                }
                }) .catch(function(error) {
                // proccess network errors
            });
            debugger;
/*
            const respost = await axios({
                method: 'post',
                url: 'https://frontend-test-assignment-api.abz.agency/api/v1/users',
                //url: 'https://ino.pp.ua/rest/working',
                data: sendFormData,
                //data: `data=${data}`,

                headers: {
                    'Token': token,
                },
            });
            //console.log(respost.data);
            // eslint-disable-next-line
            if(respost.data.success == true){
                alert(JSON.stringify(`${respost.data.success}, id item: ${respost.data.object.id}`));
                //debugger;
            }
*/


        } catch (error) {
            // если асинхронній запрос не прошел, то делаю диспатч на вывод ошибки
            console.log(error);
        }


        dispatch({type: WORKING_LIST_CLEAR});                           // очистить список items
        dispatch({type: WORKING_SET_CURRENT_NONE, payload: true });     // флаг вывода кнопки Показать еще
        dispatch({type: WORKING_SET_CURRENT_PAGE, payload: 1 });        // текущая страница
        //dispatch({type: WORKING_SET_TOTAL_PAGE, payload: 0 });          // кол-во полученных пользователей

        dispatch({type: WORKING_SET_CURRENT_END, payload: true });      // флаг последней страницы
        dispatch({type: WORKING_SET_FETCHING, payload: true });         // обновить список items

        let scroll = document.getElementById('scrolledBlock');
        scroll.scrollIntoView();


        reset({ name: '',  email: '',  phone: '',  radio: '',  file: '', })
        setNameInput('');
        setEmailInput('');
        setPhoneInput('');
        setRadio('Lawyer');
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
                                   {...register('name', {required: true, minLength: 2, maxLength: 60})}
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
                            <input type="email" name="email" value={emailInput}
                                   className="request-input" placeholder={request.email}
                                   {...register("email", {
                                       required: true, minLength: 2, maxLength: 100,
                                       pattern: {
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
                                className="request-input" placeholder={request.phone}
                                mask='+380999999999'
                                value={phoneInput}
                                onChange={props.onChange}
                                {...register('phone', {
                                    // eslint-disable-next-line
                                    required: true, pattern:/^[\+]{0,1}380([0-9]{9})$/
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


                        <MyRadio positions={positions} radio={radio} setRadio={setRadio} register={register}/>

                 </li>
                <li>
                    {image ? <img src={image} width="200" alt="" /> : null}
                    <div className="request_upload">
                        <div className="mask-wrapper">
                            <div className="mask">
                                <button className={`send-file ${errors.file && !errors.phone && !errors.name && !errors.email? "border-error" : "send-file-active"}`}>
                                    Upload
                                </button>
                                <input className="fileInputText active" type="text"
                                       placeholder="Upload your photo" disabled
                                       value={namePhoto ? namePhoto : ''}

                                />
                                {errors.file && !errors.phone && !errors.name && !errors.email &&
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

function MyRadio(props) {
    const { positions, radio, setRadio, register } = props;
    // eslint-disable-next-line
    if(!positions || positions.positions.length == 0) return <LoadingBox></LoadingBox>

    return (

        <div className="request-radio">

            {positions.positions.map((position) => (

                <div className="custom-radio" key={position.id}>
                    <input type="radio" name="radio" id={`radio${position.id}`}
                           value={position.id}
                            // eslint-disable-next-line
                           checked={radio == position.id}
                           onChange={(e) => {
                               setRadio(e.target.value)
                           }}

                        // eslint-disable-next-line
                        //defaultChecked={request._id == radioInput ? "checked": null}
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
