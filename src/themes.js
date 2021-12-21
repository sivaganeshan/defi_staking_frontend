import { createTheme } from "@mui/material/styles";

export const lightModeTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export const darkModeTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const isDarkMode = () => {
  let darkModeDefaultPreference = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  if (darkModeDefaultPreference) {
      return isDarkModeFromLocalStorage(true);
  }
  else{
      return isDarkModeFromLocalStorage(false);
  }
};

export const setThemeLocalStorage = (isDarkMode) => {
  localStorage.setItem("dapp321_isDarkMode", isDarkMode ? "1" : "0");
};

export const isDarkModeFromLocalStorage = (enableDarkMode)=>{
    if(localStorage.getItem("dapp321_isDarkMode") == null){
        setThemeLocalStorage(enableDarkMode);
        return enableDarkMode;
      }
    let userPrefrefence = localStorage.getItem("dapp321_isDarkMode");
    if (userPrefrefence === "1") {
      return true;
    }
    return false
}
