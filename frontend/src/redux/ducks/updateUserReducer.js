import axios from 'axios'
const GET_UPDATEUSER_REQUEST = 'GET_UPDATEUSER'
const GET_UPDATEUSER_SUCCESS = 'GET_UPDATEUSER_SUCCESS'
const GET_UPDATEUSER_FAIL = 'GET_UPDATEUSER_FAIL'

export const getUpdateUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_UPDATEUSER_REQUEST
        })
        const { data } = await axios({
            method: 'GET',
            withCredentials: true,
            url: `http://localhost:4000/api/usuarios/${id}`
        })
        dispatch({
            type: GET_UPDATEUSER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_UPDATEUSER_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

const initialState = {
    updateUser: null
}

export const getUpdateUserReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_UPDATEUSER_REQUEST: return{
            loadingUpdateUser: true
        }
        case GET_UPDATEUSER_SUCCESS: return{
            loadingUpdateUser: false,
            updateUser: action.payload
        }
        case GET_UPDATEUSER_FAIL: return{
            loadingUpdateUser: false,
            updateUser: action.payload
        }
        default: return state
    }
} 

