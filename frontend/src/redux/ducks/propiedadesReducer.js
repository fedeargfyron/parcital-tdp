import axios from 'axios'

const GET_PROPIEDADES_REQUEST = 'GET_PROPIEDADES'
const GET_PROPIEDADES_SUCCESS = 'GET_PROPIEDADES_SUCCESS'
const GET_PROPIEDADES_FAIL = 'GET_PROPIEDADES_FAIL'

export const getPropiedades = (tipo) => async (dispatch) => {
    try{
        dispatch({
            type: GET_PROPIEDADES_REQUEST
        })
        const { data } = await axios({
            method:"GET",
            withCredentials: true,
            params: {
                tipo: tipo
            },
            url: `http://localhost:4000/api/propiedades/${tipo}`
        })
        dispatch({
            type: GET_PROPIEDADES_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_PROPIEDADES_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

const initialState = {
    propiedades: null
}

export const getPropiedadesReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_PROPIEDADES_REQUEST: return {
            loading: true
        }
        case GET_PROPIEDADES_SUCCESS: return{
            loading: false,
            propiedades: action.payload
        }
        case GET_PROPIEDADES_FAIL: return{
            loading: false,
            error: action.payload
        }
        default: return state
    }
}