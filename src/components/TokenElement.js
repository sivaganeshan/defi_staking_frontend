import { useState } from "react";
import {
  Paper,
  Card,
  Typography,
  CardContent,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import etherlogo from "../assest/ethereum.png";
import inrslogo from "../assest/inrs.png";

export default function TokenElement({ stakingDetails }) {
  return (
    <>
      <Paper elevation={3} style={{ marginTop: "0.2%"}}>
        <Card sx={{}}>
          <CardContent>
            <Box
              sx={{
                display: "grid",
                gridAutoFlow: "column",
                justifyContent: "space-around",
                gridTemplateColumns: "1fr 1fr 1fr",
              }}
            >
              <div>
                <Avatar component="span"
                  alt="logo"
                  src={
                    stakingDetails.tokenSymbol === "ETH" ? etherlogo : inrslogo
                  }
                ></Avatar>
              </div>
              <div>
                <Typography variant="h6" component="span" color="primary">
                  {`${stakingDetails.tokenName} (${stakingDetails.tokenSymbol})`}
                </Typography>
              </div>
              <div>
                <Typography variant="h6" component="span" color="primary">
                  {`APR : ${stakingDetails.APR}`}
                </Typography>
              </div>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gridAutoFlow: "row",
                justifyContent: "space-around"
              }}
            >
                <div>

                </div>
                <div>
                <Typography variant="body1" component="div" color="primary">
                {` Staked Amount : ${stakingDetails.stakedAmount} ${stakingDetails.tokenSymbol}`}
              </Typography>
                </div>
             
              <div>
              <Typography variant="body1" component="div" color="primary">
                {` Rewards Accumulated : ${stakingDetails.rewardsAccumulated} RONE`}
              </Typography>
              <Typography variant="body1" component="div" color="primary">
                {` Current Cycle Rewards : ${stakingDetails.currentCycleRewards} RONE`}
              </Typography>
              </div>
             
            </Box>
            <Box
              sx={{
                display: "grid",
                gridAutoFlow: "column",
                marginTop: "2%",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                gap: '1rem'
              }}
            >

              <Button style={{gridColumnStart:'4'}} variant="outlined">
                {" "}
                Stake
              </Button>

              <Button style={{gridColumnStart:'5'}} variant="outlined" disabled={stakingDetails.stakedAmount>0?false:true }>
                {" "}
                Unstake
              </Button>

              <Button style={{gridColumnStart:'6'}} variant="outlined" disabled={(stakingDetails.currentCycleRewards + stakingDetails.rewardsAccumulated)>0?false:true }>
                {" "}
                Collect Rewards
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
}
