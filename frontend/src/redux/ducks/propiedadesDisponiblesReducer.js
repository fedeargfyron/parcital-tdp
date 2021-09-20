import axios from 'axios'

const GET_PROPIEDADESDISPONIBLES_REQUEST = 'GET_PROPIEDADESDISPONIBLES'
const GET_PROPIEDADESDISPONIBLES_SUCCESS = 'GET_PROPIEDADESDISPONIBLES_SUCCESS'
const GET_PROPIEDADESDISPONIBLES_FAIL = 'GET_PROPIEDADESDISPONIBLES_FAIL'

export const getPropiedadesDisponibles = () => async (dispatch) => {
    try{
        
        dispatch({
            type: GET_PROPIEDADESDISPONIBLES_REQUEST
        })
        const { data } = await axios({
            method:"GET",
            withCredentials: true,
            url: "http://localhost:4000/api/propiedades/disponibles"
        })
        dispatch({
            type: GET_PROPIEDADESDISPONIBLES_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_PROPIEDADESDISPONIBLES_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

const initialState = {
    propiedadesDisponibles: null
}

export const getPropiedadesDisponiblesReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_PROPIEDADESDISPONIBLES_REQUEST: return {
            loadingPropiedadesDisponibles: true
        }
        case GET_PROPIEDADESDISPONIBLES_SUCCESS: return{
            loadingPropiedadesDisponibles: false,
            propiedadesDisponibles: action.payload
        }
        case GET_PROPIEDADESDISPONIBLES_FAIL: return{
            loadingPropiedadesDisponibles: false,
            errorPropiedadesDisponibles: action.payload
        }
        default: return state
    }
}