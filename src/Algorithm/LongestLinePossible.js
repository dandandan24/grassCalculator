import { PhonelinkRingSharp } from "@material-ui/icons"


const LineEquation = (x , y , x1 ,y1) => {
    // slope of straight line = y-y1 / x-x1
    let slope = (y-y1) / (x-x1)
    // equation of straight line = y= mx + b when b is constant
    let constant = slope *(x1* -1) + y1
    return [slope,constant]
}


const CheckIfPointInPolygon = (x,y , BasePoints) => {
    //check if a specific point is inside or outside a polygon
    let point = BasePoints[0]
    let point2 = []
    let counter = 0
    for (let i=1;i<=BasePoints.length;i++) {
        point2 = BasePoints[i % BasePoints.length];
        if (y > Math.min(point[1],point2[1])) {
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

const CheckIfLineInShape = (x,y,x1,y1,BasePoints) => {
    //this function gets two points and checks if the line between them is inside or outside the shape
    let constants = LineEquation(x,y,x1,y1);
    let startX = Math.min(x,x1)
    let endX = Math.max(x,x1)
    if(Math.abs(x-x1) > Math.abs(y-y1)){
        for(let currentX = startX+1 ; currentX < endX ; currentX++){
            let currentY = constants[0]*currentX + constants[1]
            if(CheckIfPointInPolygon(currentX , currentY , BasePoints) === false){
                //console.log(currentX,currentY , x,y,x1,y1 ,'Outside shape')
                return false
            }
            else{
                //console.log(currentX,currentY , x,y,x1,y1 ,'inside shape')
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
                //console.log(CurrentX,CurrentY , x,y,x1,y1 ,'Outside shape')
                return false
            }
            else{
                //console.log(CurrentX,CurrentY , x,y,x1,y1 ,'inside shape')
            }
        }
    }
    //console.log(x,y,x1,y1 ,'inside')
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


const LineLength = (x,y,x1,y1) => {
    //return the line length
    console.log(Math.sqrt(Math.pow((x-x1),2) + Math.pow((y-y1),2)))
    return(Math.sqrt(Math.pow((x-x1),2) + Math.pow((y-y1),2)))
}


const GetLongestLine = (ShapePoints) => {
    //this function get the ShapePoints from the DotsSpreading algorithm and return the longenst Line Possible in the Shape
    let filteredPoints = []
    let maxLength = 0
    let Points = []
    for(let point = 0 ; point < ShapePoints.length ; point++)
    {
        // filter the not possible matches
        filteredPoints = FilterNotPossibleDots(point,ShapePoints)
        // running on all the possible matches and measuring length for each line the is in the shape and return the maximum points the create the maximum length
        for(let match = 0 ; match < filteredPoints.length ; match++){
            if(CheckIfLineInShape(ShapePoints[point][0],ShapePoints[point][1],filteredPoints[match][0],filteredPoints[match][1] , ShapePoints)){
                if(LineLength(ShapePoints[point][0],ShapePoints[point][1],filteredPoints[match][0],filteredPoints[match][1]) > maxLength){
                    maxLength = LineLength(ShapePoints[point][0],ShapePoints[point][1],filteredPoints[match][0],filteredPoints[match][1]) 
                    Points = [[ShapePoints[point][0],ShapePoints[point][1]],[filteredPoints[match][0],filteredPoints[match][1]]]
                }
            }
        }
    }
    return Points
}

export default GetLongestLine