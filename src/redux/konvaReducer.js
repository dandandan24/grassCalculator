

const initial_state = {
    mode : 'Line',
    stage : null,
    Polygons : [],
    Rectangles : [],
    Circles : [],
    Windowstage : null,
    AlgorithmResult:[]
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
    }
    return state
}


export default konvaReducer