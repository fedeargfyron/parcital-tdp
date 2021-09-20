import axios from 'axios'

const GET_PERSONA_REQUEST = 'GET_PERSONA'
const GET_PERSONA_SUCCESS = 'GET_PERSONA_SUCCESS'
const GET_PERSONA_FAIL = 'GET_PERSONA_FAIL'

export const getPersona = (id) => async (dispatch) => {
    try{
        
        dispatch({
            type: GET_PERSONA_REQUEST
        })
        const { data } = await axios({
            method:"GET",
            withCredentials: true,
            url: `http://localhost:4000/api/personas/${id}`
        })
        dispatch({
            type: GET_PERSONA_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_PERSONA_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

const initialState = {
    persona: null
}

export const getPersonaReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_PERSONA_REQUEST: return {
            loadingPersona: true
        }
        case GET_PERSONA_SUCCESS: return{
            loadingPersona: false,
            persona: action.payload
        }
        case GET_PERSONA_FAIL: return{
            loadingPersona: false,
            errorPersona: action.payload
        }
        default: return state
    }
}