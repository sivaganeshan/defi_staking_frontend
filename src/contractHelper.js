import { ethers } from "ethers";
import {stakingConstants} from "./const";
var constants = stakingConstants();

// function tokens(n){
//     return ethers.utils.parseEther(n);
// }

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
        console.log("rone staked : ",format(totalRoneLocked));
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

export const isEth= (tokenSymbol)=>{
    try{
        
        return tokenSymbol === "ETH";
    }
    catch(ex){
        console.error("Error in getting isEth : ", ex.message);
    }
}
