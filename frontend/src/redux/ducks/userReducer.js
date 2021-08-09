import axios from 'axios'
const GET_USER_REQUEST = 'GET_USER'
const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
const GET_USER_FAIL = 'GET_USER_FAIL'

export const getUser = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_USER_REQUEST
        })
        const { data } = await axios({
            method: 'GET',
            withCredentials: true,
            url: "http://localhost:4000/api/logUser"
        })
        dispatch({
            type: GET_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_USER_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

const initialState = {
    user: null
}

export const getUserReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_USER_REQUEST: return{
            loadingUser: true
        }
        case GET_USER_SUCCESS: return{
            loadingUser: false,
            user: action.payload
        }
        case GET_USER_FAIL: return{
            loadingUser: false,
            errorUser: action.payload
        }
        default: return state
    }
} 

