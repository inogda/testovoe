import {
    CLEAR_ERRORS,
    WORKING_DETAILS_FAIL,
    WORKING_DETAILS_REQUEST,
    WORKING_DETAILS_SUCCESS,
    WORKING_LIST_FAIL,
    WORKING_LIST_REQUEST,
    WORKING_LIST_SUCCESS,
    WORKING_SET_FETCHING,
    WORKING_SET_TOTAL_PAGE
} from "../constants/workingConstants";
import axios from "axios-proxy-fix";


export const listWorking = (
    currentItem,
    current_End,
    current_Page,
    fetching,
    ) => async (dispatch) => {

    try {
        dispatch({type: WORKING_LIST_REQUEST});

        if(fetching === true && current_End === true) {

            // если асинхронный запрос успешний то делаю диспатч на вывод данных
             const { data } = await axios({
                method: 'get',
                url: 'https://frontend-test-assignment-api.abz.agency/api/v1/users',
                params: {
                    page: current_Page,
                    count: currentItem,
                }
            });

            /*
            // Запрос на мой сервер
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
            */

            dispatch({type: WORKING_SET_TOTAL_PAGE, payload: data.total_users });
            dispatch({type: WORKING_LIST_SUCCESS, payload: data.users });
        }else{
            dispatch({type: WORKING_LIST_SUCCESS, payload: [] });
        }

    } catch (error) {
        // если асинхронній запрос не прошел, то делаю диспатч на вывод ошибки
        dispatch({type: WORKING_LIST_FAIL, payload: error.message });
    } finally {
        dispatch({type: WORKING_SET_FETCHING, payload: false });
        //setFetching(false);
    }
}


// Create item users
export function createWorking(sendFormData, token) {
    return function(dispatch) {
            return axios({
                method: 'post',
                url: 'https://frontend-test-assignment-api.abz.agency/api/v1/users',
                data: sendFormData,
                headers: {
                    'Token': token,
                },
            });
    }
};

// details user ID
export const detailsWorking = (userId) => async (dispatch) => {
    try {
        dispatch({type: WORKING_DETAILS_REQUEST, payload: userId });
        // если асинхронній запрос успешний то делаю диспатч на вывод данных
        const { data } = await axios({
            method: 'get',
            //url: `https://ino.pp.ua/rest/working/${userId}`,
            url: `https://frontend-test-assignment-api.abz.agency/api/v1/users/${userId}`,
            //headers: { 'Content-Type': 'application/json', 'Content-Language': 'en, ase, ua', },
            //params: { p: 'PiozdolgiduMRZvadwienudaW287Q==' }
        });
        //dispatch({type: WORKING_DETAILS_SUCCESS, payload: data.object });
        dispatch({type: WORKING_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
        // если асинхронній запрос не прошел, то делаю диспатч на вывод ошибки
        dispatch({type: WORKING_DETAILS_FAIL, payload: error.message });
    }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};