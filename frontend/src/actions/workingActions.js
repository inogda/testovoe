import {
    WORKING_DETAILS_FAIL,
    WORKING_DETAILS_REQUEST,
    WORKING_DETAILS_SUCCESS,
    WORKING_LIST_FAIL,
    WORKING_LIST_REQUEST,
    WORKING_LIST_SUCCESS, WORKING_SET_FETCHING,
    WORKING_SET_TOTAL_PAGE
} from "../constants/workingConstants";
import axios from "axios-proxy-fix";


export const listWorking = (
    currentItem,
    current_End,
    current_Page,
    fetching,
    ) => async (dispatch) => {


    //console.log('scrool ' + current_Page + '-' + fetching);
    dispatch({type: WORKING_LIST_REQUEST});

    try {
        if(fetching === true && current_End === true) {

            // если асинхронній запрос успешний то делаю диспатч на вывод данных
            const { data } = await axios({
                method: 'get',
                url: 'https://ino.pp.ua/rest/working',
                headers: { 'Content-Type': 'application/json', 'Content-Language': 'en, ase, ua', },
                params: {
                    p: 'PiozdolgiduMRZvadwienudaW287Q==',
                    start: current_Page*currentItem,
                    limit: currentItem,
                }
            });
            dispatch({type: WORKING_SET_TOTAL_PAGE, payload: data.total });

            //const { data } = await axios.get('https://ino.pp.ua/rest/working?p=Piondolgidra.Zvadwiensda-287');
            //console.log('scrool ' + current_Page + '-' + data.total/currentItem );

            dispatch({type: WORKING_LIST_SUCCESS, payload: data.results });
        }else{
            dispatch({type: WORKING_LIST_SUCCESS, payload: [] });
        }
        //debugger;

    } catch (error) {
        // если асинхронній запрос не прошел, то делаю диспатч на вывод ошибки
        dispatch({type: WORKING_LIST_FAIL, payload: error.message });
    } finally {
        dispatch({type: WORKING_SET_FETCHING, payload: false });
        //setFetching(false);
    }
}


export const detailsWorking = (productId) => async (dispatch) => {
    dispatch({type: WORKING_DETAILS_REQUEST, payload: productId });

    try {
        // если асинхронній запрос успешний то делаю диспатч на вывод данных
        const { data } = await axios({
            method: 'get',
            url: `https://ino.pp.ua/rest/working/${productId}`,
            //url: `https://ino.pp.ua/rest/working/1`,
            headers: { 'Content-Type': 'application/json', 'Content-Language': 'en, ase, ua', },
            params: { p: 'PiozdolgiduMRZvadwienudaW287Q==' }
        });

        dispatch({type: WORKING_DETAILS_SUCCESS, payload: data.object });

    } catch (error) {
        // если асинхронній запрос не прошел, то делаю диспатч на вывод ошибки
        dispatch({type: WORKING_DETAILS_FAIL, payload: error.message });
    }
}