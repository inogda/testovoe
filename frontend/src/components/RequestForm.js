import React, {useState} from 'react';
import { useForm} from "react-hook-form";
import InputMask from "react-input-mask";



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

    const onSubmit = async (data) => {
        console.log('отправлено ', data );


        const formData = new FormData();
        formData.append("file", data.file[0]);

        const res = await fetch("http://localhost:5000/rest/upload-file.php", {
            method: "POST",
            body: formData,
        }).then((res) => res.json());
        alert(JSON.stringify(`${res.message}, status: ${res.status}`));
    };

    const onChange = (file) => {

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
                            <input type="text" name="name"
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
                            <input type="email" name="email"
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
                                value={props.value}
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
                                    // eslint-disable-next-line
                                    defaultChecked={request._id == 1 ? "checked": null}
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



