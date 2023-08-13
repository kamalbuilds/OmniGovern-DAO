// @ts-nocheck
import { showNotification } from "@mantine/notifications";
import {
  useAddress,
  useContract,
  useContractWrite,
  useDisconnect,
  useMetamask,
  useChainId,
  useNetwork
} from "@thirdweb-dev/react";
import { SmartContract } from "@thirdweb-dev/sdk";
import { BaseContract, ethers } from "ethers";
import React, { createContext, useContext } from "react";
import { CreateCampaignValidationType } from "../pages/CreateCampaign";
import { useState , useEffect } from "react";

interface StateContextType {
  address?: string;
  contract?: SmartContract<BaseContract> | undefined;
  createCampaign?: (values: CreateCampaignValidationType) => Promise<void>;
  createCampaignIsLoading?: boolean;
  createCampaignError?: unknown;
  connect?: () => Promise<
    | {
        data?: import("wagmi").ConnectorData<any> | undefined;
        error?: Error | undefined;
      }
    | {
        error: Error;
      }
  >;
  disconnect?: () => Promise<void | {
    data?: import("wagmi").ConnectorData<any> | undefined;
    error?: Error | undefined;
  }>;
}

const StateContext = createContext<StateContextType>({});

interface StateProviderProps {
  children: React.ReactNode;
}

export const StateProvider = ({ children }: StateProviderProps) => {
  const chainid = useChainId();
  const [contractAddress, setContractAddress] = useState<string | null>(null);

  useEffect(() => {
      let currentContractAddress;
      switch(chainid) {
          case 420:
              currentContractAddress = "0xB706b01638d56866C0905d0d706A86a5AEe662A6";
              break;
          case 999:
              currentContractAddress = "0x32AdE66Dcd63bC95A3215C53BF712423550593FB";
              break;
          case 84531:
              currentContractAddress = "0xB3e9A32a99ba815ba7a61A47a0f803beF9841190";
              break;
          case 919:
              currentContractAddress = "0x582bEa2a2F17128F1a8D3C26d632feDA5f2CD004";
              break;
          default:
              console.log(chainid, "i m here");
              currentContractAddress = null;
      }
      setContractAddress(currentContractAddress);
  }, [chainid]);

  console.log(contractAddress,"address kamal");
  const { contract } = useContract(contractAddress);

  const {
    mutateAsync: createCampaign,
    isLoading,
    error,
  } = useContractWrite(contract, "createCampaign");

  const address = useAddress();
  const connect = useMetamask();
  console.log(address, chainid, "address")
  // disconnect
  const disconnect = useDisconnect();

  const handleCreateCampaign = async (values: CreateCampaignValidationType) => {
    console.log("values till now",values, values.deadline.getTime(),ethers.utils.parseUnits(values.target.toString(), 18));
    try {
      const data = await createCampaign({
        args: [
            address,
            values.title,
            values.description,
            ethers.utils.parseUnits(values.target.toString(), 18),
            values.deadline.getTime(),
            values.image,
        ]
    });
  
      showNotification({
        title: "Success",
        message: "Campaign created",
        color: "blue",
      });

      return data;
    } catch (error: any) {
      console.error(error);
      showNotification({
        title: "something went wrong",
        message: "Failed to create campaign",
        color: "red",
      });
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        createCampaign: handleCreateCampaign,
        createCampaignIsLoading: isLoading,
        createCampaignError: error,
        connect,
        disconnect,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useAppState = () => useContext<StateContextType>(StateContext);
