import Polygon from "../Components/Konva/copiedPolygon"

const LineEquation = (x , y , x1 ,y1) => {
    // slope of straight line = y-y1 / x-x1
    if(x-x1 === 0){
        return [Infinity, Infinity]
    }
    if(y-y1 === 0){
        return [0 , y]
    }
    let slope = (y-y1) / (x-x1)
    // equation of straight line = y= mx + b when b is constant
    let constant = slope *(x1* -1) + y1
    return [slope,constant]
}


const PointsGenerator = (firstX , lastX, slope , constant) => {
    //this function gets a range of X's between two points , and return an array of points with gap of 1
    let PointsArray = []
    if(firstX > lastX){
        for(let currentX = firstX ; currentX >= lastX ; currentX--){
            let currentY = slope*currentX + constant
            PointsArray = [...PointsArray , [currentX , currentY]]
        }
    }
    else {
        for(let currentX = firstX ; currentX <= lastX ; currentX++){
            let currentY = slope*currentX + constant
            PointsArray = [...PointsArray , [currentX , currentY]]
        }
    }
    return PointsArray
}


const indexOfPoint = (point , Points) => {
    // returns the index of certain point
    for(let index = 0 ; index < Points.length ; index++){
        if(Points[index][0] === point[0] && Points[index][1] === point[1]){
            return index
        }
    }
    return -1;
}

const removeUselessPoints=  (PolygonPoints) => {
    //this function gets polygon points and remove useless one which means they are not part of the polygon
    let beforePointEquation = []
    let afterPointEquation = []
    let PointsToSplice = []
    let CopyPoints = [...PolygonPoints]
    for(let point = 0 ; point < PolygonPoints.length ; point++){
        if(point === 0){
            beforePointEquation = LineEquation(PolygonPoints[PolygonPoints.length -1][0] ,PolygonPoints[PolygonPoints.length -1][1] , PolygonPoints[point][0] , PolygonPoints[point][1])
            afterPointEquation = LineEquation(PolygonPoints[point][0] ,PolygonPoints[point][1] , PolygonPoints[point+1][0] , PolygonPoints[point+1][1])
        }
        else{
            if(point === PolygonPoints.length -1){
                beforePointEquation = LineEquation(PolygonPoints[point-1][0] ,PolygonPoints[point-1][1] , PolygonPoints[point][0] , PolygonPoints[point][1])
                afterPointEquation = LineEquation(PolygonPoints[point][0] ,PolygonPoints[point][1] , PolygonPoints[0][0] , PolygonPoints[0][1])
            }
            else{
                beforePointEquation = LineEquation(PolygonPoints[point-1][0] ,PolygonPoints[point-1][1] , PolygonPoints[point][0] , PolygonPoints[point][1])
                afterPointEquation = LineEquation(PolygonPoints[point][0] ,PolygonPoints[point][1] , PolygonPoints[point+1][0] , PolygonPoints[point+1][1])
            }
        }
        console.log(beforePointEquation , afterPointEquation , "before and after equations")
        if(beforePointEquation[0] === afterPointEquation[0]){
            PointsToSplice.push(point)
        }
      
    }
    PointsToSplice = [...new Set(PointsToSplice)]
    for(let i = 0 ; i < PointsToSplice.length ; i++){
        CopyPoints.splice(PointsToSplice[i] - i , 1)
    }
    console.log(CopyPoints ,'pointsleft')
    return CopyPoints

}


// const ShapeSplitter = (StartPoint, EndPoint , OriginShapePoints) => {
//     // this function get a big shape and coordinates of line crossing it and return the splitted shapes
//     console.log(StartPoint, EndPoint , OriginShapePoints , 'cord')
//     let StartIndex = indexOfPoint(StartPoint , OriginShapePoints)
//     let EndIndex = indexOfPoint(EndPoint ,OriginShapePoints)
//     let FirstShape = []
//     let SecondShape = []
//     let LineConstants = LineEquation(OriginShapePoints[EndIndex][0] , OriginShapePoints[EndIndex][1] , OriginShapePoints[StartIndex][0] , OriginShapePoints[StartIndex][1])
//     for(let point = StartIndex+1 ; point < EndIndex ; point++){
//         FirstShape = [...FirstShape , OriginShapePoints[point]]
//     }
//     FirstShape = [...FirstShape , ...PointsGenerator(OriginShapePoints[EndIndex][0] , OriginShapePoints[StartIndex][0] , LineConstants[0] , LineConstants[1])]
//     console.log(FirstShape , 'firstShape')
//     for(let point = EndIndex+1 ; point < OriginShapePoints.length ; point++){
//         SecondShape = [...SecondShape , OriginShapePoints[point]]
//     }
//     for(let point = 0; point < StartIndex ; point++){
//         SecondShape = [...SecondShape , OriginShapePoints[point]]
//     }
//     SecondShape = [...SecondShape , ...PointsGenerator(OriginShapePoints[StartIndex][0] , OriginShapePoints[EndIndex][0] , LineConstants[0] , LineConstants[1])]
//     console.log(SecondShape , 'secondShape')
//     return [FirstShape , SecondShape]
// }

const ShapeSplitter = (StartPoint, EndPoint , OriginShapePoints) => {
    // this function get a big shape and coordinates of line crossing it and return the splitted shapes
    console.log(StartPoint, EndPoint , OriginShapePoints , 'cord')
    let StartIndex = indexOfPoint(StartPoint , OriginShapePoints)
    let EndIndex = indexOfPoint(EndPoint ,OriginShapePoints)
    let FirstShape = []
    let SecondShape = []
    console.log(OriginShapePoints , StartIndex , EndIndex)
    let LineConstants = LineEquation(OriginShapePoints[EndIndex][0] , OriginShapePoints[EndIndex][1] , OriginShapePoints[StartIndex][0] , OriginShapePoints[StartIndex][1])
    for(let point = StartIndex ; point <= EndIndex ; point++){
        FirstShape = [...FirstShape , OriginShapePoints[point]]
    }
    console.log(FirstShape , 'firstShape')
    for(let point = EndIndex ; point < OriginShapePoints.length ; point++){
        SecondShape = [...SecondShape , OriginShapePoints[point]]
    }
    for(let point = 0; point <= StartIndex ; point++){
        SecondShape = [...SecondShape , OriginShapePoints[point]]
    }
    console.log(SecondShape , 'secondShape')

    return [removeUselessPoints(FirstShape) ,removeUselessPoints(SecondShape)]
}

export default ShapeSplitter