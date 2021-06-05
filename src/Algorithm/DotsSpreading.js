import { Shape } from "react-konva"



const LineEquation = (x , y , x1 ,y1) => {
    // slope of straight line = y-y1 / x-x1
    if(x-x1 === 0){
        return [-999, -999]
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
        for(let currentX = firstX ; currentX > lastX ; currentX--){
            let currentY = slope*currentX + constant
            PointsArray = [...PointsArray , [currentX , currentY]]
        }
    }
    else {
        for(let currentX = firstX ; currentX < lastX ; currentX++){
            let currentY = slope*currentX + constant
            PointsArray = [...PointsArray , [currentX , currentY]]
        }
    }
    return PointsArray
}

const InfinitySlopePointGenerator = (y , y1 , x) => {
    let LinePoints = []
    let startY = Math.min(y,y1)
    let endY = Math.max(y,y1)
    let PointsArray = []
    if(y > y1){
        for(let i = y ; i > y1 ; i--){
            LinePoints = [...LinePoints , [x,i]]
        }
    }
    else {
        for(let i = y ; i < y1 ; i++){
            LinePoints = [...LinePoints , [x,i]]
        }
    }
    
    return LinePoints
}

const ShapePoints = (Points) => {
    let ShapePoints = []
    let LinePoints = []
    //going over all of the shape points and return all the points of the shape in gaps of 1
    for(let point = 0 ; point < Points.length-1 ; point++){
        let constants = LineEquation(Points[point][0] ,Points[point][1] ,Points[point+1][0] ,Points[point+1][1]);
        // code for infinity slope 
        if(constants[0] === -999){
            LinePoints = InfinitySlopePointGenerator(Points[point][1] , Points[point+1][1] ,Points[point][1])
            console.log(LinePoints, 'infinitySlope')
        }
        else{
            console.log(constants , point , constants)
            LinePoints = PointsGenerator(Points[point][0] , Points[point+1][0] , constants[0], constants[1])
        }
       
        ShapePoints = [...ShapePoints , ...LinePoints]
    }
    let Constants = LineEquation(Points[Points.length - 1][0] ,Points[Points.length - 1][1] ,Points[0][0] ,Points[0][1]);
    let linePoints = PointsGenerator(Points[Points.length - 1][0] , Points[0][0] , Constants[0], Constants[1])
    console.log(linePoints, 'adsad')
    ShapePoints = [...ShapePoints , ...linePoints]
    console.log(ShapePoints)
    return ShapePoints
}

export default ShapePoints