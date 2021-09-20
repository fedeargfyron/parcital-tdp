const LOADING_TRUE = 'LOADING_TRUE'
const LOADING_FALSE = 'LOADING_FALSE'

const initialState = false

export const setLoadingReducer = (state = initialState, action) => {
    switch(action.type){
        case LOADING_TRUE: return true
        case LOADING_FALSE: return false                                  
        default: return state
    }
}