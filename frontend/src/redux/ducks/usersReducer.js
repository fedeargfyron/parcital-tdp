const GET_USERS_REQUEST = 'GET_USERS'
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
const GET_USERS_FAIL = 'GET_USERS_FAIL'

export const getUsers = () => async (dispatch) => {
    try {
        
    } catch {

    }
}

initialState={
    user: null
}

export const getUsersReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_USERS_REQUEST: return{

        }
        case GET_USERS_SUCCESS: return{

        }
        case GET_USERS_FAIL: return{

        }
        default: return state
    }
} 

