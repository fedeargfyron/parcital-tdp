import axios from 'axios'

const GET_OFERTASAGENTE_REQUEST = 'GET_OFERTASAGENTE_REQUEST'
const GET_OFERTASAGENTE_SUCCESS = 'GET_OFERTASAGENTE_SUCCESS'
const GET_OFERTASAGENTE_FAIL = 'GET_OFERTASAGENTE_FAIL'

export const getOfertasAgente = (filtros) => async (dispatch) => {
    try{
        dispatch({
            type: GET_OFERTASAGENTE_REQUEST
        })
        const { data } = await axios({
            method: 'GET',
            withCredentials: true,
            params:{
                filtros: filtros
            },
            url: 'http://localhost:4000/api/ofertas/agente'
        })
        dispatch({
            type: GET_OFERTASAGENTE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_OFERTASAGENTE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

const initialState = {
    ofertasAgente: null
}

export const getOfertasAgenteReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_OFERTASAGENTE_REQUEST: return {
            loadingOfertasAgente: true
        }
        case GET_OFERTASAGENTE_SUCCESS: return {
            loadingOfertasAgente: false,
            ofertasAgente: action.payload
        }
        case GET_OFERTASAGENTE_FAIL: return {
            loadingOfertasAgente: false,
            errorOfertasAgente: action.payload
        }
        default: return state
    }
    
}