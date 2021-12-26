import "./App.css";
import Header from "./components/Header";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { isDarkMode, lightModeTheme, darkModeTheme } from "./themes";
import {  useState } from "react";
import TokenElement from "./components/TokenElement";
import TotalValues from "./components/TotalValues";

function App() {

  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(isDarkMode());

  return (
    <>
    {/* {isBusy?(<>Loading.....</>): */}
    <ThemeProvider theme={isDarkModeEnabled ? darkModeTheme : lightModeTheme}>
      <CssBaseline />
      <div className="App">
        <Header
          DarkMode={isDarkModeEnabled}
          SetDarkMode={setIsDarkModeEnabled}
        />
        <TotalValues stakingDetails={{totalEthLocked:"10.2",totalRoneLocked:"10150"}} />
        <TokenElement stakingDetails = {{tokenName:"ETHEREUM",tokenSymbol:"ETH" }}/>
        <TokenElement stakingDetails = {{tokenName:"RewardOne",tokenSymbol:"RONE" }}/>

      </div>
    </ThemeProvider>
  
    </>
  )
}

export default App;
