import React, { useEffect } from 'react';
import WorkingItem from "./WorkingItem";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import {useDispatch, useSelector} from "react-redux";
import {listWorking} from "../actions/workingActions";
import {
    WORKING_SET_CURRENT_END,
    WORKING_SET_CURRENT_NONE,
    WORKING_SET_CURRENT_PAGE, WORKING_SET_FETCHING
} from "../constants/workingConstants";



function Working(props) {

    const { title } = props;

    const dispatch = useDispatch();
    const workingList = useSelector((state) => state.workingList);

    //const pageSize = useSelector((state) => state.pageSize);
    const currentItem = useSelector(state => state.workingList.currentItem);    // кол-во выводимых за раз пользователей
    const current_End = useSelector(state => state.workingList.current_End);    // флаг последней страницы ставим false
    const current_None = useSelector(state => state.workingList.current_None);  // флаг вывода кнопки Показать еще
    const total_Page = useSelector(state => state.workingList.total_Page);      // кол-во полученных пользователей
    const current_Page = useSelector(state => state.workingList.current_Page);  // текущая страница
    const fetching = useSelector(state => state.workingList.fetching);          // флаг обновления массива items

    const { loading, error, working } = workingList;

    //const [currentItem] = useState(6);      // кол-во выводимых за раз пользователей
    //const [totalPage, setTotalPage] = useState(0);          // кол-во полученных пользователей
    //const [currentPage, setCurrentPage] = useState(0);      // текущая страница
    //const [currentEnd, setCurrentEnd] = useState(true);     // флаг последней страницы ставим false
    //const [currentNone, setCurrentNone] = useState(true);   // флаг вывода кнопки Показать еще
    //const [fetching, setFetching] = useState(true);         // нажатие на кнопку Показать еще


    useEffect(() => {

        dispatch( listWorking(
            currentItem,
            current_End,
            current_Page,
            fetching,
            )
        );
    }, [dispatch, fetching, currentItem, current_End, current_Page ]);

    const scroolButton = () => {

        dispatch({type: WORKING_SET_CURRENT_PAGE, payload: current_Page+1 });

        //setCurrentPage( prevState => prevState + 1);            // увеличиваем текущую страницу на 1
        const pageActive = Math.floor(total_Page / currentItem);    // определяем сколько всего активных страниц

        if(current_Page !== 1 && pageActive <= current_Page ) {
            dispatch({type: WORKING_SET_CURRENT_END, payload: false });
            //setCurrentEnd(false);                               // устанавливаем признак последней страницы
        }
        if(current_Page !== 1 && pageActive <= current_Page+1 ) {
            dispatch({type: WORKING_SET_CURRENT_NONE, payload: false });
            //setCurrentNone(false);                              // устанавливаем признак не вывода кнопки
        }


        console.log('current_Page ' + current_Page + '-' + current_None );

        dispatch({type: WORKING_SET_FETCHING, payload: true });
        //setFetching(true);
        console.log('scrool');

        //debugger;
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