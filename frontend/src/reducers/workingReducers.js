import {
    WORKING_DETAILS_FAIL,
    WORKING_DETAILS_REQUEST, WORKING_DETAILS_SUCCESS,
    WORKING_LIST_FAIL,
    WORKING_LIST_REQUEST,
    WORKING_LIST_SUCCESS
} from "../constants/workingConstants";


export const workingListReducer = (
    state= {
        loading: true,
        working: [],
        currentItem: 6,
        currentNone: true
    },
    action
) => {
    const item = action.payload;
    switch (action.type) {
        case WORKING_LIST_REQUEST:
            return { ...state, loading: true}
        case WORKING_LIST_SUCCESS:

            if(state.loading === false){
                //return {...state, loading: false, working: [...state.working, item] }
            }else{
                //debugger;
                return {...state, loading: false, working:  [...state.working, ...item] }
            }
            return state;
        case WORKING_LIST_FAIL:
            return {loading: false, error: item}
        default:
            return state;
    }
}

export const workingDetailsReducer = (
    state={loading: true, details: [] },
    action
) => {
    const item = action.payload;
    switch (action.type) {
        case WORKING_DETAILS_REQUEST:
            return {loading: true}
        case WORKING_DETAILS_SUCCESS:
            return {loading: false, details: item}
        case WORKING_DETAILS_FAIL:
            return {loading: false, error: item}
        default:
            return state;
    }

}