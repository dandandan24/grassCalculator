import React from 'react';
import {useState} from 'react'
import Dialog from '@material-ui/core/Dialog'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import RollsTable from './RollsTable'
import { makeStyles } from '@material-ui/core/styles';
import explain from './explain.PNG'

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
    const classes = useStyles();
    const [currentTab , setCurrentTab] = useState(1)

    const handleTabChange = (event , newValue) => {
        setCurrentTab(newValue);
    }


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
                        <div style = {{border : '2px grey solid', borderRadius : '10px', height: '85%' , width : '90%' , marginTop : '80px' , marginRight : '30px'}}></div>
                    </Grid>
                </Grid>      
        </Dialog>
    )
} 

export default CalcWindow