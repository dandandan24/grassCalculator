
const LineLength = (x,y,x1,y1) => {
    //return the line length
    return(Math.sqrt(Math.pow((x-x1),2) + Math.pow((y-y1),2)))
}

const RectangleMeasures = (Points) => {
    // return the height and width of the rectangle
    let FirstMeasure = LineLength(Points[0][0] ,Points[0][1] , Points[1][0] , Points[1][1])
    let SecondMeasure =LineLength(Points[1][0] ,Points[1][1] , Points[2][0] , Points[2][1])
    return [FirstMeasure , SecondMeasure]
}

export default RectangleMeasures