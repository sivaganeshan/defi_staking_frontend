import { Typography , Box, Paper, Card} from "@mui/material";
import { useState, useEffect } from "react";
import {getTotalEthLocked,getTotalRoneLocked} from "../contractHelper";
export default function TotalValues(){

    const[totalEthLocked, setTotalEthLocked] = useState(0.0);
    const[totalRoneLocked, setTotalRoneLocked] = useState(0.0);

    useEffect(()=>{
        const getLockedValues = async()=>{
            setTotalEthLocked(await getTotalEthLocked());
            setTotalRoneLocked(await getTotalRoneLocked());
        }
        getLockedValues();
    },[]);
    return(
        <>
        <Paper elevation={5} >
        <Card sx={{marginTop:"0.5%", padding :"0.25%", marginBottom:"0.5%" }}>
        <Box sx={{display:'grid', gridAutoFlow: "column",
                justifyContent: "space-around",
                alignContent: "center",
                alignItems: "center",
                gridTemplateColumns: "0.1fr 1fr 1fr"  }}>
            <div style={{gridColumnStart:'2'}}>
            <Typography variant="h6" component="div" color="primary">
                Total ETH Locked
            </Typography>
            <Typography variant="h6" component="div" color="primary">
                {totalEthLocked}
            </Typography>
            </div>
            <div style={{gridColumnStart:'3'}} >
                <Typography variant="h6" component="div" color="primary">
                    Total RONE Locked
                </Typography>
                <Typography variant="h6" component="div" color="primary">
                    {totalRoneLocked}
                </Typography>
            </div>
        </Box>
        </Card>
        </Paper>
        </>
    )
}