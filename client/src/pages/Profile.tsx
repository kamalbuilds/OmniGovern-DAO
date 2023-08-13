import { Loader, Grid, Alert, Title } from "@mantine/core";
import { useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import DisplayCampaigns, {
  DisplayCampaignsProps,
} from "../components/DisplayCampaigns";
import { useAppState } from "../context";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { contract, address } = useAppState();
  const { data, isLoading } = useContractRead(contract, "getCampaigns");
  const { user, isAuthenticated, isLoading: authloading } = useAuth0();

  if (!address) {
    return (
      <div>
        <Alert color="red">
          You need to connect your wallet to view this profile page
        </Alert>
      </div>
    );
  }

  return (
    <div>
      {isAuthenticated && (
        <div>
          <Title align="center" mb={20}>Your Details</Title>
          <img src={user?.picture} alt="pfp" />
          <h2>👋🏻 {user?.name} </h2>
          <h2>{user?.address}</h2>
          <p>{user?.email}</p>
          <LogoutButton />
        </div>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {!isAuthenticated ? (
            <LoginButton />
          ) : (
            <>
              <Title align="center" mb={20}>My Campaigns</Title>
              {data.filter((item: DisplayCampaignsProps) => item.owner === address).length === 0 && (
                <Alert color="red">You have not created any campaigns</Alert>
              )}
              <Grid>
                {data
                  .filter((item: DisplayCampaignsProps) => item.owner === address)
                  .map((item: DisplayCampaignsProps, i: number) => {
                    return (
                      <DisplayCampaigns
                        key={i}
                        {...item}
                        target={ethers.utils.formatEther(item.target.toString())}
                        amountCollected={ethers.utils.formatEther(item.amountCollected.toString())}
                        deadline={new Date(item.deadline.toNumber())}
                      />
                    );
                  })}
              </Grid>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
