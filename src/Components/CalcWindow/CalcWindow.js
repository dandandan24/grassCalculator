import React from 'react';
import {useState , useEffect} from 'react'
import Dialog from '@material-ui/core/Dialog'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import RollsTable from './RollsTable'
import { makeStyles , withStyles} from '@material-ui/core/styles';
import explain from './explain.PNG'
import { connect , dispatch } from "react-redux"
import {Stage , Layer , Line , Rect , Text , Circle} from 'react-konva'
import Rectangle from '../Konva/Rectangle'
import Polygon from '../Konva/Polygon'
import Circular from '../Konva/Circle'
import {Shape} from 'react-konva'
import { LastPageRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
          width : '100%',
        },
        [theme.breakpoints.up('sm')]: {
            width : '100%',
          },
        [theme.breakpoints.up('md')]: {
            width : '100%',
        },
        [theme.breakpoints.up('xl')]: {
            width : '80%',
        },
      },
   
}))

const CalcWindow = (props) => {
    let Windowstage = null 
    const classes = useStyles();
    const [currentTab , setCurrentTab] = useState(1)
    const [Outerdiv , setOuterdiv] = useState(document.getElementById('parentWindow'))

    console.log(currentTab)
    useEffect(() => {
        setOuterdiv(document.getElementById('parentWindow'))
    }) 


    useEffect(() => {
        console.log(props.Polygons , props.Rectangles , props.Circles , 'shapes')
    }, [props.Polygons , props.Rectangles , props.Circles]) 

    const handleTabChange = (event , newValue) => {
        setCurrentTab(newValue);
    }

    const setStageRef = ref => {
        if (ref) {
            Windowstage = ref;
            props.ChangeStageWindow(ref)
        }
    }; 

    const Squarelines = [0,1,2,3,4,5,6,7,8,9,10]
    const proportion = 40
    return(
        <Dialog fullWidth  = {true} maxWidth = 'xl'   onClose = {props.close} open = {props.open}>                
                <Grid container spacing = {0} style = {{direction : 'rtl'}}>
                    <Grid item xl = {6} xs = {6}>
                        <Grid item xl = {12}  xs = {12}>
                            <p style = {{direction : 'rtl' , fontSize : '24px' , marginRight : '20px'}}>חישוב הזמנתכם</p>
                            <Divider variant = 'middle' style = {{width : '15%' , position : 'absolute' , right: '0' ,marginTop : '-20px'}}></Divider>
                        </Grid>

                        <Grid item xl = {12} xs = {12}>
                            <Paper className = {classes.root}>
                                <Tabs value = {currentTab} indicatorColor = 'primary' textColor = 'primary' onChange = {handleTabChange}>
                                    <Tab label="מינימום פחת" /> 
                                    <Tab label="מינימום פחת + כיוון סיב אחיד" />
                                    <Tab label="מינימום חיבורים" />
                                    <Tab label="מינימום חיבורים + כיוון סיב אחיד" />
                                </Tabs>
                            </Paper>
                        </Grid>

                        <Grid item xl = {12}  xs = {12} style = {{marginTop : '30px'}}>
                            <p style = {{direction : 'rtl' , fontSize : '20px' , marginRight : '20px'}}>גלילים דרושים</p>
                            <Divider variant = 'middle' style = {{width : '6%' , position : 'absolute' , right: '0' ,marginTop : '-15px' ,  marginRight : '20px'}}></Divider>
                        </Grid>

                        <Grid item xl = {9} xs = {9}  style = {{ marginRight : '20px'}}>
                            <RollsTable row = {{TwoMeter : 3 , ThreeMeter: 5 , FourMeter : 10 , LeftOvers : 0.25}}></RollsTable>
                        </Grid>

                        <Grid item xl = {12}  xs = {12} style = {{marginTop : '30px'}}>
                            <p style = {{direction : 'rtl' , fontSize : '20px' , marginRight : '20px'}}>מקרא</p>
                            <Divider variant = 'middle' style = {{width : '3%' , position : 'absolute' , right: '0' ,marginTop : '-15px' ,  marginRight : '20px'}}></Divider>
                        </Grid>

                        <Grid item xl = {6} xs = {6} >
                            <img src = {explain}></img>
                        </Grid>

                        <Grid item xl = {12} xs = {12} style = {{marginTop : '130px'}}>
                            <div></div>
                        </Grid>
                    </Grid>
               
                    <Grid item xl = {6} xs = {6}>
                        <div id = 'parentWindow' style = {{border : '2px grey solid', borderRadius : '10px', height: '70vh' , width : '55vw' , marginTop : '80px' , marginRight : '-150px'}}>
                        <Stage ref={setStageRef}
                           width = {Outerdiv ? Outerdiv.offsetWidth : 0}
                           height = {Outerdiv ? Outerdiv.offsetHeight : 0}
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
                          
                                {props.Rectangles.map((rect, index) => {  
                                   
                                    return(
                                        <Rectangle
                                        shapeProps = {{...rect , x : rect.x/2 , width : rect.width /2 , height : rect.height ,stroke : 'white', fill : 'lightgreen'}}   

                                        key = {index}                                                
                                        />
                                    )                                                
                                    })}
                                {props.Circles.map((circle , index) => {
                                    
                                    return(
                                       <Circular 
                                       shapeProps = {{...circle , x: circle.x/2, radius : circle.radius/2 , width : circle.width/2 , height : circle.height/2}}
                                       key = {index}                                     
                                       />)                         
                                })}
                                {props.Polygons.map((poly , index) =>{       
                                return(     
                                    <>                
                                    {poly.anchorPoints.map((point, index) => {  
                                        return(
                                        <>
                                        <Shape
                                        sceneFunc={(context, shape) => {
                                            context.beginPath();
                                            if(poly.points[index] && poly.points[index+1]){
                                            context.moveTo(poly.points[index][0]/2 , poly.points[index][1]);
                                            context.quadraticCurveTo(point[0]/2 , point[1],poly.points[index+1][0]/2 ,poly.points[index+1][1]);
                                            }
                                            else{
                                                if(index === poly.points.length-1){
                                                    context.moveTo(poly.points[index][0]/2 , poly.points[index][1]);
                                                    context.quadraticCurveTo(point[0]/2 , point[1],poly.points[0][0]/2 ,poly.points[0][1]);
                                                }
                                            }
                                            // (!) Konva specific method, it is very important
                                            context.fillStrokeShape(shape);                                          
                                            }}                                         
                                            stroke="pink"    
                                            strokeWidth={4}/>                                          
                                            {/* <Line
                                            dash= {[10, 10, 0, 10]}
                                            strokeWidth= {3}
                                            stroke='red'
                                            lineCap='round'
                                            id='quadLinePath'
                                            opacity= {0.3}
                                            points= {poly.points[index] && poly.points[index+1] ? [poly.points[index][0]/2 , poly.points[index][1],point[0]/2 , point[1],poly.points[index+1][0]/2 ,poly.points[index+1][1]] : [poly.points[index][0]/2 , poly.points[index][1],point[0]/2 , point[1],poly.points[0][0]/2 ,poly.points[0][1]]}/>
                                            <Line
                                                dash= {[10, 10, 0, 10]}
                                                strokeWidth= {3}
                                                stroke='grey'
                                                lineCap='round'
                                                id='quadLinePath'
                                                opacity= {0.3}
                                                points = {poly.points[index] && poly.points[index+1] ? [poly.points[index][0]/2 , poly.points[index][1],poly.points[index+1][0]/2 ,poly.points[index+1][1]] : [poly.points[index][0]/2 , poly.points[index][1],poly.points[0][0]/2 ,poly.points[0][1]]}
                                            /> */}
                                        </>                                  
                                        )    
                                    })}                                                                    
                                    </>)
                            })}                                  

                           
                                
                       
                            </Layer>   
                            
                            <Layer>                          
                                    {props.AlgorithmResult[currentTab] ? props.AlgorithmResult[currentTab].map((allRects, index) => {   
                                        return(
                                        allRects.map((rect , index)=> {     
                                            let coreWidth = Math.abs(rect[3][0][0] -  rect[3][1][0])
                                            let remainArea = rect[5]
                                            let length = rect[2]
                                            let coreHeight =Math.abs(rect[3][0][1] -  rect[3][2][1])       
                                        console.log(coreWidth,coreHeight , remainArea , length , 'coreremainlength')   
                                        console.log(coreWidth + (length !== coreWidth?  remainArea: 0),coreHeight + (length !== coreHeight?  remainArea: 0),'widthg and heighr' )                                                
                                        return(
                                            <>
                                            <Rectangle
                                            shapeProps ={{x : rect[3][0][0]*proportion/2 , 
                                                        y : rect[3][0][1]*proportion , 
                                                        width : (coreWidth + (length !== coreWidth?  remainArea: 0))*proportion/2
                                                 , height: (coreHeight + (length !== coreHeight?  remainArea: 0))*proportion , stroke : 'black',dash: [10, 10], strokeWidth : 3}}
                                            
                                            key = {index}                                                
                                            />
                                            <Text text = {parseFloat((coreWidth + (length !== coreWidth?  remainArea: 0))).toFixed(2)} x = {rect[3][0][0]*proportion/2 + (coreWidth + (length !== coreWidth?  remainArea: 0))*proportion/4} y= {rect[3][0][1]*proportion - 30}  fontSize = {20} />
                                            <Text text = {parseFloat((coreHeight + (length !== coreHeight?  remainArea: 0))).toFixed(2)} x = {rect[3][0][0]*proportion/2 - 30} y= {rect[3][0][1]*proportion + (coreHeight + (length !== coreHeight?  remainArea: 0))*proportion/2}  fontSize = {20} />
                                            </>
                                        )}))                                             
                                    }) : <></>}
                            </Layer>

                        </Stage>
                        </div>
                    </Grid>
                </Grid>      
        </Dialog>
    )
} 


const mapStateToProps = (state) => {
    return {
        Polygons : state.konva.Polygons,
        Rectangles : state.konva.Rectangles,
        Circles : state.konva.Circles,
        mode : state.konva.mode,
        Windowstage : state.konva.Windowstage,
        AlgorithmResult : state.konva.AlgorithmResult
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ChangeMode: (newMode) => dispatch({type : 'ChangeMode' , newMode : newMode}),
        ChangeStageWindow: (newWindowstage) => dispatch({type : 'ChangeStageWindow' , newWindowstage : newWindowstage}),
        UpdateCircles : (newCircles) => dispatch({type : 'UpdateCircles' , newCircles : newCircles}),
        UpdatePolygons : (newPolygons) => dispatch({type : 'UpdatePolygons' , newPolygons : newPolygons}),
        UpdateRectangles : (newRectangles) => dispatch({type : 'UpdateRectangles' , newCircles : newRectangles})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CalcWindow)