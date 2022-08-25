export const SET_FROM_GENDER = "SET_FROM_GENDER";
export const SET_FROM_CATEGORY= "SET_FROM_CATEGORY";

export const setFromgender = fromgender => dispatch => {
    dispatch({
        type: SET_FROM_GENDER,
        payload: fromgender,
    });
};
export const setFromcategory = fromcategory => dispatch => {
    dispatch({
        type: SET_FROM_CATEGORY,
        payload: fromcategory,
    });
};