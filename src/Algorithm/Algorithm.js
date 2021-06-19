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
    if(index === Points.length){
        copyPoints.push(point)
    }
    return copyPoints
}

const checkBetterWasteDirection = (horizontalArray , verticalArray) => {
    let SumHorizontal = 0
    let SumVertical = 0
    for(let i = 0 ; i< horizontalArray.length ; i++){
        SumHorizontal += horizontalArray[i][0][1]
        SumVertical += verticalArray[i][0][1]
    }
    if(SumHorizontal <= SumVertical){
        return 'horizontal'
    }
    else{
        return 'vertical'
    }
}

const checkBetterAttachmentsDirection = (horizontalArray , verticalArray) => {
    console.log(horizontalArray , verticalArray , 'attacharrays')
    let numOfStripesHorizontal = 0
    let numOfStripesVertical = 0
    for(let i = 0 ; i< horizontalArray.length ; i++){
        numOfStripesHorizontal += (horizontalArray[i][0][0][0] + horizontalArray[i][0][0][1] + horizontalArray[i][0][0][2])
        numOfStripesVertical += (verticalArray[i][0][0][0] + verticalArray[i][0][0][1] + verticalArray[i][0][0][2])
    }
    if(numOfStripesHorizontal <= numOfStripesVertical){
        return 'horizontal'
    }
    else{
        return 'vertical'
    }
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

const calcPolygonArea = (vertices) => {
    //calculating the initial polygon area and the total waste
    var total = 0;

    for (var i = 0, l = vertices.length; i < l; i++) {
      var addX = vertices[i][0];
      var addY = vertices[i == vertices.length - 1 ? 0 : i + 1][1];
      var subX = vertices[i == vertices.length - 1 ? 0 : i + 1][0];
      var subY = vertices[i][1];

      total += (addX * addY * 0.5);
      total -= (subX * subY * 0.5);
    }
    console.log(vertices , Math.abs(total))
    return Math.abs(total);
}

const algorithm = (Shapes) => {
    let ResultArray = []
    let MinimumWasteResultArray = []
    let MinimumAttachmentsResultArray = []
    let MinimumWasteUpDown = []
    let MinimumWasteRightLeft = []
    for(let shape = 0 ; shape < Shapes.length ; shape++){
        MinimumWasteResultArray.push(algorithmForOneShape(Shapes[shape] , 'minimumWaste'))
    }
    ResultArray.push(MinimumWasteResultArray)
    for(let shape = 0 ; shape < Shapes.length ; shape++){
        MinimumAttachmentsResultArray.push(algorithmForOneShape(Shapes[shape] , 'minimumAttachments'))
    }
    ResultArray.push(MinimumAttachmentsResultArray)
    for(let shape = 0 ; shape < Shapes.length ; shape++){
        MinimumWasteUpDown.push(algorithmForOneShape(Shapes[shape] , 'sameDirection' , 'up'))
        MinimumWasteRightLeft.push(algorithmForOneShape(Shapes[shape] , 'sameDirection' , 'left'))
    }
    //checking which is better leftRight or Updown in terms of waste
    let direction = checkBetterWasteDirection(MinimumWasteRightLeft ,MinimumWasteUpDown)
    if(direction === 'horizontal'){
        ResultArray.push(MinimumWasteRightLeft)
    }
    else{
        ResultArray.push(MinimumWasteUpDown)
    }
    direction = checkBetterAttachmentsDirection(MinimumWasteRightLeft ,MinimumWasteUpDown)
    if(direction === 'horizontal'){
        ResultArray.push(MinimumWasteRightLeft)
    }
    else{
        ResultArray.push(MinimumWasteUpDown)
    }
    return ResultArray
}


const algorithmForOneShape = (Points , calcType , direction) => {
    let RectengularArray = []
    let ShapesArray = [Points]
    let SplitedArray = []
    let LongestPath = 0
    console.log(ShapesArray)
    while (ShapesArray.length > 0) {
        for(let Shape = 0 ; Shape < ShapesArray.length ; Shape++){
            // if the given shape is already 4 vertexes or less skip on the algorithm stages
            if(ShapesArray[Shape].length <= 4){
                RectengularArray.push(ShapesArray[Shape])
            }
            else{
                //gets the longest Path that is available between two vertexes
                LongestPath = GetLongestStraightLine(ShapesArray[Shape])
                console.log(LongestPath,'LongestPath')
                // insert the cross point of the longest line to the shape
                ShapesArray[Shape] = insertPointAtIndex(LongestPath[2] ,  ShapesArray[Shape] , LongestPath[3])
                console.log(ShapesArray[Shape],'ShapesArray')
                // split the shape into two shapes according to the longest line
                let Shapes
                if(indexOfPoint([LongestPath[0],LongestPath[1]] ,ShapesArray[Shape]) < indexOfPoint(LongestPath[2] ,ShapesArray[Shape])){
                    Shapes = ShapeSplitter([LongestPath[0],LongestPath[1]] ,LongestPath[2] , ShapesArray[Shape])
                }
                else{
                    Shapes = ShapeSplitter(LongestPath[2] ,[LongestPath[0],LongestPath[1]] , ShapesArray[Shape])
                }
                
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
        //the first cell will be count array of grass rolls 
        let MinimumWasteWidth = RectangleSplitter(Measures[0] , Measures[1])
        let MinimumWasteHeight = RectangleSplitter(Measures[1] , Measures[0])
        //decides if calculating according height or width
        if(calcType === 'minimumWaste'){
            if(MinimumWasteWidth[1] * Measures[0] < MinimumWasteHeight[1] * Measures[1])
            {
                // how long of each grass length
                MinimumWasteWidth.push(Measures[0])
                MinimumWasteArray.push(MinimumWasteWidth)
                console.log(Measures[0] , Rectangle , MinimumWasteWidth , 'width')
            }
            else{
                if(MinimumWasteWidth[1] * Measures[0] === MinimumWasteHeight[1] * Measures[1]){
                    if(Measures[1] <= Measures[0]){
                        MinimumWasteWidth.push(Measures[0])
                        MinimumWasteArray.push(MinimumWasteWidth)
                        console.log(Measures[0] , Rectangle , MinimumWasteWidth , 'width')
                    }
                    else
                    {
                        MinimumWasteHeight.push(Measures[1])
                        MinimumWasteArray.push(MinimumWasteHeight)
                        console.log(Measures[0] , Rectangle , MinimumWasteHeight , 'height')                
                    }
                }
                else{
                    // how long of each grass length
                    MinimumWasteHeight.push(Measures[1])
                    MinimumWasteArray.push(MinimumWasteHeight)
                    console.log(Measures[0] , Rectangle , MinimumWasteHeight , 'height')
                }
                
            }
        }
        if(calcType === 'minimumAttachments'){
            let numOfStripsWidth = MinimumWasteWidth[0][0] + MinimumWasteWidth[0][1] + MinimumWasteWidth[0][2]
            let numOfStripsHeight = MinimumWasteHeight[0][0] + MinimumWasteHeight[0][1] + MinimumWasteHeight[0][2]
            if(numOfStripsWidth <= numOfStripsHeight){
                MinimumWasteWidth.push(Measures[0])
                MinimumWasteArray.push(MinimumWasteWidth)
                console.log(Measures[0] , Rectangle , MinimumWasteWidth , 'widthAttachments')
            }
            else{
                MinimumWasteHeight.push(Measures[1])
                MinimumWasteArray.push(MinimumWasteHeight)
                console.log(Measures[0] , Rectangle , MinimumWasteHeight , 'heightAttachments')     
            }
        }
        if(calcType === 'sameDirection'){
            console.log(direction)
            if(direction === 'up'){
                console.log('calculating updown')
                MinimumWasteWidth.push(Measures[0])
                MinimumWasteArray.push(MinimumWasteWidth)
                console.log(Measures[0] , Rectangle , MinimumWasteWidth , 'width')
            }
            else{
                console.log('calculating leftrifght')
                MinimumWasteHeight.push(Measures[1])
                MinimumWasteArray.push(MinimumWasteHeight)
                console.log(Measures[0] , Rectangle , MinimumWasteHeight , 'height')  
            }
        }
        let initialPolygonArea = calcPolygonArea(RectengularArray[FinalShape])
        let RectangleArea = calcPolygonArea(Rectangle['geometry']['coordinates'][0])
        MinimumWasteArray[FinalShape][1] = (RectangleArea - initialPolygonArea) + (MinimumWasteArray[FinalShape][1] * MinimumWasteArray[FinalShape][2] )
        MinimumWasteArray[FinalShape].push(Rectangle['geometry']['coordinates'][0])
        MinimumWasteArray[FinalShape].push(RectengularArray[FinalShape])
      
    }
    return MinimumWasteArray
}

export default algorithm