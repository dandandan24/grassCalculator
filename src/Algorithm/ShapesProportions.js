
const roundingUp = (Points) => {
     //get an array of points and return the same array in the right proportion
     let RoundedPointsArray = [...Points]
     for(let point =0 ; point < RoundedPointsArray.length ; point++){
        let roundingUpX = RoundedPointsArray[point][0]
        let roundingUpY = RoundedPointsArray[point][1]
        for(let j = 0 ; j < RoundedPointsArray.length ; j++){
            if(roundingUpX - RoundedPointsArray[j][0] > 0 && roundingUpX - RoundedPointsArray[j][0] < 20){
                RoundedPointsArray[j][0] = roundingUpX
            }
            if(roundingUpY - RoundedPointsArray[j][1] > 0 && roundingUpY - RoundedPointsArray[j][1] < 20){
                RoundedPointsArray[j][1] = roundingUpY
            }
        }
     }
     return RoundedPointsArray
}


const TransformintoProportion = (Points , proportion) => {
    //get an array of points and return the same array in the right proportion
    let TranformedPointsArray = []
    for(let point =0 ; point < Points.length ; point++){
        let TransformedPoint = [Points[point][0]/proportion , Points[point][1]/proportion]
        TranformedPointsArray.push(TransformedPoint)
    }
    return TranformedPointsArray
}

const FindRectPoints = (x,y,height,width) => {
    //this funtcion gets the topLeft corner of a rectangle his width and height and return his points
    let RectanglePoints = [[x,y+height] , [x,y] , [x+width, y] , [x+width,y+height]]
    return RectanglePoints
}

const RectangleHandler = (Rectangles) => {
    let OrderedRects = []
    for (let rect = 0 ;rect < Rectangles.length ; rect++){
        let RectPoints = FindRectPoints(Rectangles[rect].x ,Rectangles[rect].y , Rectangles[rect].height, Rectangles[rect].width)
        RectPoints = TransformintoProportion(RectPoints , 40)
        OrderedRects.push(RectPoints)
    }
    return OrderedRects
}

const PolygonHandler = (Polygons) => {
    let OrderedPolygons = []
    for(let polygon = 0 ; polygon < Polygons.length ; polygon++){
        let polygonPoints = Polygons[polygon]["points"]
        polygonPoints = roundingUp(polygonPoints)
        polygonPoints = TransformintoProportion(polygonPoints , 40)
        OrderedPolygons.push(polygonPoints)
    }
    return OrderedPolygons
}


const ProportionController = {
    TransformintoProportion,
    FindRectPoints,
    RectangleHandler,
    PolygonHandler
}

export default ProportionController