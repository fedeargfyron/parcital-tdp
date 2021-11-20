import axios from 'axios'

const GET_TIPOSPROPIEDAD_REQUEST = 'GET_TIPOSPROPIEDAD_REQUEST'
const GET_TIPOSPROPIEDAD_SUCCESS = 'GET_TIPOSPROPIEDAD_SUCCESS'
const GET_TIPOSPROPIEDAD_FAIL = 'GET_TIPOSPROPIEDAD_FAIL'

export const getTiposPropiedad = () => async (dispatch) => {
    try{
        dispatch({
            type: GET_TIPOSPROPIEDAD_REQUEST
        })
        const { data } = await axios({
            method:"GET",
            withCredentials: true,
            url: "http://localhost:4000/api/tiposPropiedad"
        })
        dispatch({
            type: GET_TIPOSPROPIEDAD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_TIPOSPROPIEDAD_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

const initialState = {
    tiposPropiedad: null
}

export const getTiposPropiedadReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_TIPOSPROPIEDAD_REQUEST: return {
            loadingTiposPropiedad: true
        }
        case GET_TIPOSPROPIEDAD_SUCCESS: return{
            loadingTiposPropiedad: false,
            tiposPropiedad: action.payload
        }
        case GET_TIPOSPROPIEDAD_FAIL: return{
            loadingTiposPropiedad: false,
            errorTiposPropiedad: action.payload
        }
        default: return state
    }
}
