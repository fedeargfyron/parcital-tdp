import axios from 'axios'

const GET_MODULOS_REQUEST = 'GET_MODULOS'
const GET_MODULOS_SUCCESS = 'GET_MODULOS_SUCCESS'
const GET_MODULOS_FAIL = 'GET_MODULOS_FAIL'

export const getModulos = () => async (dispatch) => {
    try{
        dispatch({
            type: GET_MODULOS_REQUEST
        })
        const { data } = await axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:4000/api/acciones/modulos'
        })
        dispatch({
            type: GET_MODULOS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_MODULOS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

const initialState = {
    modulos: null
}

export const getModulosReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_MODULOS_REQUEST: return {
            loadingModulos: true
        }
        case GET_MODULOS_SUCCESS: return{
            loadingModulos: false,
            modulos: action.payload
        }
        case GET_MODULOS_FAIL: return{
            loadingModulos: false,
            errorModulos: action.payload
        }
        default: return state
    }
}