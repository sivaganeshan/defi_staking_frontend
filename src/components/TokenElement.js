import {
  Paper,
  Card,
  Typography,
  CardContent,
  Avatar,
  Box,
  Button,
  Modal,
  List,
  ListItem,
  ListItemText,
  TextField,
  ListItemButton

} from "@mui/material";
import { useEffect, useState } from "react";
import etherlogo from "../assest/ethereum.png";
import inrslogo from "../assest/inrs.png";
import { stakingConstants } from "../const";
import {
  getEthStaked,
  getRoneStaked,
  getEthRewardsAccumulated,
  getEthRewardsWithdrawn,
  getRoneRewardsAccumulated,
  getRoneRewardsWithdrawn,
  isEth,
  isEthUnStakeDisabled,
  isRoneUnStakeDisabled,
  isEthCollectRewardsDisabled,
  isRoneCollectRewardsDisabled,
  getEthBalance,
  getRoneBalance,
  getMaxStakeValue,
  stakeEth,
  stakeRone,
  unstakeEth,
  unstakeRone
} from "../contractHelper";
import Loading from "./loading";

export default function TokenElement({ stakingDetails }) {
  let constants = stakingConstants();
  //const[isbusy, setIsBusy] = useState(true);
  const [ethStaked, setEthStaked] = useState("");
  const [roneStaked, setRoneStaked] = useState("");
  const [ethRewardsAccumulated, setEthRewardsAccumulated] = useState("");
  const [roneRewardsAccumulated, setroneRewardsAccumulated] = useState("");
  const [ethRewardsWithdrawn, setethRewardsWithdrawn] = useState("");
  const [roneRewardsWithdrawn, setRoneRewardsWithdraem] = useState("");

  const [isStakeClicked, SetIsStakeClicked] = useState(false);
  const [ethBalance, SetEthBalance] = useState(0.0);
  const [roneBalance, SetroneBalance] = useState(0.0);
  const [textStakeValue, SetTextStakeValue] = useState("");
  const [stakeError,SetStakeError] = useState(false);
  const [isLoading, SetIsLoading] = useState(false);
  const [isUnstakeClicked, SetisUnstakeClicked] = useState(false);

  useEffect(() => {
    async function getStakingDetails() {
      setEthStaked(await getEthStaked());
      setRoneStaked(await getRoneStaked());
      setEthRewardsAccumulated(await getEthRewardsAccumulated());
      setroneRewardsAccumulated(await getRoneRewardsAccumulated());
      setethRewardsWithdrawn(await getEthRewardsWithdrawn());
      setRoneRewardsWithdraem(await getRoneRewardsWithdrawn());
      SetEthBalance(await getEthBalance());
      SetroneBalance(await getRoneBalance());
    }
    getStakingDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stakeClicked = async ()=>{
    SetIsStakeClicked(true);
    
  }
  const stakeConfirm = async ()=>{
    if(parseFloat(textStakeValue)>getMaxStakeValue(stakingDetails.tokenSymbol,ethBalance, roneBalance )){
        SetStakeError(true);
        console.log("stake error detected");
    }else{
        SetStakeError(false);
        console.log("stake called");
        SetIsLoading(true);
        isEth(stakingDetails.tokenSymbol)?
        await stakeEth(textStakeValue): await stakeRone(textStakeValue);
        SetIsLoading(false);
        SetIsStakeClicked(false);
    }
  }

  const closeStakeModal = ()=>{
    SetIsStakeClicked(false);
  }

  const setMaxValue=()=>{
    let maxValueToStake = getMaxStakeValue(stakingDetails.tokenSymbol, ethBalance, roneBalance);
    SetTextStakeValue(maxValueToStake);
  }

  const handleTextChange=(event)=>{
    SetTextStakeValue(event.target.value);
  }

  const handleUnstakeClick = ()=>{
    SetisUnstakeClicked(true);
  }
  const closeUnstake=()=>{
    SetisUnstakeClicked(false);
  }
  const handleUnstakeConfirm = async()=>{
    SetIsLoading(true);
      isEth(stakingDetails.tokenSymbol)?await unstakeEth(): await unstakeRone();
      SetIsLoading(false);
      SetisUnstakeClicked(false);
  }


  return (
    <>
    {isLoading?(<Loading />):(
    <>
      <Paper elevation={5} style={{ marginTop: "1%" }}>
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
              <div>
                <Avatar
                  component="span"
                  alt="logo"
                  src={isEth(stakingDetails.tokenSymbol) ? etherlogo : inrslogo}
                ></Avatar>
              </div>
              <div>
                <Typography variant="h6" component="span" color="primary">
                  {`${stakingDetails.tokenName} (${stakingDetails.tokenSymbol})`}
                </Typography>
              </div>
              <div>
                <Typography variant="h6" component="span" color="primary">
                  APR :{" "}
                  {isEth(stakingDetails.tokenSymbol)
                    ? constants.ethAPR
                    : constants.roneAPR}{" "}
                  %
                </Typography>
              </div>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "0.1fr 1fr 1fr",
                gridAutoFlow: "row",
                justifyContent: "space-around",
              }}
            >
              <div></div>
              <div>
                <Typography variant="body1" component="div" color="primary">
                  {` Staked Amount : ${
                    isEth(stakingDetails.tokenSymbol) ? ethStaked : roneStaked
                  } ${stakingDetails.tokenSymbol}`}
                </Typography>
              </div>

              <div>
                <Typography variant="body1" component="div" color="primary">
                  {` Rewards Accumulated : ${
                    isEth(stakingDetails.tokenSymbol)
                      ? ethRewardsAccumulated
                      : roneRewardsAccumulated
                  } RONE`}
                </Typography>
                <Typography variant="body1" component="div" color="primary">
                  {` Rewards Withdrawn : ${
                    isEth(stakingDetails.tokenSymbol)
                      ? ethRewardsWithdrawn
                      : roneRewardsWithdrawn
                  } RONE`}
                </Typography>
              </div>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridAutoFlow: "column",
                marginTop: "2%",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                gap: "1rem",
              }}
            >
              <Button style={{ gridColumnStart: "4" }} variant="outlined" onClick={()=>stakeClicked()} >
                {" "}
                Stake
              </Button>

              <Button
                style={{ gridColumnStart: "5" }}
                variant="outlined"
                disabled={
                  isEth(stakingDetails.tokenSymbol)
                    ? isEthUnStakeDisabled(ethStaked)
                    : isRoneUnStakeDisabled(roneStaked)
                }
                onClick={()=>handleUnstakeClick()}
              >
                {" "}
                Unstake
              </Button>

              <Button
                style={{ gridColumnStart: "6" }}
                variant="outlined"
                disabled={
                  isEth(stakingDetails.tokenSymbol)
                    ? isEthCollectRewardsDisabled(
                        ethRewardsAccumulated,
                        ethRewardsWithdrawn
                      )
                    : isRoneCollectRewardsDisabled(
                        roneRewardsAccumulated,
                        roneRewardsWithdrawn
                      )
                }
              >
                {" "}
                Collect Rewards
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Paper>
      <Modal 
      open={isStakeClicked}
      onClose={closeStakeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
        <Paper
          elevation={5}
          style={{
            top: "50%",
            left: "50%",
            position: "absolute",
            transform: "translate(-50%,-50%)",
            margin: "auto",
          }}
        >
          <Card sx={{minWidth:"450px", minHeight:"350px"}}>
            <List sx={{margin:"2%"}}>
              <ListItem >
                <ListItemText>
                <Typography id="modal-modal-title" variant="h6" color="primary" component="h2">
                    Stake your tokens
                </Typography>
                </ListItemText>
              </ListItem>
              <ListItem >
                <ListItemText>
                <Typography id="modal-modal-title" variant="body2" color="primary" >
                    Balance : {isEth(stakingDetails.tokenSymbol)
                    ?ethBalance:roneBalance} {stakingDetails.tokenSymbol}
                </Typography>
                </ListItemText>
              </ListItem>
              <ListItem sx={{marginTop:"5%"}}>
                <ListItemText sx={{minWidth:"300px"}}>
                <TextField style={{minWidth:"300px"}} value={textStakeValue} onChange={handleTextChange} label="Stake Value" color="primary" focused />
                </ListItemText>
                <ListItemButton>
                <Button variant="outlined" onClick={()=>setMaxValue()}>
                Max
              </Button>
                </ListItemButton>
            </ListItem>
            <ListItem sx={{marginTop:"5%"}}>
                <ListItemButton>
                <Button variant="outlined" onClick={()=>stakeConfirm()}>
                    Stake
                </Button>
                </ListItemButton>
                <ListItemButton>
                <Button variant="outlined" onClick={()=>closeStakeModal()}>
                    Cancel
                </Button>
                </ListItemButton>
            </ListItem>
            {stakeError && 
            <ListItem>
                <ListItemText>
                <Typography variant="body1" component="div" color="primary">
                    Max stake limit exceed
                </Typography>
                </ListItemText>
            </ListItem>
            }
            </List>
          </Card>
        </Paper>
      </Modal>
      <Modal 
      open={isUnstakeClicked}
      onClose={closeUnstake}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
        <Paper
          elevation={5}
          style={{
            top: "50%",
            left: "50%",
            position: "absolute",
            transform: "translate(-50%,-50%)",
            margin: "auto",
          }}
        >
          <Card sx={{minWidth:"450px", minHeight:"350px"}}>
            <List sx={{margin:"2%"}}>
              <ListItem >
                <ListItemText>
                <Typography id="modal-modal-title" variant="h6" color="primary" component="h2">
                    Unstake your tokens
                </Typography>
                </ListItemText>
              </ListItem>
              <ListItem >
                <ListItemText>
                <Typography id="modal-modal-title" variant="body2" color="primary" >
                    Staked Balance : {isEth(stakingDetails.tokenSymbol)
                    ?ethStaked:roneStaked} {stakingDetails.tokenSymbol}
                </Typography>
                </ListItemText>
              </ListItem>
              <ListItem sx={{marginTop:"5%"}}>
                <ListItemText >
                <Typography id="modal-modal-title" variant="body2" color="primary" >
                    Do you want to unstake your holdings?
                </Typography>
                </ListItemText>
            </ListItem>
            <ListItem sx={{marginTop:"5%"}}>
                <ListItemButton>
                <Button variant="outlined" onClick={()=>handleUnstakeConfirm()}>
                    Confirm
                </Button>
                </ListItemButton>
                <ListItemButton>
                <Button variant="outlined" onClick={()=>closeUnstake()}>
                    Cancel
                </Button>
                </ListItemButton>
            </ListItem>
            </List>
          </Card>
        </Paper>
      </Modal>
      </>
    )}
    </>
  );
}
