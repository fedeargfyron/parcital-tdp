import axios from 'axios'

const GET_USERS_REQUEST = 'GET_USERS_REQUEST'
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
const GET_USERS_FAIL = 'GET_USERS_FAIL'

export const getUsers = (filtros) => async (dispatch) => {
    try{
        dispatch({
            type: GET_USERS_REQUEST
        })
        const { data } = await axios({
            method: 'GET',
            withCredentials: true,
            params: {
                filtros: filtros
            },
            url: 'http://localhost:4000/api/usuarios'
        })
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_USERS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

const initialState = {
    users: null
}

export const getUsersReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_USERS_REQUEST: return {
            loadingUsers: true
        }
        case GET_USERS_SUCCESS: return {
            loadingUsers: false,
            users: action.payload
        }
        case GET_USERS_FAIL: return {
            loadingUsers: false,
            errorUsers: action.payload
        }
        default: return state
    }
    
}