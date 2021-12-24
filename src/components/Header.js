import { AppBar, Typography, Button, Box, Avatar, Modal,
     Paper , Card,CardContent, List, ListItem, ListItemText } from "@mui/material";
import { useState, useEffect } from "react";
import lightmode from "../assest/lightmode.svg";
import darkmode from "../assest/darkmode.svg";
import { setThemeLocalStorage } from "../themes";

import { ethers } from "ethers";

export default function Header({ DarkMode, SetDarkMode }) {
  const [isConnectedWithWallet, setisConnectedWithWallet] = useState(false);
  const [walletAddress, setwalletAddress] = useState("");
  const [isMetaMask, setMetaMask] = useState(true);

  useEffect(() => {
    //if wallet
    if (window.ethereum) {
      setMetaMask(true);
      connectWallet();
    } else if (window.web3) {
      setMetaMask(true);
      connectWallet();
    } else {
      setMetaMask(false);
    }
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

  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    let accounts = await provider.send("eth_requestAccounts", []);
    console.log("all adresses : ", accounts);
    console.log("current address", ethers.Wallet.address);
    const signer = provider.getSigner();
    let address = await signer.getAddress();
    if (address) {
      setisConnectedWithWallet(true);
    }
    console.log("Account:", address);
    setwalletAddress(address);
  };

  return (
    <>
        <div className="header-ele">
          <AppBar position="static" color="default">
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "auto auto auto",
                gridAutoFlow: "column",
                justifyContent: "space-around",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <Typography variant="h5" component="span" color="primary">
                  Staking_Demo_Rinkeby
                </Typography>
              </div>
              <div>
                {!isConnectedWithWallet ? (
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
    </>
  );
}
