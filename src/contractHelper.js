import { ethers } from "ethers";
import {stakingConstants} from "./const";
var constants = stakingConstants();

function tokens(n){
    return ethers.utils.parseEther(n);
}

function format(n){
    return ethers.utils.formatEther(n);
}

export const isRinkebyNetwork = async () =>{
    try{
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        let network = await provider.getNetwork();
        return network.chainId === 4 ;
        }
    catch(ex){
        console.error("error in checking is that a rinkeby network");
    }

}

export const getSigner = async () => {
    try{
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const signer = provider.getSigner();
        return signer;
    }
    catch(ex){
        console.error("Error in connectWallet : ", ex.message);
    }
   
  };

export const getSignerAddress = async () =>{
    try{
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const signer = provider.getSigner();
        return await signer.getAddress();
    }
    catch(ex){
        console.error("Error in getSignerAddress : ", ex.message);
    }
}


 
export const getTokenFarmingContract= async (signer)=>{

    try{
        return new ethers.Contract(constants.tokenFarmingAddress,constants.tokenFarmingABI.abi,signer);
    }
    catch(ex){
        console.error("Connection Error : ", ex.message);
    }
} 

export const getRoneTokenContract= async (signer)=>{

    try{
        return new ethers.Contract(constants.ronetokenAddress,constants.ronetokenABI.abi,signer);
    }
    catch(ex){
        console.error("Connection Error Rone Token: ", ex.message);
    }
} 

export const getTotalEthLocked = async (contract)=>{
    try{
        let signer = await getSigner();
        let contract = await getTokenFarmingContract(signer);
        let totalEthLocked = await contract.balanceOfEthStaked();
        return format(totalEthLocked);
    }
    catch(ex){
        console.error("Error in getting getTotalEthLocked : ", ex.message);
    }
}

export const getTotalRoneLocked = async (contract)=>{
    try{
        let signer = await getSigner();
        let contract = await getTokenFarmingContract(signer);
        let totalRoneLocked = await contract.balanceOfRoneStaked();
        return format(totalRoneLocked);
    }
    catch(ex){
        console.error("Error in getting getTotalRoneLocked : ", ex.message);
    }
}

export const getEthStaked = async ()=>{
    try{
        let signer = await getSigner();
        let contract = await getTokenFarmingContract(signer);
        let ethStaked = await contract.getEthStaked();
        return format(ethStaked);
    }
    catch(ex){
        console.error("Error in getting getEthStaked : ", ex.message);
    }
}

export const getRoneStaked = async ()=>{
    try{
        let signer = await getSigner();
        let contract = await getTokenFarmingContract(signer);
        let roneStaked = await contract.getRoneStaked();
        return format(roneStaked);
    }
    catch(ex){
        console.error("Error in getting getRoneStaked : ", ex.message);
    }
}

export const getEthRewardsAccumulated = async ()=>{
    try{
        let signer = await getSigner();
        let contract = await getTokenFarmingContract(signer);
        let ethRewardsAccumulated = await contract.getEthRewardsAccumulated();
        return format(ethRewardsAccumulated);
    }
    catch(ex){
        console.error("Error in getting getEthRewardsAccumulated : ", ex.message);
    }
}
export const getEthRewardsWithdrawn = async () =>{
    try{
        let signer = await getSigner();
        let contract = await getTokenFarmingContract(signer);
        let ethRewardsWithdrawn = await contract.getEthRewardsWithdrawn();
        return format(ethRewardsWithdrawn);
    }
    catch(ex){
        console.error("Error in getting getEthRewardsWithdrawn : ", ex.message);
    }
}

export const getRoneRewardsAccumulated = async ()=>{
    try{
        let signer = await getSigner();
        let contract = await getTokenFarmingContract(signer);
        let roneRewardsAccumulated = await contract.getRoneRewardsAccumulated();
        return format(roneRewardsAccumulated);
    }
    catch(ex){
        console.error("Error in getting getRoneRewardsAccumulated : ", ex.message);
    }
}

export const getRoneRewardsWithdrawn = async ()=>{
    try{
        let signer = await getSigner();
        let contract = await getTokenFarmingContract(signer);
        let getRoneRewardsWithdrawn = await contract.getRoneRewardsWithdrawn();
        return format(getRoneRewardsWithdrawn);
    }
    catch(ex){
        console.error("Error in getting getRoneRewardsWithdrawn : ", ex.message);
    }
}

export const stakeEth = async (stakeVal)=>{
    try{
        let signer = await getSigner();
        let contract = await getTokenFarmingContract(signer);
        console.log("Eth Stake Value :" , tokens(stakeVal));
        await contract.StakeEth({value : tokens(stakeVal)});
        return true;
    }
    catch(ex){
        console.error("Error in getting getRoneRewardsWithdrawn : ", ex.message);
    }
    return false;
}

export const unstakeEth = async ()=>{
    try{
        let signer = await getSigner();
        let contract = await getTokenFarmingContract(signer);
        await contract.unstakeEth();
    }
    catch(ex){
        console.error("Error in getting unstakeEth : ", ex.message);
    }
    return false;
}

export const unstakeRone = async ()=>{
    try{

        let signer = await getSigner();
        let contract = await getTokenFarmingContract(signer);
        await contract.unStakeRone();
        return true;
    }
    catch(ex){
        console.error("Error in getting unstakeRone : ", ex.message);
    }
   
}
export const stakeRone = async (stakeVal)=>{
    try{
        let signer = await getSigner();
        let contract = await getTokenFarmingContract(signer);
        let roneTokenContract = await getRoneTokenContract(signer);
         roneTokenContract.approve(constants.tokenFarmingAddress,tokens(stakeVal)).then(()=>{
            console.log("Rone Stake Value :" , tokens(stakeVal));
            contract.StakeRone(tokens(stakeVal)).then(()=>{
                return true;
            })
         }
         )
       
    }
    catch(ex){
        console.error("Error in getting getRoneRewardsWithdrawn : ", ex.message);
    }
    return false;
}
export const getEthBalance = async ()=>{
    try{

        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const signer = provider.getSigner();
        let adddress =  await signer.getAddress();
        let ethBalance = await provider.getBalance(adddress);
        return format(ethBalance);
    }
    catch(ex){
        console.error("Error in getEthBalance method : ", ex.message);
    }
}

export const getRoneBalance = async ()=>{
    try{

        let signer = await getSigner();
        let contract = await getRoneTokenContract(signer);
        let adddress =  await signer.getAddress();
        let RoneTokenBalance = await contract.balanceOf(adddress);
        return format(RoneTokenBalance);

    }
    catch(ex){
        console.error("Error in getEthBalance method : ", ex.message);
    }
}

export const isEth= (tokenSymbol)=>{
    try{
        
        return tokenSymbol === "ETH";
    }
    catch(ex){
        console.error("Error in getting isEth : ", ex.message);
    }
}

export const isEthUnStakeDisabled = (ethstakedVal)=>{
    return ethstakedVal<=0;
}

export const isRoneUnStakeDisabled  = (roneStakedVal)=>{
    return roneStakedVal<=0;
}

export const isEthCollectRewardsDisabled  = (ethRewardsAccumulated,ethRewardsWithdrawn) =>{
    return (ethRewardsAccumulated - ethRewardsWithdrawn)<=0;
}

export const isRoneCollectRewardsDisabled  = (roneRewardAccumulated, roneRewardsWithdrawn) =>{
    return (roneRewardAccumulated-roneRewardsWithdrawn)<=0;
}

export const getMaxStakeValue =(tokenSymbol,ethBalance, roneBalance)=>{
    let maxStakeValue;
    if(isEth(tokenSymbol)){
        maxStakeValue = (parseFloat(ethBalance) -0.01);
    }
    else{
        maxStakeValue = roneBalance;
    }
    return maxStakeValue;
}
