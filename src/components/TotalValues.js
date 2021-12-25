import { Typography , Box, Paper, Card} from "@mui/material";


export default function TotalValues({stakingDetails}){

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
                {stakingDetails.totalEthLocked}
            </Typography>
            </div>
            <div style={{gridColumnStart:'3'}} >
                <Typography variant="h6" component="div" color="primary">
                    Total RONE Locked
                </Typography>
                <Typography variant="h6" component="div" color="primary">
                    {stakingDetails.totalRoneLocked}
                </Typography>
            </div>
        </Box>
        </Card>
        </Paper>
        </>
    )
}