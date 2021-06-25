import React from 'react';
import {useEffect , useState} from 'react'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelContent from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Fab from '@material-ui/core/Fab';
import calc from '@material-ui/icons/'
import CalcWindow from './CalcWindow/CalcWindow';
import KonvaContainer from './Konva/KonvaContainer'
import DrawToolBar from './Konva/DrawToolBar'
import ShapePoints from '../Algorithm/DotsSpreading';
import algorithm from '../Algorithm/Algorithm'
import { connect , dispatch } from "react-redux"
import ProportionController from '../Algorithm/ShapesProportions'

const Container = (props) => {

    const [openCalc , setopenCalc] = useState(false)

    const handleClose = () =>{
        setopenCalc(false)
    }

    const handleOpen = () => {
        // tryLongestPath([[4,6],[4,12],[7,12],[7,16],[27,16],[27,1],[20,6]])
        // tryLongestPath([[3,3],[3,11],[20,11],[20,3],[11,3],[11,6],[14,6],[14,9],[7,9],[7,3]])
        //tryLongestPath([[4,4],[4,10],[12,10],[12,12.1],[18.4,12.1],[18.4,4],])
        //algorithm([ [[4,4],[4,24] ,[15.5,24],[15.5,4]] ])
        let orderedRects = ProportionController.RectangleHandler(props.Rectangles , props.height) 
        let orderedPolygons = ProportionController.PolygonHandler(props.Polygons , props.height)
        let orderedCircles = ProportionController.CircleHandler(props.Circles , props.height)
        let algorithmResult
        try{
            algorithmResult = algorithm([...orderedRects, ...orderedCircles, ...orderedPolygons])
        }
        catch(e){
            alert('cant handle it yet')
        }
        //algorithmResult = reversePoints(algorithmResult)
        console.log(algorithmResult)
        props.ChagneResultArray(algorithmResult)
        setopenCalc(true)  
    }

    return(
        <Grid container spacing = {0} style = {{direction : 'rtl'}}>
            <Grid item xl = {12}  xs = {12}>
                <p style = {{direction : 'rtl' , fontSize : '24px' , marginRight : '20px'}}>מחשבון דשא סינטטי</p>
                <Divider variant = 'middle' style = {{width : '15%' , position : 'absolute' , right: '0' ,marginTop : '-20px'}}></Divider>
            </Grid>
            <Grid item xl = {1.5} xs = {1.5}>
                <ExpansionPanel style = {{width : '100%',  marginRight : '20px'}}>
                    <ExpansionPanelSummary expandIcon = {<ExpandMoreIcon/>}>
                        הוראות
                    </ExpansionPanelSummary>
                    <ExpansionPanelContent>
                        yay
                    </ExpansionPanelContent>
                </ExpansionPanel>
            </Grid>
            <Grid item xl = {12} xs = {12}>
            </Grid>
            <Grid item xl = {1} md  = {2} xs = {3} style ={ {marginTop:'15px' , marginRight : '15px'}}>
                <Fab onClick = {handleOpen} variant = 'extended' style = {{width : '100%', color :'black' , backgroundColor : '#AFD5AA'}}>
                    <p style = {{color : 'white'}}>חשב</p>                   
                </Fab>
            </Grid>
            <Grid xl = {11} xs = {11}>
                <div style = {{border : '2px solid grey', borderRadius : '5px' , height : '75vh' , width: '97vw' , marginRight : '20px' , marginTop : '20px'}}>
                    <div>
                        <DrawToolBar></DrawToolBar>
                    </div>
                    <div id = "parent" style = {{height : '65vh' , width: '97vw' , marginTop : '20px'}}>
                        <KonvaContainer></KonvaContainer>
                    </div>
                    
                </div>
            </Grid>
            <Grid xl = {12} xs = {12}  style = {{height : '90%', width : '90%'}}>
                <CalcWindow open = {openCalc} close = {handleClose}></CalcWindow>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        mode : state.konva.mode,
        stage : state.konva.stage,
        height : state.konva.height,
        Polygons : state.konva.Polygons,
        Rectangles : state.konva.Rectangles,
        Circles : state.konva.Circles,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ChagneResultArray: (newResult) => dispatch({type : 'ChagneResultArray' , newResult : newResult}),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Container)

