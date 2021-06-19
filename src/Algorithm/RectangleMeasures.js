
const LineLength = (x,y,x1,y1) => {
    //return the line length
    return(Math.sqrt(Math.pow((x-x1),2) + Math.pow((y-y1),2)))
}

const RectangleMeasures = (Points) => {
    // return the height and width of the rectangle and return which measure controll left and right direction and which one controlls the up down direction
    let upDownMeasure 
    let leftRightMeasure
    console.log(Points , 'measures')
    // if the diffrence between x's smaller the diffrence between Y's its more vertical else more horizontal
    if(Math.abs(Points[0][0] -  Points[1][0]) <= Math.abs(Points[0][1] -  Points[1][1])){
        upDownMeasure = LineLength(Points[0][0] ,Points[0][1] , Points[1][0] , Points[1][1])
        leftRightMeasure = LineLength(Points[1][0] ,Points[1][1] , Points[2][0] , Points[2][1])
    }
    else{
        upDownMeasure = LineLength(Points[1][0] ,Points[1][1] , Points[2][0] , Points[2][1])
        leftRightMeasure = LineLength(Points[0][0] ,Points[0][1] , Points[1][0] , Points[1][1])
        console.log(upDownMeasure , leftRightMeasure , 'if x are not equal')
    }
    return [upDownMeasure , leftRightMeasure]
}

export default RectangleMeasures