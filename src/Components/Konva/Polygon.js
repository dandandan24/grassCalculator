import React, { useState } from 'react'
import konva from 'konva'
import { Stage, Layer, Group, Line, Rect } from "react-konva";

const Polygon = (props) => {
    const [points , setpoints] = useState([])
    const [curMousePos , setcurMousePos] = useState([0,0])
    const [isMouseOverStartPoint ,setisMouseOverStartPoint] = useState(false)
    const [isFinished , setisFinished] = useState(false)
    const getMousePos = () => {     
        if(props.stage)  {
            return [props.stage.getPointerPosition().x, props.stage.getPointerPosition().y];
        }
       return 0
    };

    const handleClick = event => {
        console.log('handling click')
        const stage = props.stage;
        const mousePos = getMousePos(stage);
    
        if (isFinished) {
          return;
        }
        if (isMouseOverStartPoint && points.length >= 3) {
            setisFinished(true)
        } else {
          setpoints([...points , mousePos])
        }
      };

    const handleMouseMove = event => {
        const stage = props.stage;
        const mousePos = getMousePos(stage);
        setcurMousePos(mousePos)
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
        console.log("start", event);
      };

    const handleDragMovePoint = event => {
        const points = points;
        const index = event.target.index - 1;
        console.log(event.target);
        const pos = [event.target.attrs.x, event.target.attrs.y];
        console.log("move", event);
        console.log(pos , "pos");
        setpoints([...points.slice(0 , index), pos , ...points.slice(index+1) ])
      };

    const handleDragOutPoint = event => {
        console.log("end", event);
      };

    const handleDragEndPoint = () => {
        console.log('not defined function')
    }
    const flattenedPoints = points
        .concat(isFinished ? [] : curMousePos)
        .reduce((a, b) => a.concat(b), []);
    
    return(
            <Stage  onMouseDown={handleClick}
            onMouseMove={handleMouseMove}>
            <Layer >
              <Line
                points={flattenedPoints}
                stroke="black"
                strokeWidth={5}
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
            </Layer>
            </Stage>
    )

}


export default Polygon