import axios from 'axios'

const GET_DUEÑOS_REQUEST = 'GET_DUEÑOS_REQUEST'
const GET_DUEÑOS_SUCCESS = 'GET_DUEÑOS_SUCCESS'
const GET_DUEÑOS_FAIL = 'GET_DUEÑOS_FAIL'

export const getDueños = () => async (dispatch) => {
    try{
        dispatch({
            type: GET_DUEÑOS_REQUEST
        })
        const { data } = await axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:4000/api/personas/duenos'
        })
        dispatch({
            type: GET_DUEÑOS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_DUEÑOS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

const initialState = {
    dueños: []
}

export const getDueñosReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_DUEÑOS_REQUEST: return{
            loading: true
        }
        case GET_DUEÑOS_SUCCESS: return{
            loading: false,
            dueños: action.payload
        }
        case GET_DUEÑOS_FAIL: return{
            loading: false,
            error: action.payload
        }
        default: return state
    }
}