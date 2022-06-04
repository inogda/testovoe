import {
    WORKING_DETAILS_FAIL,
    WORKING_DETAILS_REQUEST,
    WORKING_DETAILS_SUCCESS,
    WORKING_LIST_FAIL,
    WORKING_LIST_REQUEST,
    WORKING_LIST_SUCCESS,
    WORKING_LIST_CLEAR,
    WORKING_SET_CURRENT_END,
    WORKING_SET_CURRENT_NONE,
    WORKING_SET_TOTAL_PAGE,
    WORKING_SET_CURRENT_PAGE,
    WORKING_SET_FETCHING, CLEAR_ERRORS,
} from "../constants/workingConstants";

export const workingListReducer = (
    state= {
        loading: true,          // вывод прелоадера
        success: false,
        fetching: true,         // обновить список items
        working: [],            // Массив items
        currentItem: 6,         // кол-во выводимых за раз пользователей
        current_End: true,      // флаг последней страницы ставим false
        current_None: true,     // флаг вывода кнопки Показать еще
        total_Page: 0,          // кол-во полученных пользователей
        current_Page: 1,        // текущая страница
    },
    action
) => {
    const actpay = action.payload;
    switch (action.type) {
        case WORKING_SET_FETCHING:
            return { ...state, fetching: actpay, };
        case WORKING_SET_CURRENT_END:
            return { ...state, current_End: actpay, };
        case WORKING_SET_CURRENT_NONE:
            return { ...state, current_None: actpay, };
        case WORKING_SET_TOTAL_PAGE:
            return { ...state, total_Page: actpay, };
        case WORKING_SET_CURRENT_PAGE:
            return { ...state, current_Page: actpay, };
        case WORKING_LIST_CLEAR:
            return { ...state, working:  [], };
        case WORKING_LIST_REQUEST:
            return { ...state, loading: true, };
        case WORKING_LIST_SUCCESS:
            if(state.loading === false){
                //return {...state, loading: false, working: [...state.working, actpay] }
                return state;
            }else{
                //debugger;
                return { ...state, loading: false, working:  [...state.working, ...actpay], };
            }
        case WORKING_LIST_FAIL:
            return { ...state, loading: false, error: actpay, };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}



export const workingDetailsReducer = (
    state={
        loading: true,
        details: [],
    },
    action
) => {
    const actpay = action.payload;
    switch (action.type) {
        case WORKING_DETAILS_REQUEST:
            return {
                loading: true,
            };
        case WORKING_DETAILS_SUCCESS:
            return {
                loading: false,
                details: actpay,
            };
        case WORKING_DETAILS_FAIL:
            return {
                loading: false,
                error: actpay,
            };
        default:
            return state;
    }

}

