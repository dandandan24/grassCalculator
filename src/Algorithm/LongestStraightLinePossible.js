import { PhonelinkRingSharp } from "@material-ui/icons"


const LineEquation = (x , y , x1 ,y1) => {
    // slope of straight line = y-y1 / x-x1
    let slope = (y-y1) / (x-x1)
    // equation of straight line = y= mx + b when b is constant
    let constant = slope *(x1* -1) + y1
    return [slope,constant]
}

const CheckSegmentsIntersect = (Startpoint,EndPoint , Line) => {
    // check if two segments of line intersects
   // console.log(Startpoint, EndPoint , Line , 'intersectdata')
    let constants = LineEquation(Startpoint[0], Startpoint[1] , EndPoint[0] , EndPoint[1])
    let CrossX, CrossY
    if(Math.abs(constants[0]) === Infinity && Math.abs(Line[0][0]) === Infinity ){
        if(Startpoint[0] === Line[1][0]){
            return false
        }
        else{
            return false
        }
    }
    if(constants[0] === Infinity || constants[0] === -Infinity){
        CrossY = Line[1][1]
        CrossX = Startpoint[0]
        if(Math.abs(Line[0][0]) === 0){
            if(Math.min(Line[1][0],Line[1][2]) < Startpoint[0] && Math.max(Line[1][0],Line[1][2]) > Startpoint[0] && (Line[1][1] < Math.max(Startpoint[1],EndPoint[1]) && Line[1][1] > Math.min(Startpoint[1],EndPoint[1]))){
                return true
            }
            return false
        }
    }
    else{
        if(Line[0][0] === Infinity || Line[0][0] === -Infinity){
            CrossY =  Startpoint[1]
            CrossX =  Line[1][0]          
        }
        else{
            CrossX = (constants[1] - Line[0][1]) / (Line[0][0] - constants[0])
            CrossY = constants[0]*CrossX + constants[1]
            CrossX = parseFloat(CrossX.toFixed(2))
            CrossY = parseFloat(CrossY.toFixed(2))
            let maxXLine = parseFloat(Math.max(Line[1][0] , Line[1][2]).toFixed(2))
            let maxYLine = parseFloat(Math.max(Line[1][1] , Line[1][3]).toFixed(2))
            let maxXNewLine = parseFloat(Math.max(Startpoint[0] , EndPoint[0]).toFixed(2))
            let maxYNewLine = parseFloat(Math.max(Startpoint[1] , EndPoint[1]).toFixed(2))
            let minXLine = parseFloat(Math.min(Line[1][0] , Line[1][2]).toFixed(2))
            let minYLine = parseFloat(Math.min(Line[1][1] , Line[1][3]).toFixed(2))
            let minXNewLine = parseFloat(Math.min(Startpoint[0] , EndPoint[0]).toFixed(2))
            let minYNewLine = parseFloat(Math.min(Startpoint[1] , EndPoint[1]).toFixed(2))
            if((CrossX <= maxXNewLine && CrossX < maxXLine) && (CrossX >= minXNewLine && CrossX >minXLine)){
                if((CrossY <= maxYNewLine && CrossY < maxYLine) && (CrossY >= minYNewLine && CrossY >minYLine)){
                    return true
                }
            }
            return false
        }
    }
    CrossX = parseFloat(CrossX.toFixed(2))
    CrossY = parseFloat(CrossY.toFixed(2))
    let maxXLine = parseFloat(Math.max(Line[1][0] , Line[1][2]).toFixed(2))
    let maxYLine = parseFloat(Math.max(Line[1][1] , Line[1][3]).toFixed(2))
    let maxXNewLine = parseFloat(Math.max(Startpoint[0] , EndPoint[0]).toFixed(2))
    let maxYNewLine = parseFloat(Math.max(Startpoint[1] , EndPoint[1]).toFixed(2))
    let minXLine = parseFloat(Math.min(Line[1][0] , Line[1][2]).toFixed(2))
    let minYLine = parseFloat(Math.min(Line[1][1] , Line[1][3]).toFixed(2))
    let minXNewLine = parseFloat(Math.min(Startpoint[0] , EndPoint[0]).toFixed(2))
    let minYNewLine = parseFloat(Math.min(Startpoint[1] , EndPoint[1]).toFixed(2))
    if((CrossX <= maxXNewLine && CrossX <= maxXLine) && (CrossX >= minXNewLine && CrossX >= minXLine)){
        if((CrossY <= maxYNewLine && CrossY <= maxYLine) && (CrossY >= minYNewLine && CrossY >= minYLine)){
            return true
        }
    }
    return false
   
}

const CheckIfLineInPoly = (Startpoint,EndPoint ,AllLines , AllPoints) => {
    // checks if certain line is inside a polygon or also going outside of it
    let intersectionsCounter = 0
    console.log(Startpoint,EndPoint ,AllLines, 'datayay')
    for(let line = 0 ; line < AllLines.length ; line++){
        if(CheckSegmentsIntersect(Startpoint, EndPoint , AllLines[line])){
            console.log('intersection')
            intersectionsCounter++
        }
    }
    if(intersectionsCounter >= 2){
        return false
    }
    if(!CheckIfPointInPolygon((Startpoint[0]+EndPoint[0])/2 ,(Startpoint[1]+EndPoint[1])/2  , AllPoints)){
        return false
    }
    console.log('in poly')
    return true
}

const CheckIfPointInPolygon = (x,y , BasePoints) => {
    //check if a specific point is inside or outside a polygon
    let point = BasePoints[0]
    let point2 = []
    let counter = 0
    for (let i=1;i<=BasePoints.length;i++) {
        point2 = BasePoints[i % BasePoints.length];
        if (y >  Math.min(point[1],point2[1])) {
          if (y <= Math.max(point[1],point2[1])) {
            if (x <= Math.max(point[0],point2[0])) {
              if (point[1] != point2[1]) {
                let xinters = (y-point[1])*(point2[0]-point[0])/(point2[1]-point[1])+point[0];
                if (point[0] == point2[0] || x <= xinters)
                  counter++;
              }
            }
          }
        }
        point = point2;
      }
    
    if (counter % 2 == 0){
    return(false);
    }
    else{
    return(true);
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

const CheckIfLineInShape = (x,y,x1,y1,BasePoints) => {
    //this function gets two points and checks if the line between them is inside or outside the shape
    let constants = LineEquation(x,y,x1,y1);
    let startX = Math.min(x,x1)
    let endX = Math.max(x,x1)
    if(Math.abs(x-x1) > Math.abs(y-y1)){
        for(let currentX = startX+1 ; currentX < endX ; currentX++){
            let currentY = constants[0]*currentX + constants[1]
            if(CheckIfPointInPolygon(currentX , currentY , BasePoints) === false){              
                return false
            }
            else{               
            }
        }
    }
    else{
        let startY = Math.min(y,y1)
        let endY = Math.max(y,y1)
        let CurrentX = 0
        for(let CurrentY = startY+1 ; startY < endY ; CurrentY++){
            if(x === x1){
                CurrentX = x
            }
            else{
                CurrentX = (CurrentY - constants[1])/constants[0]
            }        
            if(CheckIfPointInPolygon(CurrentX , CurrentY , BasePoints) === false){
                return false
            }
            else{
            }
        }
    }
    return true
}


const FilterNotPossibleDots = (index , Points) => {
    // filter the adjacent points and the point itself taking care of limit of array   
    let CopyPoints = [...Points]
    let rightAdjacent  = []
    let leftAdjacent = []
    let PointsToSplice = []
    if(index === 0){
         rightAdjacent = CopyPoints[1]
         leftAdjacent = CopyPoints[CopyPoints.length -1] 
    }
    else{
    if(index === CopyPoints.length-1){
         rightAdjacent = CopyPoints[0]
         leftAdjacent = CopyPoints[CopyPoints.length -2]
    }
    else{        
            rightAdjacent = CopyPoints[index-1]
            leftAdjacent = CopyPoints[index+1]      
    }
    }     
    let rightConstants = LineEquation(CopyPoints[index][0] , CopyPoints[index][1], rightAdjacent[0] , rightAdjacent[1]) 
    let leftConstants = LineEquation(CopyPoints[index][0] , CopyPoints[index][1], leftAdjacent[0] , leftAdjacent[1])
    for(let currentPoint = 0 ; currentPoint <  Points.length ; currentPoint++){ 
        if(Points[index][0] === rightAdjacent[0]){
            if(Points[currentPoint][0] === Points[index][0]){
                PointsToSplice.push(currentPoint)
            }
        }    
        else{
            if(Points[currentPoint][1] - ((rightConstants[0] *Points[currentPoint][0]) + rightConstants[1]) < 0.05 && Points[currentPoint][1] - ((rightConstants[0] *Points[currentPoint][0]) + rightConstants[1]) > -0.05){
                PointsToSplice.push(currentPoint)
            }      
        }
        if(Points[index][0] === leftAdjacent[0]){
            if(Points[currentPoint][0] === Points[index][0]){
                PointsToSplice.push(currentPoint)
            }
        }  
        else{  
            if(Points[currentPoint][1] - ((leftConstants[0] *Points[currentPoint][0]) + leftConstants[1]) < 0.05 && Points[currentPoint][1] - ((leftConstants[0] *Points[currentPoint][0]) + leftConstants[1]) > -0.05){
                PointsToSplice.push(currentPoint)
            }
        }
    }
    PointsToSplice = [...new Set(PointsToSplice)]
    for(let i = 0 ; i < PointsToSplice.length ; i++){
        CopyPoints.splice(PointsToSplice[i] - i , 1)
    }
    return CopyPoints
}


const LineLength = (x,y,constants , LinePoints , crossingPoint) => {
    if(constants[0] === Infinity || constants[0] === -Infinity ){     
        return Math.abs(x - LinePoints[0])
    }
    if(constants[0] === -0 || constants[0] === 0){
        return Math.abs(y-LinePoints[1])
    }
    return (Math.sqrt(Math.pow(x - crossingPoint[0] , 2) + Math.pow(y - crossingPoint[1] , 2)))
}


const getAllStraightEquations = (BasePoints) => {
    // gets all the straight Lines from the polygon
    let straightLines = []
    for(let point = 0 ; point < BasePoints.length-1 ; point++){
        let constants = LineEquation(BasePoints[point][0],BasePoints[point][1],BasePoints[point+1][0],BasePoints[point+1][1])
        if(constants[0] === Infinity || constants[0] === -Infinity) {
            straightLines = [...straightLines , [[Infinity ,BasePoints[point+1][0]] ,[BasePoints[point][0],BasePoints[point][1],BasePoints[point+1][0],BasePoints[point+1][1]] ]]
        }
        else{
            straightLines = [...straightLines , [LineEquation(BasePoints[point][0],BasePoints[point][1],BasePoints[point+1][0],BasePoints[point+1][1]) , [BasePoints[point][0],BasePoints[point][1],BasePoints[point+1][0],BasePoints[point+1][1]]]]
        }   
    }
    straightLines = [...straightLines , [LineEquation(BasePoints[BasePoints.length-1][0],BasePoints[BasePoints.length-1][1],BasePoints[0][0],BasePoints[0][1]), [BasePoints[BasePoints.length-1][0],BasePoints[BasePoints.length-1][1],BasePoints[0][0],BasePoints[0][1]]]]
    return straightLines
}


const getCrossPointBetweenTwoLines = (FirstConstants , SecondConstants , plumbPoint , LinePoints) => {
    let x  =0
    let y =0
    if(SecondConstants[0] === Infinity || SecondConstants[0] === -Infinity){
         x = LinePoints[0]
         y = plumbPoint[1]
         return [x,y]
    }
    else{
        if(SecondConstants[0] === 0 || SecondConstants[0] === -0){
            x = plumbPoint[0]
            y = LinePoints[1]
            return [x,y]
        }
    }
    x = (SecondConstants[1] - FirstConstants[1]) / (FirstConstants[0] - SecondConstants[0])
    y = FirstConstants[0]*x + FirstConstants[1]
    return [x,y]
}

const filterStraightLines = (Point, PolygonStraightEquations) => {
    // get point and filter only the possible lines in the shape
    let filteredLines = []
    let plumbConstants = []
    let crossPoint = []
    for(let line = 0 ; line < PolygonStraightEquations.length ; line++){
        //if the slope of the line is infinity than it means its from x= ? type than its plumb will be y = ? 
       
        if(PolygonStraightEquations[line][0][0] !== Infinity){
            if(PolygonStraightEquations[line][0][0] !== -0 || PolygonStraightEquations[line][0][0] !== 0){
                let slope = -(1/PolygonStraightEquations[line][0][0])
                plumbConstants = [slope, Point[1] - (slope* Point[0])]
            }
            // if the line is from kind y = ? than the plumb slope is infinity and his b doesnt exist because he is x= ? type
            else{
                 plumbConstants = [Infinity , NaN]
            }
            // if the line is x= ? then the x of cross point is constant and the y is one of the y's on the plumb line
            if(plumbConstants[0] === Infinity){
                crossPoint = [Point[0] , PolygonStraightEquations[line][1][1]]
            }
            // else if its regular line than calculate the point regulary
            else{
                crossPoint = getCrossPointBetweenTwoLines(plumbConstants ,PolygonStraightEquations[line][0] , Point ,PolygonStraightEquations[line][1] )
            }
            if(crossPoint[1] > Math.min(PolygonStraightEquations[line][1][1] ,PolygonStraightEquations[line][1][3]) && crossPoint[1] < Math.max(PolygonStraightEquations[line][1][1] ,PolygonStraightEquations[line][1][3])){
                if(crossPoint[0] > Math.min(PolygonStraightEquations[line][1][0] ,PolygonStraightEquations[line][1][2]) && crossPoint[0] < Math.max(PolygonStraightEquations[line][1][0] ,PolygonStraightEquations[line][1][2])){                
                    filteredLines.push(PolygonStraightEquations[line])
                }
            }
            if(plumbConstants[0] === Infinity){
                if(crossPoint[0] > Math.min(PolygonStraightEquations[line][1][0] ,PolygonStraightEquations[line][1][2]) && crossPoint[0] < Math.max(PolygonStraightEquations[line][1][0] ,PolygonStraightEquations[line][1][2])){                 
                    filteredLines.push(PolygonStraightEquations[line])
                }
            }
        }
        if(PolygonStraightEquations[line][0][0] === Infinity){
            if(Point[1] > Math.min(PolygonStraightEquations[line][1][1] ,PolygonStraightEquations[line][1][3]) && Point[1] < Math.max(PolygonStraightEquations[line][1][1] ,PolygonStraightEquations[line][1][3])){
           
                filteredLines.push(PolygonStraightEquations[line])
            }
        }
    }
    return filteredLines
}



const GetLongestStraightLine = (BasePoints) => {
    //this function get the ShapePoints from the DotsSpreading algorithm and return the longenst Line Possible in the Shape
    let filteredPoints = []
    let maxLength = 0
    let Points = []
    let PolygonStraightEquations = getAllStraightEquations(BasePoints)

    for(let point = 0 ; point < BasePoints.length ; point++)
    {
        let filteredStraightEquations = filterStraightLines(BasePoints[point] ,PolygonStraightEquations)
        for(let line = 0 ; line < filteredStraightEquations.length; line++){
            let slope =-1/filteredStraightEquations[line][0][0]
            let crossingPoint = getCrossPointBetweenTwoLines([slope ,BasePoints[point][1] - ((slope) * (BasePoints[point][0]))] , filteredStraightEquations[line][0] , BasePoints[point] ,filteredStraightEquations[line][1])
            if(CheckIfLineInPoly([BasePoints[point][0] ,BasePoints[point][1]] ,crossingPoint, PolygonStraightEquations , BasePoints)){
                if(LineLength(BasePoints[point][0] ,BasePoints[point][1],filteredStraightEquations[line][0] , filteredStraightEquations[line][1] , crossingPoint ) > maxLength){
                    maxLength = LineLength(BasePoints[point][0] ,BasePoints[point][1],filteredStraightEquations[line][0] ,  filteredStraightEquations[line][1] , crossingPoint) 
                    let constants = []
                    constants.push(slope)
                    let n = BasePoints[point][1] - ((slope) * (BasePoints[point][0]))
                    constants.push(n)
                    Points = [BasePoints[point][0] , BasePoints[point][1], getCrossPointBetweenTwoLines( constants , filteredStraightEquations[line][0] , BasePoints[point] ,filteredStraightEquations[line][1] ) , indexOfPoint([filteredStraightEquations[line][1][0], filteredStraightEquations[line][1][1]] ,BasePoints )+1]
                }     
            }         
        }
        
    }
    return Points
}

export default GetLongestStraightLine