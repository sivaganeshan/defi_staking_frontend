import "./App.css";
import Header from "./components/Header";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { isDarkMode, lightModeTheme, darkModeTheme } from "./themes";
import { useState } from "react";
import TokenElement from "./components/TokenElement";

function App() {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(isDarkMode());

  return (
    <ThemeProvider theme={isDarkModeEnabled ? darkModeTheme : lightModeTheme}>
      <CssBaseline />
      <div className="App">
        <Header
          DarkMode={isDarkModeEnabled}
          SetDarkMode={setIsDarkModeEnabled}
        />
        <TokenElement stakingDetails = {{tokenName:"ETHEREUM",tokenSymbol:"ETH", 
        APR:"4.0%", stakedAmount:1.0, rewardsAccumulated:400, rewardsWithdrawn:100 }}/>

        <TokenElement stakingDetails = {{tokenName:"RewardOne",tokenSymbol:"RONE", 
        APR:"10.0%", stakedAmount:0, rewardsAccumulated:0, rewardsWithdrawn:0 }}/>
      </div>
    </ThemeProvider>
  );
}

export default App;
