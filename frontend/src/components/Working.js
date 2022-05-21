import React, {useEffect, useState} from 'react';
import WorkingItem from "./WorkingItem";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import {useDispatch, useSelector} from "react-redux";
import {listWorking} from "../actions/workingActions";



function Working(props) {

    const { title } = props;

    const dispatch = useDispatch();
    const workingList = useSelector((state) => state.workingList);

    //const pageSize = useSelector((state) => state.pageSize);
    const currentItem = useSelector(state => state.workingList.currentItem); // кол-во выводимых за раз пользователей


    const { loading, error, working } = workingList;

//    const [currentItem] = useState(6);      // кол-во выводимых за раз пользователей
    const [totalPage, setTotalPage] = useState(0);          // кол-во полученных пользователей
    const [currentPage, setCurrentPage] = useState(0);      // текущая страница
    const [currentEnd, setCurrentEnd] = useState(true);     // флаг последней страницы ставим false
    const [currentNone, setCurrentNone] = useState(true);   // флаг вывода кнопки Показать еще
    const [fetching, setFetching] = useState(true);         // нажатие на кнопку Показать еще


    useEffect(() => {

        dispatch( listWorking(
            currentItem,
            currentEnd,
            totalPage,
            setTotalPage,
            currentPage,
            fetching,
            setFetching)
        );
    }, [dispatch, fetching, currentItem, currentEnd, currentPage, totalPage ]);

    const scroolButton = () => {
        setCurrentPage( prevState => prevState + 1);            // увеличиваем текущую страницу на 1
        const pageActive = Math.floor(totalPage / currentItem);    // определяем сколько всего активных страниц

        if(currentPage !== 0 && pageActive <= currentPage ) {
            setCurrentEnd(false);                               // устанавливаем признак последней страницы
        }
        if(currentPage !== 0 && pageActive <= currentPage+1 ) {
            setCurrentNone(false);                              // устанавливаем признак не вывода кнопки
        }
        //debugger;

        console.log('currentPage ' + currentPage + '-' + currentNone );


        setFetching(true);
        console.log('scrool');
    }

    return (
        <div className="container">
            <h2 className="people__title">
                {title}
            </h2>
            <div>
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="error">{error}</MessageBox>
                ) : (

                        <div className="people__list">
                            {working.map((workingitem) => (
                                <WorkingItem key={workingitem.id} working={workingitem}></WorkingItem>
                            ))}
                        </div>
                )}
                {currentNone ? (
                        <div className="people__btn btn-120">
                            <button onClick={scroolButton} className="a-btn a-btn-active">Show more</button>
                        </div>

                ) : null}

            </div>

        </div>
    );
}

export default Working;