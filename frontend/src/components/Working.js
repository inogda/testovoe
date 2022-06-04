import React, { useEffect } from 'react';
import WorkingItem from "./WorkingItem";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import {useDispatch, useSelector} from "react-redux";
import {clearErrors, listWorking} from "../actions/workingActions";
import {
    WORKING_SET_CURRENT_END,
    WORKING_SET_CURRENT_NONE,
    WORKING_SET_CURRENT_PAGE, WORKING_SET_FETCHING
} from "../constants/workingConstants";



function Working(props) {

    const { title } = props;

    const dispatch = useDispatch();
    const workingList = useSelector((state) => state.workingList);
    const {
        fetching,               // флаг обновления массива items
        loading,
        error,
        success,
        working,                // массив пользователей items
        current_Page,           // текущая страница
        currentItem,            // кол-во выводимых за раз пользователей
        current_End,            // флаг последней страницы ставим false
        current_None,           // флаг вывода кнопки Показать еще
        total_Page,             // кол-во полученных пользователей
    } = workingList;

    //const pageSize = useSelector((state) => state.pageSize);

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearErrors());
        }
        dispatch( listWorking( currentItem, current_End, current_Page, fetching, ));
    }, [dispatch, fetching, currentItem, current_End, current_Page, error, success ]);

    const scroolButton = () => {
        dispatch({type: WORKING_SET_CURRENT_PAGE, payload: current_Page+1 });

        const pageActive = Math.floor(total_Page / currentItem);    // определяем сколько всего активных страниц

        if(current_Page !== 1 && pageActive <= current_Page ) {
            dispatch({type: WORKING_SET_CURRENT_END, payload: false });
            //setCurrentEnd(false);                               // устанавливаем признак последней страницы
        }
        if(current_Page !== 1 && pageActive <= current_Page+1 ) {
            dispatch({type: WORKING_SET_CURRENT_NONE, payload: false });
            //setCurrentNone(false);                              // устанавливаем признак не вывода кнопки
        }
        //console.log('current_Page ' + current_Page + '-' + current_None );

        dispatch({type: WORKING_SET_FETCHING, payload: true });
        //setFetching(true);
    }

    return (
        <div className="container">
            <h2 className="people__title">
                {title}
            </h2>
            <div>
                {loading ? (
                    <LoadingBox/>
                ) : error ? (
                    <MessageBox variant="error">{error}</MessageBox>
                ) : (

                    <div className="people__list" id="scrolledBlock">
                        {working.map((workingitem) => (
                            <WorkingItem key={workingitem.id} working={workingitem}></WorkingItem>
                        ))}
                    </div>
                )}
                {current_None ? (
                    <div className="people__btn btn-120">
                        <button onClick={scroolButton} className="a-btn a-btn-active">Show more</button>
                    </div>
                ) : null}

            </div>
        </div>
    );
}

export default Working;