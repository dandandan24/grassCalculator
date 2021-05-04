

const initial_state = {
    mode : 'Line',
}


const konvaReducer = (state = initial_state , action) => {
    switch (action.type){
        case 'ChangeMode' : 
            return {
                ...state,
                mode : action.newMode
            }   
    }
    return state
}


export default konvaReducer