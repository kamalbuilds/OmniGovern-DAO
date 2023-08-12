// @ts-nocheck
import {
    useAddress,
    useNetwork,
    useContract,
    ConnectWallet,
    Web3Button,
    useNFTBalance,
  } from '@thirdweb-dev/react';
  import { useState, useEffect, useMemo } from 'react';
  import { Text,Button,Table, Radio } from '@geist-ui/core';
  import { AddressZero } from '@ethersproject/constants';

  import '../components/OmniGovernDao.css'
  
  const OmniGovernDao = () => {
    // Use the hooks thirdweb give us.
    const address = useAddress();
    const network = useNetwork();
    console.log('👋 Address:', address , network[0].data.chain?.id);
    // Initialize our Edition Drop contract
    const editionDropAddress = '0x82EB5bFf79D766f127E562061A4Ca279DB4f17bd';

    const { contract: editionDrop } = useContract(
        editionDropAddress,
      'edition-drop',
    );
    // Initialize our token contract
    const { contract: token } = useContract(
      '0x34Afb4Cb3EC4A273968bBa7267A06ff1A37Cd510'
    );
    const { contract: vote } = useContract(
      '0x7baD3A8A1E13be1031e4796D13A37E3E3d154F90',
      'vote',
    );
    // Hook to check if the user has our NFT
    const { data: nftBalance } = useNFTBalance(editionDrop, address, '0');
  
    const hasClaimedNFT = useMemo(() => {
      return nftBalance && nftBalance.gt(0);
    }, [nftBalance]);
  
    // Holds the amount of token each member has in state.
    const [memberTokenAmounts, setMemberTokenAmounts] = useState([]);
    // The array holding all of our members addresses.
    const [memberAddresses, setMemberAddresses] = useState([]);
  
    // A fancy function to shorten someones wallet address, no need to show the whole thing.
    const shortenAddress = (str) => {
      return str.substring(0, 6) + '...' + str.substring(str.length - 4);
    };

    console.log(network?.[0].data.chainId)
  
    const [proposals, setProposals] = useState([]);
    const [isVoting, setIsVoting] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
  
    // Retrieve all our existing proposals from the contract.
    useEffect(() => {
      if (!hasClaimedNFT) {
        return;
      }
  
      // A simple call to vote.getAll() to grab the proposals.
      const getAllProposals = async () => {
        try {
          const proposals = await vote.getAll();
          setProposals(proposals);
          console.log('🌈 Proposals:', proposals);
        } catch (error) {
          console.log('failed to get proposals', error);
        }
      };
      getAllProposals();
    }, [hasClaimedNFT, vote]);
  
    // We also need to check if the user already voted.
    useEffect(() => {
      if (!hasClaimedNFT) {
        return;
      }
  
      // If we haven't finished retrieving the proposals from the useEffect above
      // then we can't check if the user voted yet!
      if (!proposals.length) {
        return;
      }
  
      const checkIfUserHasVoted = async () => {
        try {
          const hasVoted = await vote.hasVoted(proposals[0].proposalId, address);
          setHasVoted(hasVoted);
          if (hasVoted) {
            console.log('🥵 User has already voted');
          } else {
            console.log('🙂 User has not voted yet');
          }
        } catch (error) {
          console.error('Failed to check if wallet has voted', error);
        }
      };
      checkIfUserHasVoted();
    }, [hasClaimedNFT, proposals, address, vote]);
  
    // This useEffect grabs all the addresses of our members holding our NFT.
    useEffect(() => {
      if (!hasClaimedNFT) {
        return;
      }
  
      // Just like we did in the 7-airdrop-token.js file! Grab the users who hold our NFT
      // with tokenId 0.
      const getAllAddresses = async () => {
        try {
          const memberAddresses =
            await editionDrop?.history.getAllClaimerAddresses(0);
          setMemberAddresses(memberAddresses);
          console.log('🚀 Members addresses', memberAddresses);
        } catch (error) {
          console.error('failed to get member list', error);
        }
      };
      getAllAddresses();
    }, [hasClaimedNFT, editionDrop?.history]);
  
    // This useEffect grabs the # of token each member holds.
    useEffect(() => {
      if (!hasClaimedNFT) {
        return;
      }
  
      const getAllBalances = async () => {
        try {
          const amounts = await token?.history.getAllHolderBalances();
          setMemberTokenAmounts(amounts);
          console.log('👜 Amounts', amounts);
        } catch (error) {
          console.error('failed to get member balances', error);
        }
      };
      getAllBalances();
    }, [hasClaimedNFT, token?.history]);
  
    // Now, we combine the memberAddresses and memberTokenAmounts into a single array
    const memberList = useMemo(() => {
      return memberAddresses.map((address) => {
        // We're checking if we are finding the address in the memberTokenAmounts array.
        // If we are, we'll return the amount of token the user has.
        // Otherwise, return 0.
        const member = memberTokenAmounts?.find(
          ({ holder }) => holder === address,
        );
  
        return {
          address,
          tokenAmount: member?.balance.displayValue || '0',
        };
      });
    }, [memberAddresses, memberTokenAmounts]);

    // if (address && network[0].data.chain?.id !== 420) {
    //   return (
    //     <div className="unsupported-network flex flex-col justify-center">
    //       <Text h2>Please connect to OP CHains</Text>
    //       <Text h5 blockquote type = "warning">
    //         The DAO is built on the OP network, please switch networks in
    //         your connected wallet.
    //       </Text>
    //     </div>
    //   );
    // }
  
    // This is the case where the user hasn't connected their wallet
    // to your web app. Let them call connectWallet.
    if (!address) {
      return (
        <div className="landing">
          <Text h1 style = {{textAlign: 'center'}}>Welcome to OmniGovern DAO</Text>
            <ConnectWallet theme='light' />
        </div>
      );
    }
  
    // If the user has already claimed their NFT we want to display the interal DAO page to them
    // only DAO members will see this. Render all the members + token amounts.
    if (!hasClaimedNFT) {
      return (
        <div className="member-page">
          <Text h1>OmniGovern CrossChain DAO Powered By LayerZero </Text>
          <Text blockquote>Congratulations on being a member!</Text>
          <div>
            <div>
              <Text h2 className = "text-center">Member List</Text>
              <Table data = {memberList}>
                <h2>0xCF8D2Da12A032b3f3EaDC686AB18551D8fD6c132</h2>
                <h2>0x0439427C42a099E7E362D86e2Bbe1eA27300f6Cb</h2>
                <Table.Column prop = 'address' label = "Address" />
                <Table.Column prop = 'tokenAmount' label = "Token Amount" />
              </Table>
            </div>
            <div>
              <Text h2 className = "text-center">Active Proposals</Text>
              {/* Dummt data for testing */}
              <h3>Proposal ID: #1</h3>
              <span>Proposal: This is the Genesis Proposal of dropping 100 Zora NFTs should we drop for our Early Supporters.
              Proposed By: 0xCF8D2Da12A032b3f3EaDC686AB18551D8fD6c132
              </span>
              ✅ Yes: 1 50 Delegated Tokens
              ❌ No: 2  100 Delegated Tokens
              🤷‍♂️ Abstain: 0
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
  
                  //before we do async things, we want to disable the button to prevent double clicks
                  setIsVoting(true);
  
                  // lets get the votes from the form for the values
                  const votes = proposals.map((proposal) => {
                    const voteResult = {
                      proposalId: proposal.proposalId,
                      //abstain by default
                      vote: 2,
                    };
                    proposal.votes.forEach((vote) => {
                      const elem = document.getElementById(
                        proposal.proposalId + '-' + vote.type,
                      );
  
                      if (elem.checked) {
                        voteResult.vote = vote.type;
                        return;
                      }
                    });
                    return voteResult;
                  });
  
                  // first we need to make sure the user delegates their token to vote
                  try {
                    //we'll check if the wallet still needs to delegate their tokens before they can vote
                    const delegation = await token.getDelegationOf(address);
                    // if the delegation is the 0x0 address that means they have not delegated their governance tokens yet
                    if (delegation === AddressZero) {
                      //if they haven't delegated their tokens yet, we'll have them delegate them before voting
                      await token.delegateTo(address);
                    }
                    // then we need to vote on the proposals
                    try {
                      await Promise.all(
                        votes.map(async ({ proposalId, vote: _vote }) => {
                          // before voting we first need to check whether the proposal is open for voting
                          // we first need to get the latest state of the proposal
                          const proposal = await vote.get(proposalId);
                          // then we check if the proposal is open for voting (state === 1 means it is open)
                          if (proposal.state === 1) {
                            // if it is open for voting, we'll vote on it
                            return vote.vote(proposalId, _vote);
                          }
                          // if the proposal is not open for voting we just return nothing, letting us continue
                          return;
                        }),
                      );
                      try {
                        // if any of the propsals are ready to be executed we'll need to execute them
                        // a proposal is ready to be executed if it is in state 4
                        await Promise.all(
                          votes.map(async ({ proposalId }) => {
                            // we'll first get the latest state of the proposal again, since we may have just voted before
                            const proposal = await vote.get(proposalId);
  
                            //if the state is in state 4 (meaning that it is ready to be executed), we'll execute the proposal
                            if (proposal.state === 4) {
                              return vote.execute(proposalId);
                            }
                          }),
                        );
                        // if we get here that means we successfully voted, so let's set the "hasVoted" state to true
                        setHasVoted(true);
                        // and log out a success message
                        console.log('successfully voted');
                      } catch (err) {
                        console.error('failed to execute votes', err);
                      }
                    } catch (err) {
                      console.error('failed to vote', err);
                    }
                  } catch (err) {
                    console.error('failed to delegate tokens');
                  } finally {
                    // in *either* case we need to set the isVoting state to false to enable the button again
                    setIsVoting(false);
                  }
                }}
              >
                {proposals.map((proposal) => (
                  <div key={proposal.proposalId} className="card">
                    <Text h5>{proposal.description}</Text>
                    <div>
                      {proposal.votes.map(({ type, label }) => (
                        <div key={type} class = "radio-group">

                          <input
                            type="radio"
                            id={proposal.proposalId + '-' + type}
                            name={proposal.proposalId}
                            value={type}
                            //default the "abstain" vote to checked
                            defaultChecked={type === 2}
                          />
                          <label htmlFor={proposal.proposalId + '-' + type}>
                            {label}
                          </label>

                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <button disabled={isVoting || hasVoted} type="submit" class = "button-container">
                  <Button ghost>

                  {isVoting
                    ? 'Voting...'
                    : hasVoted
                    ? 'You Already Voted'
                    : 'Submit Votes'}
                  </Button>
                </button>
                <br />
                {!hasVoted && (
                  <Text blockquote>
                    This will trigger multiple transactions that you will need to
                    sign.
                  </Text>
                )}
              </form>
            </div>
          </div>
        </div>
      );
    }
  
    // Render mint nft screen.
    return (
      <div className="mint-nft">
        <Text h1 style = {{textAlign: 'center'}}>Welcome to OmniGovern DAO</Text>
        <div className="btn-hero">
          <Web3Button
            contractAddress={editionDropAddress}
            action={(contract) => {
              contract.erc1155.claim(0, 1);
            }}
            onSuccess={() => {
              console.log(
                `🌊 Successfully Claimed the NFT! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`,
              );
            }}
            onError={(error) => {
              console.error('Failed to claim NFT', error);
            }}
          >
            Mint your Membership NFT
          </Web3Button>
        </div>
      </div>
    );
  };
  
  export default OmniGovernDao;