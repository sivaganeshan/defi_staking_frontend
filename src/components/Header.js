import { AppBar, Typography, Button, Box, Avatar, Modal,
     Paper , Card,CardContent, List, ListItem, ListItemText } from "@mui/material";
import { useState, useEffect } from "react";
import lightmode from "../assest/lightmode.svg";
import darkmode from "../assest/darkmode.svg";
import { setThemeLocalStorage } from "../themes";
import {isRinkebyNetwork, getTokenFarmingContract, getSignerAddress } from "../contractHelper";

export default function Header({ DarkMode, SetDarkMode }) {

  const [walletAddress, setwalletAddress] = useState("");
  const [isMetaMask, setMetaMask] = useState(true);
  const [changeNetwork, setChangeNetwork] = useState(false);

  useEffect(() => {
   async function getWallerDetails(){
    if (window.ethereum) {
      setMetaMask(true);
      setwalletAddress(await getSignerAddress());
      setChangeNetwork(! await isRinkebyNetwork());
    } else if (window.web3) {
      setMetaMask(true);
      setwalletAddress(await getSignerAddress());
      setChangeNetwork(! await isRinkebyNetwork());
    } else {
      setMetaMask(false);
    }
    metamaskEvents();
}
getWallerDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeMode = () => {
    if (DarkMode) {
      setThemeLocalStorage(false);
      SetDarkMode(false);
    } else {
      setThemeLocalStorage(true);
      SetDarkMode(true);
    }
  };

  const metamaskEvents= ()=>{
      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      });
      window.ethereum.on('accountsChanged', (accountID) => {
      window.location.reload();
    });
  }

  const connectWallet = async ()=>{
    await getTokenFarmingContract();
  }

  

  return (
    <>
        <div className="header-ele">
          <AppBar position="static" color="default">
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "2fr 10fr 1fr",
                gridAutoFlow: "column",
                justifyContent: "space-around",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <Typography variant="h5" component="span" color="primary">
                  Staking_Rinkeby
                </Typography>
              </div>
              <div>
                {!isMetaMask ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={connectWallet}
                  >
                    Connect to Wallet
                  </Button>
                ) : (
                  <Typography variant="h6" component="span" color="primary">
                    {walletAddress}
                  </Typography>
                )}
              </div>
              <div>
                <Box sx={{}}>
                  <Button onClick={changeMode}>
                    {DarkMode ? (
                      <Avatar alt="darkmode" src={lightmode}></Avatar>
                    ) : (
                      <Avatar alt="lightmode" src={darkmode}></Avatar>
                    )}
                  </Button>
                </Box>
              </div>
            </Box>
          </AppBar>
        </div>
        <Box sx={{display:'flex', flexDirection:"row", justifyContent:'center', alignItems:'center'}}>
        <Modal
         open={!isMetaMask}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
       >
               <Paper elevation={5} style={{ top:'50%', left:'50%' , position:'absolute',transform: 'translate(-50%,-50%)' , margin:'auto'}}>
                   <Card>
                       <CardContent>
                           <List>
                               <ListItem>
                                   <ListItemText>
                                   Non Ethereum browser detected. Try to install MetaMask as extension !!!
                                   </ListItemText>
                               </ListItem>
                               <ListItem>
                                   <ListItemText>
                                   Add rinkeby network to MetaMask
                                   </ListItemText>
                               </ListItem>
                               <ListItem>
                                   <ListItemText>
                                   Add test ETH to your account from rinkeby faucet 
                                   </ListItemText>
                               </ListItem>
                               <ListItem>
                                   <ListItemText>
                                   Select rinkeby network to stake and unstake on this app.
                                   </ListItemText>
                               </ListItem>
                           </List>
                       </CardContent>
                       </Card>
               </Paper>
          
           </Modal>
       </Box>
       <Box sx={{display:'flex', flexDirection:"row", justifyContent:'center', alignItems:'center'}}>
        <Modal
         open={changeNetwork}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
       >
               <Paper elevation={5} style={{ top:'50%', left:'50%' , position:'absolute',transform: 'translate(-50%,-50%)' , margin:'auto'}}>
                   <Card>
                       <CardContent>
                           <List>
                               <ListItem>
                                   <ListItemText>
                                   Wrong Network detected, Change the network to Rinkeby.
                                   </ListItemText>
                               </ListItem>
                           </List>
                       </CardContent>
                       </Card>
               </Paper>
          
           </Modal>
       </Box>
    </>
  );
}
