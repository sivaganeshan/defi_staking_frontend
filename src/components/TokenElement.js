import {
  Paper,
  Card,
  Typography,
  CardContent,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import etherlogo from "../assest/ethereum.png";
import inrslogo from "../assest/inrs.png";
import {stakingConstants} from "../const";
import {getEthStaked, getRoneStaked,getEthRewardsAccumulated,
     getEthRewardsWithdrawn, getRoneRewardsAccumulated , getRoneRewardsWithdrawn, isEth} from "../contractHelper";


export default function TokenElement({ stakingDetails }) {

    let constants = stakingConstants();
    //const[isbusy, setIsBusy] = useState(true);
    const[ethStaked, setEthStaked] = useState("");
    const[roneStaked, setRoneStaked] = useState("");
    const[ethRewardsAccumulated, setEthRewardsAccumulated] = useState("");
    const[roneRewardsAccumulated, setroneRewardsAccumulated] = useState("");
    const[ethRewardsWithdrawn, setethRewardsWithdrawn] = useState("");
    const[roneRewardsWithdrawn, setRoneRewardsWithdraem] = useState("");

    useEffect(()=>{
        async function getStakingDetails(){
            setEthStaked(await getEthStaked());
            setRoneStaked(await getRoneStaked());
            setEthRewardsAccumulated(await getEthRewardsAccumulated());
            setroneRewardsAccumulated(await getRoneRewardsAccumulated());
            setethRewardsWithdrawn(await getEthRewardsWithdrawn());
            setRoneRewardsWithdraem(await getRoneRewardsWithdrawn());
            
        }
         getStakingDetails();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (  
    <>
      <Paper elevation={5} style={{ marginTop: "1%"}}>
        <Card sx={{}}>
          <CardContent>
            <Box
              sx={{
                display: "grid",
                gridAutoFlow: "column",
                justifyContent: "space-around",
                gridTemplateColumns: " 0.1fr 1fr 1fr",
              }}
            >
              <div >
                <Avatar component="span"
                  alt="logo"
                  src={
                    isEth(stakingDetails.tokenSymbol) ? etherlogo : inrslogo
                  }
                ></Avatar>
              </div>
              <div >
                <Typography variant="h6" component="span" color="primary">
                  {`${stakingDetails.tokenName} (${stakingDetails.tokenSymbol})`}
                </Typography>
              </div>
              <div >
                <Typography variant="h6" component="span" color="primary">
                 APR : {isEth(stakingDetails.tokenSymbol)?constants.ethAPR:constants.roneAPR} %
                </Typography>
              </div>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "0.1fr 1fr 1fr",
                gridAutoFlow: "row",
                justifyContent: "space-around"
              }}
            >
                <div>

                </div>
                <div>
                <Typography variant="body1" component="div" color="primary">
                {` Staked Amount : ${isEth(stakingDetails.tokenSymbol)?ethStaked:roneStaked} ${stakingDetails.tokenSymbol}`}
              </Typography>
                </div>
             
              <div>
              <Typography variant="body1" component="div" color="primary">
                {` Rewards Accumulated : ${isEth(stakingDetails.tokenSymbol)?ethRewardsAccumulated:roneRewardsAccumulated} RONE`}
              </Typography>
              <Typography variant="body1" component="div" color="primary">
                {` Rewards Withdrawn : ${isEth(stakingDetails.tokenSymbol)?ethRewardsWithdrawn:roneRewardsWithdrawn} RONE`}
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

              <Button style={{gridColumnStart:'5'}} variant="outlined" disabled={ethStaked>0?false:true }>
                {" "}
                Unstake
              </Button>

              <Button style={{gridColumnStart:'6'}} variant="outlined" disabled={(ethRewardsAccumulated - ethRewardsWithdrawn)>0?false:true }>
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
