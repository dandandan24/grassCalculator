import React , {useEffect, useState} from 'react'
import {Stage , Layer , Line , Rect} from 'react-konva'
import DrawToolBar from './DrawToolBar'
import Grid from '@material-ui/core/Grid'
import { connect , dispatch } from "react-redux"

const KonvaContainer = (props) => {
    let stage = null 
    const [Outerdiv , setOuterdiv] = useState(document.getElementById('parent'))
    const [currentLine, setCurrentLine] = useState(null);
    const [currentRect , setCurrentRect] = useState(null)
    const [color, setColor] = useState("black");
    const [lines, setLines] = useState([]);
    const [Rects , setRects] = useState([]);

    useEffect(() => {
        setOuterdiv(document.getElementById('parent'))
    }, [])  

    const onMouseDown = () => {
        const {x, y} = stage.getPointerPosition();
        if(props.mode === 'Line'){
            setCurrentLine({ points: [x, y], color});
        }
        if(props.mode === 'Rect'){
            setCurrentRect({x : x , y : y})
        }
      
    }

    const onMouseMove = () => {
        const {x, y} = stage.getPointerPosition();
        if(props.mode === 'Line')
        {
            if (currentLine) {
            switch (props.mode) {
                case "Line":
                const [x0, y0] = currentLine.points;
                setCurrentLine({
                    ...currentLine,
                    points: [x0, y0, x, y]
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
    };
    console.log(Rects)
    const onMouseUp = () => {
        const {x, y} = stage.getPointerPosition();
        if(props.mode === 'Line')
        {
            setCurrentLine(null);
            setLines([
            ...lines,
            { ...currentLine, points: [...currentLine.points, x, y] }
            ]);
        }
        if(props.mode === 'Rect'){
            console.log(Rects)
            const x0 = currentRect.x
            const y0 = currentRect.y    
            setRects([
                ...Rects,
                {...currentRect ,x: x>x0 ? x0 : x, y : y>y0 ? y0 : y, width : x>x0 ? x - x0 : x0-x,height : y>y0 ? y - y0 : y0-y}                    
            ])
            setCurrentRect(null)
        }
      };

    const setStageRef = ref => {
        if (ref) {
            stage = ref;
        }
    }; 
    return(    
        <Grid container>
            <Grid item xs = {12}>
                <DrawToolBar></DrawToolBar>
            </Grid>
            <Grid item xs = {12}>
            <Stage ref={setStageRef}
                width = {Outerdiv ? Outerdiv.offsetWidth : 0}
                height = {Outerdiv ? Outerdiv.offsetHeight : 0}
                onMouseDown = {onMouseDown}
                onMouseMove = {onMouseMove}
                onMouseUp = {onMouseUp}>
                        <Layer>
                            <Line
                                {...currentLine}
                                strokeWidth={2}
                                stroke= 'black'
                            />

                                {lines.map((line, index) => (
                                    <Line
                                    key={index}
                                    {...line}                      
                                    strokeWidth={2}
                                    stroke= 'black'
                                    draggable
                                    />
                                ))}
                                <Rect
                                    {...currentRect}
                                    strokeWidth={2}
                                    stroke= 'black'
                                />
                                {Rects.map((rect, index) => (
                                <Rect
                                {...rect}                      
                                strokeWidth={2}
                                stroke= 'black'
                                />
                                ))}
                        </Layer>            
            </Stage>  
            </Grid>           
        </Grid>
    )
    
}

const mapStateToProps = (state) => {
    return {
        mode : state.konva.mode
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(KonvaContainer)