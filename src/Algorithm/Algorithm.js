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
import Rectangle from "../Components/Konva/Rectangle";
import RectangleSplitter from './RectangleSplitter'
import RectangleMeasures from './RectangleMeasures'

const insertPointAtIndex = (point , Points , index) => {
    let copyPoints = []
    for(let i = 0 ; i< Points.length ; i++){
        if(i === index){
            copyPoints.push(point)
        }
        copyPoints.push(Points[i])
    }
    return copyPoints
}

const tryLongestPath = (Points) => {
    let RectengularArray = []
    let ShapesArray = [Points]
    let SplitedArray = []
    let LongestPath = 0
    while (ShapesArray.length > 0) {
        for(let Shape = 0 ; Shape < ShapesArray.length ; Shape++){
            //gets the longest Path that is available between two vertexes
            LongestPath = GetLongestStraightLine(ShapesArray[Shape])
            // insert the cross point of the longest line to the shape
            ShapesArray[Shape] = insertPointAtIndex(LongestPath[2] ,  ShapesArray[Shape] , LongestPath[3])
            // split the shape into two shapes according to the longest line
            let Shapes = ShapeSplitter([LongestPath[0],LongestPath[1]] ,LongestPath[2] , ShapesArray[Shape])
            console.log(Shapes,'SplittedShapes')
            //if one of the splitted shapes is below 4 point than push it to the rectengular shapes array else send it to another round
            if(Shapes[0].length <= 4){
                RectengularArray.push(Shapes[0])
            }
            else{
                SplitedArray.push(Shapes[0])
            }
            if(Shapes[1].length <= 4){
                RectengularArray.push(Shapes[1])
            }
            else{
                SplitedArray.push(Shapes[1])
            }
        }
        ShapesArray = [...SplitedArray]
        SplitedArray = []
    }

    //will include all the minimum waste Layouts
    let MinimumWasteArray = []
    for(let FinalShape = 0 ;FinalShape < RectengularArray.length ; FinalShape++){
        //getting the surrounding rectangle
        let Rectangle = smallestSurroundingRectangleByarea(RectengularArray[FinalShape])
        //calculate from the rectangle points the height and width
        let Measures = RectangleMeasures(Rectangle['geometry']['coordinates'][0])
        //the first cell will be count array of grass rolls ** need to add the functionality to check if height or width is better
        let MinimumWaste = RectangleSplitter(Measures[1] , Measures[0])
        MinimumWasteArray.push(MinimumWaste)
        console.log(Measures[0] , Rectangle , MinimumWaste)

    }
    return MinimumWasteArray
}

export default tryLongestPath