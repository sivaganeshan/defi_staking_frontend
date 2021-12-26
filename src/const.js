export const stakingConstants= ()=>{

        return {
            minimumEthToStake : 0.1,
            minimumRoneToStake : 100,
            ethAPR: 15,
            roneAPR:4,
            tokenFarmingAddress:"0x2e6c4dbc2a805154f92301e3E3B6Fc1eDaa0F1D4",
            tokenFarmingABI : {
                "abi": [
                  {
                    "inputs": [
                      {
                        "internalType": "contract RewardTokenOne",
                        "name": "rewardTokenOne",
                        "type": "address"
                      }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                  },
                  {
                    "anonymous": false,
                    "inputs": [
                      {
                        "indexed": true,
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                      },
                      {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                      },
                      {
                        "indexed": false,
                        "internalType": "string",
                        "name": "token",
                        "type": "string"
                      }
                    ],
                    "name": "Stake",
                    "type": "event"
                  },
                  {
                    "anonymous": false,
                    "inputs": [
                      {
                        "indexed": true,
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                      },
                      {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                      },
                      {
                        "indexed": false,
                        "internalType": "string",
                        "name": "token",
                        "type": "string"
                      }
                    ],
                    "name": "Unstake",
                    "type": "event"
                  },
                  {
                    "inputs": [],
                    "name": "StakeEth",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                  },
                  {
                    "inputs": [
                      {
                        "internalType": "uint256",
                        "name": "_amount",
                        "type": "uint256"
                      }
                    ],
                    "name": "StakeRone",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                  },
                  {
                    "inputs": [],
                    "name": "_rewardTokenOne",
                    "outputs": [
                      {
                        "internalType": "contract RewardTokenOne",
                        "name": "",
                        "type": "address"
                      }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                  },
                  {
                    "inputs": [],
                    "name": "admin",
                    "outputs": [
                      {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                      }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                  },
                  {
                    "inputs": [],
                    "name": "balanceOfEthStaked",
                    "outputs": [
                      {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                      }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                  },
                  {
                    "inputs": [],
                    "name": "balanceOfRoneStaked",
                    "outputs": [
                      {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                      }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                  },
                  {
                    "inputs": [],
                    "name": "calculateAndDistributeRewards",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                  },
                  {
                    "inputs": [],
                    "name": "collectEthRewards",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                  },
                  {
                    "inputs": [],
                    "name": "collectRoneRewards",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                  },
                  {
                    "inputs": [],
                    "name": "ethRewardPerToken",
                    "outputs": [
                      {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                      }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                  },
                  {
                    "inputs": [],
                    "name": "getEthRewardsAccumulated",
                    "outputs": [
                      {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                      }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                  },
                  {
                    "inputs": [],
                    "name": "getEthRewardsWithdrawn",
                    "outputs": [
                      {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                      }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                  },
                  {
                    "inputs": [],
                    "name": "getEthStaked",
                    "outputs": [
                      {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                      }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                  },
                  {
                    "inputs": [],
                    "name": "getRoneRewardsAccumulated",
                    "outputs": [
                      {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                      }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                  },
                  {
                    "inputs": [],
                    "name": "getRoneRewardsWithdrawn",
                    "outputs": [
                      {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                      }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                  },
                  {
                    "inputs": [],
                    "name": "getRoneStaked",
                    "outputs": [
                      {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                      }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                  },
                  {
                    "inputs": [],
                    "name": "isUserStaked",
                    "outputs": [
                      {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                      }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                  },
                  {
                    "inputs": [],
                    "name": "minimumEthToStake",
                    "outputs": [
                      {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                      }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                  },
                  {
                    "inputs": [],
                    "name": "minimumRoneToStake",
                    "outputs": [
                      {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                      }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                  },
                  {
                    "inputs": [],
                    "name": "name",
                    "outputs": [
                      {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                      }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                  },
                  {
                    "inputs": [],
                    "name": "roneRewardPerToken",
                    "outputs": [
                      {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                      }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                  },
                  {
                    "inputs": [
                      {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                      }
                    ],
                    "name": "stakers",
                    "outputs": [
                      {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                      }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                  },
                  {
                    "inputs": [],
                    "name": "unStakeRone",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                  },
                  {
                    "inputs": [],
                    "name": "unstakeEth",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                  }
                ]
              }
        }
}