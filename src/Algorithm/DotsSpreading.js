import { Shape } from "react-konva"



const LineEquation = (x , y , x1 ,y1) => {
    // slope of straight line = y-y1 / x-x1
    let slope = (y-y1) / (x-x1)
    // equation of straight line = y= mx + b when b is constant
    let constant = slope *(x1* -1) + y1
    return [slope,constant]
}


const PointsGenerator = (minX , maxX, slope , constant) => {
    //this function gets a range of X's between two points , and return an array of points with gap of 1
    let PointsArray = []
    for(let currentX = minX ; currentX < maxX ; currentX++){
        let currentY = slope*currentX + constant
        PointsArray = [...PointsArray , [currentX , currentY]]
    }
    return PointsArray
}


const ShapePoints = (Points) => {
    let ShapePoints = []
    //going over all of the shape points and return all the points of the shape in gaps of 1
    for(let point = 0 ; point < Points.length-1 ; point++){
        let constants = LineEquation(Points[point][0] ,Points[point][1] ,Points[point+1][0] ,Points[point+1][1]);
        let minX = Points[point][0] > Points[point+1][0] ? Points[point+1][0] : Points[point][0]
        let maxX = Points[point][0] > Points[point+1][0] ? Points[point][0] : Points[point+1][0]
        console.log(minX,maxX ,'minMax')
        let LinePoints = PointsGenerator(minX , maxX , constants[0], constants[1])
        console.log(LinePoints)
        ShapePoints = [...ShapePoints , ...LinePoints]
    }
    console.log(ShapePoints)
    return ShapePoints
}

export default ShapePoints