import axios from 'axios'

const GET_GRUPOS_REQUEST = 'GET_GRUPOS'
const GET_GRUPOS_SUCCESS = 'GET_GRUPOS_SUCCESS'
const GET_GRUPOS_FAIL = 'GET_GRUPOS_FAIL'

export const getGrupos = () => async (dispatch) => {
    try{
        dispatch({
            type: GET_GRUPOS_REQUEST
        })
        const { data } = await axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:4000/api/grupos'
        })
        dispatch({
            type: GET_GRUPOS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_GRUPOS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

const initialState = {
    grupos: null
}

export const getGruposReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_GRUPOS_REQUEST: return {
            loadingGrupos: true
        }
        case GET_GRUPOS_SUCCESS: return{
            loadingGrupos: false,
            grupos: action.payload
        }
        case GET_GRUPOS_FAIL: return{
            loadingGrupos: false,
            errorGrupos: action.payload
        }
        default: return state
    }
}