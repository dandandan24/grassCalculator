

const initial_state = {
    mode : 'Line',
    stage : null
}


const konvaReducer = (state = initial_state , action) => {
    switch (action.type){
        case 'ChangeMode' : 
            return {
                ...state,
                mode : action.newMode
            }   
        case 'ChangeStage' : 
            return {
                ...state,
                stage : action.newStage
            }   
    }
    return state
}


export default konvaReducer