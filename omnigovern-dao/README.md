# OmniGovern DAO Contracts
This is contract code for OmniGovernDAO a cross-chain DAO.

### Contract Address deployed
OGT- 

https://moonbase.moonscan.io/token/0x582bea2a2f17128f1a8d3c26d632feda5f2cd004

https://goerli-optimism.etherscan.io/token/0x34Afb4Cb3EC4A273968bBa7267A06ff1A37Cd510

SetTrustedRemote

https://moonbase.moonscan.io/tx/0xdbfc4ed8134dfa6961f7724b420253ec8ccb54f5d209cfc36f1267996d6e2283

https://goerli-optimism.etherscan.io/tx/0x8f689aa6a6f002c605873018376d85cf271bfa0ed9da9306a2a2414931710de4

OmniDAO https://goerli-optimism.etherscan.io/address/0x1d507abc69e00cd373cb28ca1cb6584e85c6f5a7

DAO Sattelite
https://moonbase.moonscan.io/address/0x257a3b83a6c7365f79552e52f757aefb76ce3dc5

## Design

The OmniGovern cross-chain DAO has these steps:  
1. Propose
2. Voting Period
3. Collection Period <This is special in X-Chain DAO>
4. Execution8

When the proposal is initiated, it uses a past snapshot to determine which account has so many votes. During the voting period, accounts are able to cast yay or nay for a vote. During execution, once the voting period is finished, if the vote succeeds, anyone can execute the proposal.  

The collection period is unique to the cross-chain DAO because it is when all of the votes from all of the chains are collected and processed on the hub chain to determine which side won.  

## Deployment
The following docs will be for deploying to hub chain Moonbase Alpha and spoke chain OP-gorelli.

### OmniGovernDAOToken
First thing to deploy is the OmniGovernDAOToken, which determines the votes on each chain.  

```
npx hardhat deploy --tags OmniGovernDAOToken --network optimism-goerli
npx hardhat deploy --tags OmniGovernDAOToken --network moonbase
```

Then you set them as trusted.

```
npx hardhat tokenSetTrustedRemote --network optimism-goerli --target-network moonbase
npx hardhat tokenSetTrustedRemote --network moonbase --target-network optimism-goerli
```

Now delegating votes to yourself so that we can vote.

```
npx hardhat delegateVotes --network -node --acc 0xCF8D2Da12A032b3f3EaDC686AB18551D8fD6c132
```

### OmniGovernDAO
This only needs to be deployed once, since it expects to communicate with DAOSatellite contracts.  

```
npx hardhat deploy --tags OmniGovernDAO --network moonbase
```

The setting trusted contracts section happens after deploying the DAOSatellite contracts.  

### DAOSatellite
Now you ought to deploy the DAOSatellite smart contracts on the hub chains.  

```
npx hardhat deploy --tags DAOSatellite --network moonbase
```

Now both the DAO and the satellite DAOSatellites have to have their remote addresses trusted.  

```
npx hardhat daoSetTrustedRemote --network moonbase --target-network optimism-goerli
npx hardhat voteAggSetTrustedRemote --network moonbase
```

## Begin a Proposal
You can begin a proposal on the hub chain that increments a number using the SimpleIncrementer.  

```
npx hardhat newEmptyProposal --network optimism-goerli --desc "OmniGovern Genesis cross-chain proposal"
```

## Vote on the Proposal
If you've just deployed, you should see the proposeId in the console. You can cast a vote with the following command:  

```
npx hardhat vote --network dev-node --support 1 --proposalid {INSERT_PROPOSAL_ID} 
```

0 is AGAINST, 1 is FOR, 2 is ABSTAIN.