import {
    WORKING_DETAILS_FAIL,
    WORKING_DETAILS_REQUEST,
    WORKING_DETAILS_SUCCESS,
    WORKING_LIST_FAIL,
    WORKING_LIST_REQUEST,
    WORKING_LIST_SUCCESS
} from "../constants/workingConstants";
import axios from "axios-proxy-fix";



export const listWorking = () => async (dispatch) => {
    dispatch({type: WORKING_LIST_REQUEST});
    try {
        // если асинхронній запрос успешний то делаю диспатч на вывод данных
        const { data } = await axios({
            method: 'get',
            url: 'https://ino.pp.ua/rest/working',
            headers: { 'Content-Type': 'application/json', },
            params: { p: 'Piondolgidra.Zvadwiensda-287' }
        });

        //const { data } = await axios.get('https://ino.pp.ua/rest/working?p=Piondolgidra.Zvadwiensda-287');

        dispatch({type: WORKING_LIST_SUCCESS, payload: data.results })
    } catch (error) {
        // если асинхронній запрос не прошел, то делаю диспатч на вывод ошибки
        dispatch({type: WORKING_LIST_FAIL, payload: error.message })
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
            headers: { 'Content-Type': 'application/json', },
            params: { p: 'Piondolgidra.Zvadwiensda-287' }
        });

        dispatch({type: WORKING_DETAILS_SUCCESS, payload: data.object })

    } catch (error) {
        // если асинхронній запрос не прошел, то делаю диспатч на вывод ошибки
        dispatch({type: WORKING_DETAILS_FAIL, payload: error.message })
    }
}