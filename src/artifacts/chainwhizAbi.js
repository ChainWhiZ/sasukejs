 const chainwhiz= [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_ChainwhizAdmin",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "ActivateContract",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "DeactivateContract",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "newAddress",
        "type": "address"
      }
    ],
    "name": "ETHGateWayAddressChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "publisher",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "solver",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "issueLink",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "solutionLink",
        "type": "string"
      }
    ],
    "name": "EscorwInitiated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "publisher",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "solver",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "issueLink",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "solutionLink",
        "type": "string"
      }
    ],
    "name": "EscrowTransferOwnership",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "publisher",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "githubid",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "githubUrl",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "solverRewardAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "communityVoteReward",
        "type": "uint256"
      }
    ],
    "name": "IssuePosted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "newAddress",
        "type": "address"
      }
    ],
    "name": "LendingPoolProviderAddressChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "solverGithubId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "solutionLink",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "publisherGithubId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "issueGithubUrl",
        "type": "string"
      }
    ],
    "name": "SolutionSubmitted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "publisher",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "issueLink",
        "type": "string"
      }
    ],
    "name": "UnstakeAmountSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "solutionLink",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "VoteStaked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "solutionLink",
        "type": "string"
      }
    ],
    "name": "VoterUnstaked",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [],
    "name": "ChainwhizAdmin",
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
    "name": "ChainwhizTreasary",
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
    "name": "MAX_COMMUNITY_REWARD_AMOUNT",
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
    "name": "MAX_REWARD_AMOUNT",
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
    "name": "MAX_STAKE_AMOUNT",
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
    "name": "MIN_COMMUNITY_REWARD_AMOUNT",
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
    "name": "MIN_REWARD_AMOUNT",
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
    "name": "MIN_STAKING_AMOUNT",
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
    "name": "aMaticAddress",
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
    "name": "aaveIncentiveAddress",
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
    "name": "activateContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_claimer",
        "type": "address"
      }
    ],
    "name": "claimInterest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "deactivateContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ethGateWayAddress",
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
    "inputs": [
      {
        "internalType": "string",
        "name": "_issueLink",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_solverGithubId",
        "type": "string"
      }
    ],
    "name": "initiateEscrow",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isContractActive",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "issueDetail",
    "outputs": [
      {
        "internalType": "address",
        "name": "publisher",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "solverRewardAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "communityVoterRewardAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "startSolveTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endSolveTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "startVoteTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endVoteTime",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isCommunityVote",
        "type": "bool"
      },
      {
        "internalType": "enum ChainwhizCore.QuestionStatus",
        "name": "questionStatus",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "isUnstakeSet",
        "type": "bool"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "solver",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "solutionLink",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timeOfPosting",
            "type": "uint256"
          },
          {
            "internalType": "address[]",
            "name": "voterAddress",
            "type": "address[]"
          },
          {
            "internalType": "uint256",
            "name": "totalStakedAmount",
            "type": "uint256"
          },
          {
            "internalType": "enum ChainwhizCore.EscrowStatus",
            "name": "escrowStatus",
            "type": "uint8"
          }
        ],
        "internalType": "struct ChainwhizCore.Solution",
        "name": "choosenSolution",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lendingPoolProviderAddress",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "_publisherAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_issueGithubUrl",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "flag",
        "type": "bool"
      }
    ],
    "name": "payBackPublisher",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_githubId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_githubUrl",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_solverRewardAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_communityVoterRewardAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_endSolverTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_startVoteTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_endVoteTime",
        "type": "uint256"
      }
    ],
    "name": "postIssue",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_githubId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_solutionLink",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_issueGithubUrl",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_publisherAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_publisherGithubId",
        "type": "string"
      }
    ],
    "name": "postSolution",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "publisher",
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "rewardAddress",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "_aaveIncentiveAddress",
        "type": "address"
      }
    ],
    "name": "setAaveIncentiveAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_approvalAmount",
        "type": "uint256"
      }
    ],
    "name": "setApproval",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newChainwhizAdmin",
        "type": "address"
      }
    ],
    "name": "setChainwhizAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_ethGateWayAddress",
        "type": "address"
      }
    ],
    "name": "setETHGatewayAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_lendingPoolProviderAddress",
        "type": "address"
      }
    ],
    "name": "setLendingPoolProviderAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newCommunityRewardAmount",
        "type": "uint256"
      }
    ],
    "name": "setMinimumCommunityRewardAmount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newRewardAmount",
        "type": "uint256"
      }
    ],
    "name": "setMinimumRewardAmount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newStakeAmount",
        "type": "uint256"
      }
    ],
    "name": "setMinimumStakeAmount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_rewardAddress",
        "type": "address"
      }
    ],
    "name": "setReawrdArrayAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_issueLink",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_publisher",
        "type": "address"
      },
      {
        "internalType": "string[]",
        "name": "_solutionLinks",
        "type": "string[]"
      },
      {
        "internalType": "address[]",
        "name": "_voterAddress",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_amount",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256",
        "name": "start",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "end",
        "type": "uint256"
      }
    ],
    "name": "setUnstakeAmount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_aMaticAddress",
        "type": "address"
      }
    ],
    "name": "setaMaticAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "solutionDetails",
    "outputs": [
      {
        "internalType": "address",
        "name": "solver",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "solutionLink",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "timeOfPosting",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalStakedAmount",
        "type": "uint256"
      },
      {
        "internalType": "enum ChainwhizCore.EscrowStatus",
        "name": "escrowStatus",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "solver",
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
    "inputs": [
      {
        "internalType": "string",
        "name": "_issueGithubUrl",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_publisherAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_publisherGithubId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_solverGithubId",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_solver",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_solutionLink",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_githubId",
        "type": "string"
      }
    ],
    "name": "stakeVote",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_issueGithubUrl",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_publisherGithubId",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_publisherAddress",
        "type": "address"
      }
    ],
    "name": "startVotingStage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_publisher",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_issueLink",
        "type": "string"
      }
    ],
    "name": "transferRewardAmount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_solutionLink",
        "type": "string"
      }
    ],
    "name": "unstake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "voteDetails",
    "outputs": [
      {
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "votingPower",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountStaked",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "returnAmount",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isUnstake",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "voter",
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      }
    ],
    "name": "withdrawFromTreasery",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]

  export default chainwhiz;