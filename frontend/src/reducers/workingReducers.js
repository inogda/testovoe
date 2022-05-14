import {
    WORKING_DETAILS_FAIL,
    WORKING_DETAILS_REQUEST, WORKING_DETAILS_SUCCESS,
    WORKING_LIST_FAIL,
    WORKING_LIST_REQUEST,
    WORKING_LIST_SUCCESS
} from "../constants/workingConstants";


export const workingListRedicer = (
    state={loading: true, working: [] },
    action
) => {
    switch (action.type) {
        case WORKING_LIST_REQUEST:
            return {loading: true}
        case WORKING_LIST_SUCCESS:
            return {loading: false, working: action.payload}
        case WORKING_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}



export const workingDetailsRedicer = (
    state={loading: true, details: [] },
    action
) => {
    switch (action.type) {
        case WORKING_DETAILS_REQUEST:
            return {loading: true}
        case WORKING_DETAILS_SUCCESS:
            return {loading: false, details: action.payload}
        case WORKING_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }

}