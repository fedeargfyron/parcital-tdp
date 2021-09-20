import axios from 'axios'

const GET_PROPIEDAD_REQUEST = 'GET_PROPIEDAD'
const GET_PROPIEDAD_SUCCESS = 'GET_PROPIEDAD_SUCCESS'
const GET_PROPIEDAD_FAIL = 'GET_PROPIEDAD_FAIL'

export const getPropiedad = (id, gestion) => async (dispatch) => {
    try{
        dispatch({
            type: GET_PROPIEDAD_REQUEST
        })
        const { data } = await axios({
            method:"GET",
            withCredentials: true,
            params: {
                gestion: gestion
            },
            url: `http://localhost:4000/api/propiedades/${id}`
        })
        dispatch({
            type: GET_PROPIEDAD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_PROPIEDAD_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

const initialState = {
    propiedad: null
}

export const getPropiedadReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_PROPIEDAD_REQUEST: return {
            loadingPropiedad: true
        }
        case GET_PROPIEDAD_SUCCESS: return{
            loadingPropiedad: false,
            propiedad: action.payload
        }
        case GET_PROPIEDAD_FAIL: return{
            loadingPropiedad: false,
            errorPropiedad: action.payload
        }
        default: return state
    }
}