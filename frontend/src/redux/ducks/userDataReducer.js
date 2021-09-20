import axios from 'axios'
const GET_USERDATA_REQUEST = 'GET_USERDATA'
const GET_USERDATA_SUCCESS = 'GET_USERDATA_SUCCESS'
const GET_USERDATA_FAIL = 'GET_USERDATA_FAIL'

export const getUserData = (id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_USERDATA_REQUEST
        })
        const { data } = await axios({
            method: 'GET',
            withCredentials: true,
            url: `http://localhost:4000/api/logUser/userdata`
        })
        dispatch({
            type: GET_USERDATA_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_USERDATA_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

const initialState = {
    userdata: null
}

export const getUserDataReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_USERDATA_REQUEST: return{
            loadingUserdata: true
        }
        case GET_USERDATA_SUCCESS: return{
            loadingUserdata: false,
            userdata: action.payload
        }
        case GET_USERDATA_FAIL: return{
            loadingUserdata: false,
            userdata: action.payload
        }
        default: return state
    }
} 

