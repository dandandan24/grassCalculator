import { SatelliteSharp } from "@material-ui/icons"


const initial_state = {
    mode : 'Polygon',
    stage : null,
    height : 0,
    Polygons : [],
    Rectangles : [],
    Circles : [],
    Windowstage : null,
    AlgorithmResult:[],
    points : [],
    stateStack : []
}



const konvaReducer = (state = initial_state , action) => {
    switch (action.type){
        case 'ChangeHeight':
            return {
                ...state,
                height : action.newHeight
            }   
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
            
        case 'ChangeStageWindow' : 
            return {
                ...state,
                Windowstage : action.newWindowstage
            }  
        case 'UpdatePolygons' : 
            return {
                ...state,
                Polygons : action.newPolygons
            }   
        case 'UpdateRectangles' : 
            return {
                ...state,
                Rectangles : action.newRectangles
            }   
        case 'UpdateCircles' : 
            return {
                ...state,
                Circles : action.newCircles
            }   
        case 'ChagneResultArray': 
            return {
                ...state,
                AlgorithmResult : action.newResult
            }  
        case 'AddPoint':
            let newPoints = [...state.points , action.newPoint]
            return{
                ...state,
                points : newPoints
            }
        case 'emptyPoints':       
            return{
                ...state,
                points : []
            }
        case 'actionTrigger' : 
            let newState ={...state}
            delete newState['stateStack']
            let CopystateStack = [...state.stateStack , newState]
            return{
                ...state,
                stateStack : CopystateStack
            }
        case 'Undo' : 
            let lastState 
            
            if(state.stateStack.length <= 1){
                lastState =  { mode : 'Polygon',
                stage : null,
                height : 0,
                Polygons : [],
                Rectangles : [],
                Circles : [],
                Windowstage : null,
                AlgorithmResult:[],
                points : [],
                stateStack : []
                }
            }
            else{
                lastState = {...state.stateStack[state.stateStack.length -2]}
                lastState['stateStack'] = state.stateStack
                lastState['stateStack'].splice( lastState['stateStack'].length-1 , 1)
                
            }      
            console.log(lastState, 'laststate')
            return{
                ...lastState                
            }
        case 'Reset':
            return{
                mode : 'Polygon',
                stage : null,
                height : 0,
                Polygons : [],
                Rectangles : [],
                Circles : [],
                Windowstage : null,
                AlgorithmResult:[],
                points : [],
                stateStack : []
            }
    }
    return state
}


export default konvaReducer