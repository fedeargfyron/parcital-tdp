import axios from 'axios'

const GET_COMPRAS_REQUEST = 'GET_COMPRAS_REQUEST'
const GET_COMPRAS_SUCCESS = 'GET_COMPRAS_SUCCESS'
const GET_COMPRAS_FAIL = 'GET_COMPRAS_FAIL'

export const getCompras = (filtros, profile) => async (dispatch) => {
    try{
        dispatch({
            type: GET_COMPRAS_REQUEST
        })
        const { data } = await axios({
            method: 'GET',
            withCredentials: true,
            params: {
                filtros: filtros,
                profile: profile
            },
            url: 'http://localhost:4000/api/ventas'
        })
        dispatch({
            type: GET_COMPRAS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_COMPRAS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

const initialState = {
    compras: null
}

export const getComprasReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_COMPRAS_REQUEST: return {
            loadingCompras: true
        }
        case GET_COMPRAS_SUCCESS: return {
            loadingCompras: false,
            compras: action.payload
        }
        case GET_COMPRAS_FAIL: return {
            loadingCompras: false,
            errorCompras: action.payload
        }
        default: return state
    }
    
}