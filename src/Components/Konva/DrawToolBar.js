import React from 'react'
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {useState , useEffect} from 'react'
import FiberManualRecord from '@material-ui/icons/FiberManualRecord'
import ShowChart from '@material-ui/icons/ShowChart'
import Stop from '@material-ui/icons/Stop'
import {connect,dispatch} from 'react-redux'

const DrawToolBar = (props) => {


    const handleChange = (event ,newMode) => {
        props.ChangeMode(newMode)
    }

    return (
        <Grid container direction = 'row' style = {{height : '100%' , width : '100%'}}>
            <Grid item xs = {5} style = {{alignItems : 'center'}}></Grid>
            <Grid item xs = {7} style = {{alignItems : 'center'}}>
                <ToggleButtonGroup size = "large" value = {props.mode} exclusive onChange = {handleChange} style = {{marginTop : '20px' , boxShadow : '2px 2px 2px 2px grey'}}>
                    <ToggleButton value = "Rect">
                        <Stop/>
                    </ToggleButton>
                    <ToggleButton value = "Polygon">
                        <ShowChart/>
                    </ToggleButton>
                    <ToggleButton value = "Circle">
                        <FiberManualRecord/>
                    </ToggleButton>
                    <ToggleButton value = "Ellipse">
                        <FiberManualRecord/>
                    </ToggleButton>

                </ToggleButtonGroup>
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
        ChangeMode: (newMode) => dispatch({type : 'ChangeMode' , newMode : newMode}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawToolBar)