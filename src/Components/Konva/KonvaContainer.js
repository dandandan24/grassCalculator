import React , {useEffect, useState} from 'react'
import {Stage , Layer , Line , Rect , Text , Circle} from 'react-konva'
import DrawToolBar from './DrawToolBar'
import Grid from '@material-ui/core/Grid'
import { connect , dispatch } from "react-redux"
import Rectangle from './Rectangle'
import TransLine from './copiedPolygon'
import Polygon from './Polygon'
import { ContactlessOutlined, ContactSupport } from '@material-ui/icons'
import Circular from './Circle'
import {Shape} from 'react-konva'

const KonvaContainer = (props) => {
    let stage = null 
    const [Outerdiv , setOuterdiv] = useState(document.getElementById('parent'))
    const [currentLine, setCurrentLine] = useState(null);
    const [currentRect , setCurrentRect] = useState(null)
    const [color, setColor] = useState("black");
    const [lines, setLines] = useState([]);
    const [Rects , setRects] = useState([]);
    const [selectedId, selectShape] = useState(null);
    const [points , setpoints] = useState([])
    const [anchorPoints , setAnchorPoints] = useState([])
    const [curMousePos , setcurMousePos] = useState([0,0])
    const [isMouseOverStartPoint ,setisMouseOverStartPoint] = useState(false)
    const [isFinished , setisFinished] = useState(false)
    const [Polygons , setPolygons] = useState([])
    const [DraggedPolygon,setDraggedPolygon] = useState(0)
    const [DraggedPoint,setDraggedPoint] = useState(null)
    const [currentCircle , setCurrentCircle]= useState(null)
    const [circles , setCircles] = useState([])
    const [selectedcircleId , setSelectedcircleId] = useState(null)
    const [startPoint , setStartPoint] = useState([30,60])
    const [endPoint , setEndPoint] = useState([60,120])
    const [curvePoint , setCurvePoint] = useState([45,90])
    const [anchorCircles , setAnchorCircles] = useState([{x : startPoint[0] , y : startPoint[1] , radius : 5 , id  : 1 , stroke : 'black' , fill : 'grey'},{x : curvePoint[0] , y : curvePoint[1] , radius : 5 , id:3, stroke : 'black' , fill : 'grey'},{x : endPoint[0] , y : endPoint[1] , radius : 5 , id : 2, stroke : 'black' , fill : 'grey'}])
    const [DraggedAnchor ,setDraggedAnchor] = useState(0)
    const proportion = 20

    useEffect(() => {
        setOuterdiv(document.getElementById('parent'))
    }, [])  

    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
          selectShape(null);
          setSelectedcircleId(null);
        }
    };
    
    const getMousePos = () => {     
        if(props.stage)  {
            return [props.stage.getPointerPosition().x, props.stage.getPointerPosition().y];
        }
       return 0
    }



    const checkIfTouchPoly = (point) => {
        for(let i = 0 ; i< Polygons.length ; i++){          
            for(let j = 0 ; j < Polygons[i]['flattenedPoints'].length-1 ; j+=2){
                if(-10 <= point[0] - Polygons[i]['flattenedPoints'][j] &&point[0] - Polygons[i]['flattenedPoints'][j] <= 10&&-10 <= point[1] - Polygons[i]['flattenedPoints'][j+1]&&point[1] - Polygons[i]['flattenedPoints'][j+1] <= 10){
                    return true
                }
                if(point[0] === Polygons[i]['flattenedPoints'][Polygons[i]['flattenedPoints'].length-1][0] && point[1] === Polygons[i]['flattenedPoints'][Polygons[i]['flattenedPoints'].length-1][1])
                {
                    return true
                }
            }
            for(let j = 0 ; j < Polygons[i]['anchorPoints'].length ; j+=1){
                if(-10 <= point[0] - Polygons[i]['anchorPoints'][j][0] &&point[0] - Polygons[i]['anchorPoints'][j][0] <= 10&&-10 <= point[1] - Polygons[i]['anchorPoints'][j][1]&&point[1] - Polygons[i]['anchorPoints'][j][1] <= 10){
                    return true
                }
                if(point[0] === Polygons[i]['anchorPoints'][Polygons[i]['anchorPoints'].length-1][0] && point[1] === Polygons[i]['anchorPoints'][Polygons[i]['anchorPoints'].length-1][1])
                {
                    return true
                }
            }
        }
        
        return false
    }

    const onMouseDown = (e) => {
        checkDeselect(e)
        const {x, y} = stage.getPointerPosition();
        if(props.mode === 'Line'){
            setCurrentLine({ x0: x , y0:y , color});
        }
        if(props.mode === 'Polygon'){
            const stage = props.stage;
            const mousePos = getMousePos(stage);
            if(checkIfTouchPoly(mousePos)){
                console.log('touching other poly')
            }
            else
            {
                if (isFinished) {
                return;
                }
                if (isMouseOverStartPoint && points.length >= 3) {
                    setisFinished(true)
                    let anchorpoints = []
                    flattenedPoints.map((point,index) => {
                        if(index % 2 === 0 && index < flattenedPoints.length - 3){
                            anchorpoints = [...anchorpoints , [(flattenedPoints[index] + flattenedPoints[index+2])/2 ,(flattenedPoints[index + 1] + flattenedPoints[index+3])/2 , false]]
                        }
                    })
                    setPolygons([...Polygons , {flattenedPoints : [...flattenedPoints] , points : [...points],anchorPoints : [...anchorpoints] ,closed : true }])
                    //updating in the store for future usage
                    props.UpdatePolygons([...Polygons , {flattenedPoints : [...flattenedPoints] , points : [...points],anchorPoints : [...anchorpoints] ,closed : true }])
                    setpoints([])
                    setcurMousePos([0,0])
                    setisFinished(false)
                    setisMouseOverStartPoint(false)
                    console.log(anchorpoints)
                } else {  
                    setpoints([...points , mousePos])
                }
        }
        }
        if(props.mode === 'Rect'){
            setCurrentRect({x : x , y : y})
        }
        if(props.mode === 'Circle'){
            setCurrentCircle({x : x , y : y})
        }
      
    }

    const onMouseMove = () => {
       
        const {x, y} = stage.getPointerPosition();
        const mousePos = getMousePos();
        setcurMousePos(mousePos)
        if(props.mode === 'Line')
        {
            if (currentLine) {
            switch (props.mode) {
                case "Line":
                const x0 = currentLine.x0;
                const y0 = currentLine.y0;
                setCurrentLine({
                    ...currentLine,
                    x0 : x0,
                    y0 : y0, 
                    x : x,
                    y : y
                });
                break;
                default:
            }
            }
        }
        if(props.mode === 'Rect'){
            if(currentRect) {
                const x0 = currentRect.x
                const y0 = currentRect.y
                setCurrentRect({
                    ...currentRect ,
                  
                    width : x>x0 ? x - x0 : -(x0-x),
                    height : y>y0 ? y - y0 : -(y0-y)
                })
            }
        }

        if(props.mode === 'Circle') {
            if(currentCircle){
                const x0 = currentCircle.x
                const y0 = currentCircle.y
                setCurrentCircle({
                    ...currentCircle ,        
                    radius : PitagorasSentence(x,y,x0,y0),           
                })
            }
        }
    };
    const onMouseUp = () => {
        const {x, y} = stage.getPointerPosition();
       
        if(props.mode === 'Line')
        {
           
            setLines([
            ...lines,
            {color : currentLine.color ,points : [currentLine.x0 ,currentLine.y0 ,currentLine.x ,currentLine.y],id : 'Line'+lines.length.toString() ,stroke  : 'black' , strokeWidth : 2}
            ]);
            setCurrentLine(null);
        }
        if(props.mode === 'Rect'){
            
            const x0 = currentRect.x
            const y0 = currentRect.y   
            if(Math.abs(x0-x) < 10 && Math.abs(y0-y) < 10){

            } 
            else{
            setRects([
                ...Rects,
                {...currentRect ,x: x>x0 ? x0 : x, y : y>y0 ? y0 : y, width : x>x0 ? x - x0 : x0-x,height : y>y0 ? y - y0 : y0-y , id : 'Rect'+Rects.length.toString() , stroke  : 'black',xDirection : x>x0 ? 'right' : 'left' ,yDirection : y>y0 ? 'up' : 'down'  , strokeWidth : 2}                    
            ])
            props.UpdateRectangles([
                ...Rects,
                {...currentRect ,x: x>x0 ? x0 : x, y : y>y0 ? y0 : y, width : x>x0 ? x - x0 : x0-x,height : y>y0 ? y - y0 : y0-y , id : 'Rect'+Rects.length.toString() , stroke  : 'black',xDirection : x>x0 ? 'right' : 'left' ,yDirection : y>y0 ? 'up' : 'down'  , strokeWidth : 2}                    
            ])
            }
            setCurrentRect(null)
        
        }
        if(props.mode === 'Circle'){
            const x0 = currentCircle.x
            const y0 = currentCircle.y   
            if(Math.abs(x0-x) < 10 && Math.abs(y0-y) < 10){

            } 
            else{ 
            setCircles([
                ...circles,
                {...currentCircle ,radius :PitagorasSentence(x,y,x0,y0)*2,width : PitagorasSentence(x,y,x0,y0)*2,height : PitagorasSentence(x,y,x0,y0)*2, id : 'Circle'+circles.length.toString() , stroke  : 'black',strokeWidth : 2}                    
            ])
            props.UpdateCircles([
                ...circles,
                {...currentCircle ,radius :PitagorasSentence(x,y,x0,y0)*2,width : PitagorasSentence(x,y,x0,y0)*2,height : PitagorasSentence(x,y,x0,y0)*2, id : 'Circle'+circles.length.toString() , stroke  : 'black',strokeWidth : 2}                    
            ])
            }
            setCurrentCircle(null)
        }
        
      };




    const setStageRef = ref => {
        if (ref) {
            stage = ref;
            props.ChangeStage(ref)
        }
    }; 

    const handleMouseOverStartPoint = event => {
        if (isFinished || points.length < 3) return;
        event.target.scale({ x: 2, y: 2 });
        setisMouseOverStartPoint(true)
    };

    const handleMouseOutStartPoint = event => {
        event.target.scale({ x: 1, y: 1 });
        setisMouseOverStartPoint(false)
      };

    const handleDragStartPoint = event => {

        const pos = [event.target.attrs.x, event.target.attrs.y];
        for(let polygon = 0 ; polygon < Polygons.length ; polygon++){
            for(let point = 0 ; point < Polygons[polygon]['points'].length ; point++){
                if(-3 <= pos[0] - Polygons[polygon]['points'][point][0]  && pos[0] - Polygons[polygon]['points'][point][0] <= 3 && -3 <= pos[1] - Polygons[polygon]['points'][point][1] &&pos[1] - Polygons[polygon]['points'][point][1]  <= 3 ){
                    setDraggedPolygon(polygon)
                    setDraggedPoint(point)
                    console.log('draggingpoint')
                }
            }
            for(let anchor = 0 ; anchor < Polygons[polygon]['anchorPoints'].length ; anchor++){
                if(-3 <= pos[0] - Polygons[polygon]['anchorPoints'][anchor][0]  && pos[0] - Polygons[polygon]['anchorPoints'][anchor][0] <= 3 && -3 <= pos[1] - Polygons[polygon]['anchorPoints'][anchor][1] &&pos[1] - Polygons[polygon]['anchorPoints'][anchor][1]  <= 3 ){
                    setDraggedPolygon(polygon)
                    setDraggedAnchor(anchor)
                    console.log('draggingAnchor')
                }
            }

        }

      
    };

    const handleDragMovePoint = event => {
        if(DraggedPoint !== null) {
            const pos = [event.target.attrs.x, event.target.attrs.y];
            let flattenddots = Polygons[DraggedPolygon]['flattenedPoints'];
            let dots = Polygons[DraggedPolygon]['points']
            const index = event.target.index - 1;
            dots[DraggedPoint] = pos
            flattenddots[DraggedPoint*2] = pos[0]
            flattenddots[(DraggedPoint*2)+1] = pos[1]
            if(DraggedPoint === 0){
                flattenddots[Polygons[DraggedPolygon]['flattenedPoints'].length - 2] = pos[0]
                flattenddots[Polygons[DraggedPolygon]['flattenedPoints'].length - 1] = pos[1]
            }
            let anchorDots = [];
            console.log(Polygons[DraggedPolygon]['anchorPoints'] , 'at start')
            flattenddots.map((point,index) => {
                if(index % 2 === 0 && index < flattenddots.length - 3 ){
                    console.log(index)
                    console.log(Polygons[DraggedPolygon]['anchorPoints'])
                    console.log(flattenddots)
                    if(Polygons[DraggedPolygon]['anchorPoints'][index/2][2] ===false){                             
                        anchorDots = [...anchorDots , [(flattenddots[index] + flattenddots[index+2])/2 ,(flattenddots[index + 1] + flattenddots[index+3])/2 , false]]
                    }
                    if( Polygons[DraggedPolygon]['anchorPoints'][index/2][2] ===true){
                        anchorDots = [...anchorDots , [...Polygons[DraggedPolygon]['anchorPoints'][index/2] , true]]
                }

                }
            })
            let CopyPolygons = [...Polygons]
            CopyPolygons[DraggedPolygon]['flattenedPoints'] = flattenddots
            CopyPolygons[DraggedPolygon]['points'] = dots
            CopyPolygons[DraggedPolygon]['anchorPoints'] = anchorDots
            setPolygons(CopyPolygons)
            props.UpdatePolygons(CopyPolygons)
        }
        else{
            const pos = [event.target.attrs.x, event.target.attrs.y , true];
            let anchorDots  = Polygons[DraggedPolygon]['anchorPoints'];
            anchorDots[DraggedAnchor] = pos
            let CopyPolygons = [...Polygons]
            CopyPolygons[DraggedPolygon]['anchorPoints'] = anchorDots
            setPolygons(CopyPolygons)
            props.UpdatePolygons(CopyPolygons)
        }
        
      };

    const handleDragOutPoint = event => {

    };

    const handleDragEndPoint = () => {
       setDraggedPoint(null)
       setDraggedAnchor(null)
    }

    const flattenedPoints = points
        .concat(isFinished ? [] : curMousePos)
        .reduce((a, b) => a.concat(b), []);
 

    const PitagorasSentence = (x , y ,x1, y1) => {
        return(Math.sqrt(Math.pow(Math.abs(y1-y) , 2) + Math.pow(Math.abs(x1-x) , 2)))
    }

    const Squarelines = [0,1,2,3,4,5,6,7,8,9,10]
 
    return(    
        <Grid container>
            <Grid item xs = {12}>
            <Stage ref={setStageRef}
                width = {Outerdiv ? Outerdiv.offsetWidth : 0}
                height = {Outerdiv ? Outerdiv.offsetHeight : 0}
                onMouseDown = {onMouseDown}
                onMouseMove = {onMouseMove}
                onMouseUp = {onMouseUp}
               > 
                        <Layer>
                            {Outerdiv ?
                            Squarelines.map(number => {
                                return(
                                    <React.Fragment>
                                        <Line points = {[0,(Outerdiv.offsetHeight/10)*number+2,Outerdiv.offsetWidth ,(Outerdiv.offsetHeight/10)*number]}  strokeWidth={2}  stroke= 'lightgrey'/>  
                                        <Line points = {[(Outerdiv.offsetWidth/10)*number,0,(Outerdiv.offsetWidth/10)*number ,Outerdiv.offsetHeight]}  strokeWidth={2}  stroke= 'lightgrey'/>                                
                                    </React.Fragment>                              
                                )
                            }) : <></>}
                        </Layer>
                        <Layer>
                       
                            <Line                                                        
                                id = {currentLine ? currentLine.id : 0}
                                points = {currentLine ? [currentLine.x0 ,currentLine.y0 , currentLine.x , currentLine.y ] : []}                   
                                strokeWidth={2}
                                stroke= 'black'                            
                                />                           

                                {lines.map((line, index) => (
                                    <Line
                                    {...line}               
                                    strokeWidth={2}
                                    stroke= 'black'               
                                    />
                                ))}
                                <Rect
                                    {...currentRect}
                                    strokeWidth={2}
                                    stroke= 'black'
                                />
                                {currentRect ?           
                                <Text text = {Math.floor(Math.abs(currentRect.width/2))/proportion} x = {currentRect.xDirection = 'right' ? currentRect.x + (currentRect.width / 2) : (currentRect.x - (currentRect.width / 2))} y={currentRect.y} fontSize = {20} /> 
                                :
                                <></> }
                                {currentRect ?           
                                <Text text = {Math.floor(Math.abs(currentRect.height/2))/proportion} x = {currentRect.x} y={currentRect.xDirection = 'up' ? currentRect.y + (currentRect.height / 2) : (currentRect.y - (currentRect.height / 2))} fontSize = {20} /> 
                                :
                                <></> }
                                {Rects.map((rect, index) => (
                                    <Rectangle
                                    shapeProps = {rect}       
                                    key = {index}               
                                    isSelected={rect.id === selectedId}
                                    onSelect={() => {
                                      props.ChangeMode(null)
                                      selectShape(rect.id);               
                                    }}
                                    onChange={(newAttrs) => {
                                      const rects = Rects.slice();
                                      rects[index] = newAttrs;
                                      setRects(rects);
                                      props.UpdateRectangles(rects)
                                      console.log(rects)
                                    }}
                                    />
                                ))}     

                                {Rects.map((rect, index) => (                                          
                                        <Text text = {Math.floor(Math.abs(rect.width/2))/proportion} x = {rect.xDirection = 'right' ? rect.x + (rect.width / 2) : (rect.x - (rect.width / 2))} y={rect.y} fontSize = {20} />
                                    
                                ))}  
                                {Rects.map((rect, index) => (                                                              
                                        <Text text = {Math.floor(Math.abs(rect.height/2))/proportion} x = {rect.x} y={rect.xDirection = 'up' ? rect.y + (rect.height / 2) : (rect.y - (rect.height / 2))} fontSize = {20} />                     
                                ))}       
                       
                             

                                 <Circle
                                 {...currentCircle}
                                 strokeWidth={2}
                                stroke= 'black'/>
                                {currentCircle ?
                                <Text text= {Math.floor(currentCircle.radius)/proportion} x = {currentCircle.x} y = {currentCircle.y} fontSize = {currentCircle.radius < 20 ? 15 : 20}/>:
                                <></>}
                                
                                {circles.map((circle , index) => {
                                    return(
                                       <Circular 
                                       shapeProps = {circle}
                                       key = {index}
                                       isSelected= {circle.id === selectedcircleId}
                                       onSelect={() => {
                                           props.ChangeMode(null)   
                                           setSelectedcircleId(circle.id)   
                                           selectShape(null)      
                                         }}
                                         onChange={(newAttrs) => {
                                            const Circles = circles.slice();
                                            Circles[index] = newAttrs;
                                            setCircles(Circles);   
                                            props.UpdateCircles(Circles)                                                                                  
                                         }}
                                       />)
                                       
                                })}


                                {circles.map((circle , index) => {
                                    return(
                                     <Text text= {Math.floor(circle.radius)/proportion/2} x = {circle.x} y = {circle.y} fontSize = {circle.radius < 20 ? 15 : 20}/>
                                    )
                                })}
                                


                        
                            <Line
                                points={flattenedPoints}
                                stroke="black"
                                strokeWidth={2}
                                closed={isFinished}
                            />
                            {points.map((point, index) => {
                                const width = 6;
                                const x = point[0] - width / 2;
                                const y = point[1] - width / 2;
                                const startPointAttr =
                                index === 0
                                    ? {
                                        hitStrokeWidth: 12,
                                        onMouseOver: handleMouseOverStartPoint,
                                        onMouseOut: handleMouseOutStartPoint
                                    }
                                    : null;
                                return (
                                <Rect
                                    key={index}
                                    x={x}
                                    y={y}
                                    width={width}
                                    height={width}
                                    fill="white"
                                    stroke="black"
                                    strokeWidth={3}
                                    onDragStart={handleDragStartPoint}
                                    onDragMove={handleDragMovePoint}
                                    onDragEnd={handleDragEndPoint}
                                    draggable
                                    {...startPointAttr}
                                />
                                );
                                })}
                               
                                {flattenedPoints.map((point, index) => {    
                                let x = -500
                                let y = -500
                                let x1 = flattenedPoints[index+2]
                                let y1 = flattenedPoints[index+3]
                                if(index % 2 === 0 && index +3 < flattenedPoints.length){                                  
                                     x = (point + flattenedPoints[index+2]) / 2;
                                     y = (flattenedPoints[index+1] + flattenedPoints[index+3]) / 2;  
                                }                                 
                                return (
                                    index % 2 === 0 ?
                                    <Text text={Math.floor(PitagorasSentence(x,y,x1,y1)) / proportion} x={x} y={y} fontSize={20} /> : 
                                    <></>
                                );
                                })}
                            

                            {Polygons.map((poly , index) =>{       
                             return(     
                                 <>                
                                  {/* <Line
                                  points={poly.flattenedPoints}
                                  stroke="black"
                                  strokeWidth={2}
                                  closed={poly.closed}
                              /> */}
                                {poly.anchorPoints.map((point, index) => {  
                                    return(
                                    <>
                                      <Shape
                                      sceneFunc={(context, shape) => {
                                         context.beginPath();
                                         if(poly.points[index] && poly.points[index+1]){
                                         context.moveTo(poly.points[index][0] , poly.points[index][1]);
                                         context.quadraticCurveTo(point[0] , point[1],poly.points[index+1][0] ,poly.points[index+1][1]);
                                         }
                                         else{
                                             if(index === poly.points.length-1){
                                                context.moveTo(poly.points[index][0] , poly.points[index][1]);
                                                context.quadraticCurveTo(point[0] , point[1],poly.points[0][0] ,poly.points[0][1]);
                                             }
                                         }
                                         // (!) Konva specific method, it is very important
                                         context.fillStrokeShape(shape);
                                         }}
                                         stroke="black"
                                         strokeWidth={4}/>
                                         <Line
                                         dash= {[10, 10, 0, 10]}
                                         strokeWidth= {3}
                                         stroke='red'
                                         lineCap='round'
                                         id='quadLinePath'
                                         opacity= {0.3}
                                         points= {poly.points[index] && poly.points[index+1] ? [poly.points[index][0] , poly.points[index][1],point[0] , point[1],poly.points[index+1][0] ,poly.points[index+1][1]] : [poly.points[index][0] , poly.points[index][1],point[0] , point[1],poly.points[0][0] ,poly.points[0][1]]}/>
                                         <Line
                                            dash= {[10, 10, 0, 10]}
                                            strokeWidth= {3}
                                            stroke='grey'
                                            lineCap='round'
                                            id='quadLinePath'
                                            opacity= {0.3}
                                            points = {poly.points[index] && poly.points[index+1] ? [poly.points[index][0] , poly.points[index][1],poly.points[index+1][0] ,poly.points[index+1][1]] : [poly.points[index][0] , poly.points[index][1],poly.points[0][0] ,poly.points[0][1]]}
                                         />
                                     </>
                                 
                                    )    
                                })}
                        
                                {poly.points.map((point, index) => {
                                   
                                    const width = 6;
                                    const x = point[0] - width / 2;
                                    const y = point[1] - width / 2;
                                    const startPointAttr =
                                    index === 0
                                        ? {
                                            hitStrokeWidth: 12,
                                            onMouseOver: handleMouseOverStartPoint,
                                            onMouseOut: handleMouseOutStartPoint
                                        }
                                        : null;
                                    return (
                                    props.mode === 'Polygon' ?                                   
                                    <Rect
                                        key={index}
                                        x={x}
                                        y={y}
                                        width={width}
                                        height={width}
                                        fill="white"
                                        stroke="#B6D4F8"
                                        strokeWidth={3}
                                        onDragStart={handleDragStartPoint}
                                        onDragMove={handleDragMovePoint}
                                        onDragEnd={handleDragEndPoint}
                                        draggable
                                        {...startPointAttr}
                                    /> : <></>
                                    );
                                })}
                                 {poly.flattenedPoints.map((point, index) => {    
                                    let x = -500
                                    let y = -500
                                    let x1 = poly.flattenedPoints[index+2]
                                    let y1 = poly.flattenedPoints[index+3]
                                    if(index % 2 === 0 && index +3 < poly.flattenedPoints.length){                                  
                                        x = (point + poly.flattenedPoints[index+2]) / 2;
                                        y = (poly.flattenedPoints[index+1] + poly.flattenedPoints[index+3]) / 2;  
                                    }                                 
                                    return (
                                        index % 2 === 0?
                                        <Text text={Math.floor(PitagorasSentence(x,y,x1,y1)) / proportion} x={x} y={y} fontSize={20} /> : 
                                        <></>
                                    );
                                    })}
                                  {poly.anchorPoints.map((point, index) => {
                                   const width = 6;
                                   const x = point[0] - width / 2;
                                   const y = point[1] - width / 2;
                                   const startPointAttr =
                                   index === 0
                                       ? {
                                           hitStrokeWidth: 12,
                                           onMouseOver: handleMouseOverStartPoint,
                                           onMouseOut: handleMouseOutStartPoint
                                       }
                                       : null;
                                   return (
                                   props.mode === 'Polygon' ?                                   
                                   <Rect
                                       key={index}
                                       x={x}
                                       y={y}
                                       width={width}
                                       height={width}
                                       fill="white"
                                       stroke="#B6D4F8"
                                       strokeWidth={3}
                                       onDragStart={handleDragStartPoint}
                                       onDragMove={handleDragMovePoint}
                                       onDragEnd={handleDragEndPoint}
                                       draggable
                                       {...startPointAttr}
                                   /> : <></>
                                   );
                               })}
                                </>)
                            })}

                    
                        {anchorCircles[0] ?  
                        <Circular 
                            shapeProps = {anchorCircles[0]}
                            key = {0}
                            isSelected= {0 === selectedcircleId}
                            onSelect={() => {
                                props.ChangeMode(null)   
                                setSelectedcircleId(0)   
                                selectShape(null)      
                                }}
                                onChange={(newAttrs) => {
                                    const anchorcircles = anchorCircles.slice();
                                    anchorcircles[0] = newAttrs;
                                    setAnchorCircles(anchorcircles);      
                                    setStartPoint([newAttrs.x , newAttrs.y])                                                    
                                }}
                        />  : <></>}
                           {anchorCircles[1] ?  
                        <Circular 
                            shapeProps = {anchorCircles[1]}
                            key = {1}
                            isSelected= {1 === selectedcircleId}
                            onSelect={() => {
                                props.ChangeMode(null)   
                                setSelectedcircleId(1)   
                                selectShape(null)      
                                }}
                                onChange={(newAttrs) => {
                                const anchorcircles = anchorCircles.slice();
                                anchorcircles[1] = newAttrs;
                                setAnchorCircles(anchorcircles);             
                                setCurvePoint([newAttrs.x , newAttrs.y])                                                                        
                                }}
                        />   : <></>}

                        {anchorCircles[2] ?  
                        <Circular 
                            shapeProps = {anchorCircles[2]}
                            key = {2}
                            isSelected= {2 === selectedcircleId}
                            onSelect={() => {
                                props.ChangeMode(null)   
                                setSelectedcircleId(2)   
                                selectShape(null)      
                                }}
                                onChange={(newAttrs) => {
                                const anchorcircles = anchorCircles.slice();
                                anchorcircles[2] = newAttrs;
                                setAnchorCircles(anchorcircles);   
                                setEndPoint([newAttrs.x , newAttrs.y])                                                                            
                                }}
                        />   : <></>}

                        <Shape
                        sceneFunc={(context, shape) => {
                        context.beginPath();
                        context.moveTo(startPoint[0] , startPoint[1]);
                        context.quadraticCurveTo(curvePoint[0] , curvePoint[1],endPoint[0] , endPoint[1]);
                        // (!) Konva specific method, it is very important
                        context.fillStrokeShape(shape);
                        }}
                        stroke="black"
                        strokeWidth={4}
                        />

                        <Line
                                dash= {[10, 10, 0, 10]}
                                strokeWidth= {3}
                                stroke='black'
                                lineCap='round'
                                id='quadLinePath'
                                opacity= {0.3}
                                points= {[startPoint[0] , startPoint[1]  , curvePoint[0] , curvePoint[1], endPoint[0] , endPoint[1]]}
                        
                        />
                      </Layer>  
                        
            </Stage>   
            </Grid>           
        </Grid>
    )
    
}

const mapStateToProps = (state) => {
    return {
        mode : state.konva.mode,
        stage : state.konva.stage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ChangeMode: (newMode) => dispatch({type : 'ChangeMode' , newMode : newMode}),
        ChangeStage: (newStage) => dispatch({type : 'ChangeStage' , newStage : newStage}),
        UpdateCircles : (newCircles) => dispatch({type : 'UpdateCircles' , newCircles : newCircles}),
        UpdatePolygons : (newPolygons) => dispatch({type : 'UpdatePolygons' , newPolygons : newPolygons}),
        UpdateRectangles : (newRectangles) => dispatch({type : 'UpdateRectangles' , newRectangles : newRectangles})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(KonvaContainer)