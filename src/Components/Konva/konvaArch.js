import {Stage , Shape, Layer , Line , Circle } from 'react-konva'
import React from 'react'
import {useState, useEffect} from 'react'

const KonvaArch = (props) => {

    const [startPoint , setStartPoint] = useState([60,30])
    const [endPoint , setEndPoint] = useState([80,160])
    const [curvePoint , setCurvePoint] = useState([240,110])

    return (
        <Stage height = {500} width = {500}>
            <Layer>
                <Circle
                    x= {startPoint[0]}
                    y= {startPoint[1]}
                    radius= {20}
                    stroke= '#666'
                    fill= '#ddd'
                    strokeWidth= {2}
                    draggable= {true}
                />
                 <Circle
                    x= {endPoint[0]}
                    y= {endPoint[1]}
                    radius= {20}
                    stroke= '#666'
                    fill= '#ddd'
                    strokeWidth= {2}
                    draggable= {true}
                />
                 <Circle
                    x= {curvePoint[0]}
                    y= {curvePoint[1]}
                    radius= {20}
                    stroke= '#666'
                    fill= '#ddd'
                    strokeWidth= {2}
                    draggable= {true}
                />
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
            </Layer>
        </Stage>
    )
}

export default KonvaArch