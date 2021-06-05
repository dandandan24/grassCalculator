import ShapePoints from "../Algorithm/DotsSpreading"
import GetLongestLine from "./LongestLinePossible"
import ShapeSplitter from './ShapeSplitter'
import {
    smallestSurroundingRectangleByWidth,
    smallestSurroundingRectangleByArea,
  } from "geojson-minimum-bounding-rectangle";
import * as turf from 'turf/turf'
import smallestSurroundingRectangleByarea from './SmallestRectangle'
import GetLongestStraightLine from './LongestStraightLinePossible'


const insertPointAtIndex = (point , Points , index) => {
    let copyPoints = []
    for(let i = 0 ; i< Points.length ; i++){
        if(i === index){
            copyPoints.push(point)
        }
        copyPoints.push(Points[i])
    }
    console.log(copyPoints , 'inserted point')
    return copyPoints
}

const tryLongestPath = (Points) => {
    // console.log(Points , 'Points')
    // let SpreadedPoints = ShapePoints(Points);
    // console.log(SpreadedPoints)
     let LongestPath = GetLongestStraightLine(Points)
     console.log(LongestPath , 'longest')
     Points = insertPointAtIndex(LongestPath[2] , Points , LongestPath[3])
     let Shapes = ShapeSplitter([LongestPath[0],LongestPath[1]] ,LongestPath[2] , Points)
     console.log(Shapes)
     LongestPath = GetLongestStraightLine(Shapes[0])
     console.log(LongestPath, "LongestPath2")
     console.log(Shapes[0] , "points")
     Points = insertPointAtIndex(LongestPath[2] , Shapes[0] , LongestPath[3])
     console.log(Points , 'inserted')
     Shapes = ShapeSplitter([LongestPath[0],LongestPath[1]] ,LongestPath[2] , Points)
     console.log(Shapes)
    // //need to add here a function that checks if the shapes need to go to another round or not :) 
  
    // smallestSurroundingRectangleByarea(SpreadedPoints)
    return Shapes
}

export default tryLongestPath